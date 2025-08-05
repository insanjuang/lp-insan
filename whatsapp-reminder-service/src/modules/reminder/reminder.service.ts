import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { WhatsAppReminder, MessageResult } from '../../common/interfaces/whatsapp.interface';
import * as cron from 'node-cron';

interface ScheduledReminder {
  id: string;
  reminder: WhatsAppReminder;
  task?: cron.ScheduledTask;
  createdAt: Date;
  nextExecution?: Date;
}

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);
  private scheduledReminders = new Map<string, ScheduledReminder>();

  constructor(private readonly whatsappService: WhatsappService) {}

  /**
   * Send an immediate reminder
   */
  async sendImmediateReminder(reminder: WhatsAppReminder): Promise<MessageResult[]> {
    try {
      this.logger.log(`Sending immediate reminder: ${reminder.title || 'Untitled'}`);
      
      const message = this.formatReminderMessage(reminder);
      
      const messageData = {
        recipient: reminder.recipient,
        message,
        delay: reminder.delay,
      };

      return await this.whatsappService.sendMessage(messageData);

    } catch (error) {
      this.logger.error(`Failed to send immediate reminder: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to send immediate reminder: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Schedule a reminder for future execution
   */
  async scheduleReminder(reminder: WhatsAppReminder): Promise<{ reminderId: string; scheduledAt: Date }> {
    try {
      if (!reminder.scheduledAt) {
        throw new HttpException(
          'Scheduled reminder must have a scheduledAt date',
          HttpStatus.BAD_REQUEST
        );
      }

      const reminderId = this.generateReminderId();
      const scheduledAt = new Date(reminder.scheduledAt);

      if (scheduledAt <= new Date()) {
        throw new HttpException(
          'Scheduled time must be in the future',
          HttpStatus.BAD_REQUEST
        );
      }

      this.logger.log(`Scheduling reminder ${reminderId} for ${scheduledAt.toISOString()}`);

      // Create a one-time scheduled task
      const task = cron.schedule('* * * * *', async () => {
        const now = new Date();
        if (now >= scheduledAt) {
          await this.executeScheduledReminder(reminderId);
          task.stop();
          this.scheduledReminders.delete(reminderId);
        }
      }, {
        scheduled: false
      });

      const scheduledReminder: ScheduledReminder = {
        id: reminderId,
        reminder,
        task,
        createdAt: new Date(),
        nextExecution: scheduledAt,
      };

      this.scheduledReminders.set(reminderId, scheduledReminder);
      task.start();

      return { reminderId, scheduledAt };

    } catch (error) {
      this.logger.error(`Failed to schedule reminder: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to schedule reminder: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Create a recurring reminder
   */
  async createRecurringReminder(reminder: WhatsAppReminder): Promise<{ reminderId: string; nextExecution: Date }> {
    try {
      if (!reminder.recurring) {
        throw new HttpException(
          'Recurring reminder must have recurring configuration',
          HttpStatus.BAD_REQUEST
        );
      }

      const reminderId = this.generateReminderId();
      const cronExpression = this.generateCronExpression(reminder.recurring);
      
      this.logger.log(`Creating recurring reminder ${reminderId} with cron: ${cronExpression}`);

      const task = cron.schedule(cronExpression, async () => {
        await this.executeScheduledReminder(reminderId);
        
        // Check if we should stop the recurring reminder
        const scheduledReminder = this.scheduledReminders.get(reminderId);
        if (scheduledReminder && reminder.recurring?.endDate) {
          const endDate = new Date(reminder.recurring.endDate);
          if (new Date() >= endDate) {
            this.logger.log(`Stopping recurring reminder ${reminderId} - end date reached`);
            task.stop();
            this.scheduledReminders.delete(reminderId);
          }
        }
      }, {
        scheduled: true,
        timezone: 'Asia/Jakarta' // Adjust timezone as needed
      });

      const nextExecution = this.calculateNextExecution(reminder.recurring);
      
      const scheduledReminder: ScheduledReminder = {
        id: reminderId,
        reminder,
        task,
        createdAt: new Date(),
        nextExecution,
      };

      this.scheduledReminders.set(reminderId, scheduledReminder);

      return { reminderId, nextExecution };

    } catch (error) {
      this.logger.error(`Failed to create recurring reminder: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to create recurring reminder: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Cancel a scheduled or recurring reminder
   */
  async cancelReminder(reminderId: string): Promise<{ success: boolean; message: string }> {
    try {
      const scheduledReminder = this.scheduledReminders.get(reminderId);
      
      if (!scheduledReminder) {
        throw new HttpException(
          `Reminder with ID ${reminderId} not found`,
          HttpStatus.NOT_FOUND
        );
      }

      if (scheduledReminder.task) {
        scheduledReminder.task.stop();
      }

      this.scheduledReminders.delete(reminderId);
      
      this.logger.log(`Cancelled reminder ${reminderId}`);
      
      return {
        success: true,
        message: `Reminder ${reminderId} has been cancelled successfully`,
      };

    } catch (error) {
      this.logger.error(`Failed to cancel reminder: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to cancel reminder: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get all scheduled reminders
   */
  getScheduledReminders(): any[] {
    return Array.from(this.scheduledReminders.values()).map(reminder => ({
      id: reminder.id,
      title: reminder.reminder.title,
      reminderType: reminder.reminder.reminderType,
      recipients: Array.isArray(reminder.reminder.recipient) 
        ? reminder.reminder.recipient 
        : [reminder.reminder.recipient],
      createdAt: reminder.createdAt,
      nextExecution: reminder.nextExecution,
      isActive: reminder.task ? true : false,
    }));
  }

  /**
   * Execute a scheduled reminder
   */
  private async executeScheduledReminder(reminderId: string): Promise<void> {
    try {
      const scheduledReminder = this.scheduledReminders.get(reminderId);
      
      if (!scheduledReminder) {
        this.logger.warn(`Attempted to execute non-existent reminder: ${reminderId}`);
        return;
      }

      this.logger.log(`Executing scheduled reminder: ${reminderId}`);
      
      const message = this.formatReminderMessage(scheduledReminder.reminder);
      
      const messageData = {
        recipient: scheduledReminder.reminder.recipient,
        message,
      };

      await this.whatsappService.sendMessage(messageData);
      
      this.logger.log(`Successfully executed reminder: ${reminderId}`);

    } catch (error) {
      this.logger.error(`Failed to execute scheduled reminder ${reminderId}: ${error.message}`, error.stack);
    }
  }

  /**
   * Format reminder message
   */
  private formatReminderMessage(reminder: WhatsAppReminder): string {
    let message = '';

    if (reminder.title) {
      message += `🔔 *${reminder.title}*\n\n`;
    }

    message += reminder.message;

    if (reminder.description) {
      message += `\n\n📝 ${reminder.description}`;
    }

    // Add timestamp
    message += `\n\n⏰ ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`;

    return message;
  }

  /**
   * Generate cron expression from recurring configuration
   */
  private generateCronExpression(recurring: WhatsAppReminder['recurring']): string {
    const { frequency, interval } = recurring;

    switch (frequency) {
      case 'daily':
        return `0 9 */${interval} * *`; // Every X days at 9 AM
      case 'weekly':
        return `0 9 * * ${interval}`; // Every week on day X at 9 AM
      case 'monthly':
        return `0 9 1 */${interval} *`; // Every X months on 1st at 9 AM
      default:
        throw new Error(`Unsupported frequency: ${frequency}`);
    }
  }

  /**
   * Calculate next execution time for recurring reminder
   */
  private calculateNextExecution(recurring: WhatsAppReminder['recurring']): Date {
    const now = new Date();
    const { frequency, interval } = recurring;

    switch (frequency) {
      case 'daily':
        return new Date(now.getTime() + (interval * 24 * 60 * 60 * 1000));
      case 'weekly':
        return new Date(now.getTime() + (interval * 7 * 24 * 60 * 60 * 1000));
      case 'monthly':
        const nextMonth = new Date(now);
        nextMonth.setMonth(now.getMonth() + interval);
        return nextMonth;
      default:
        return now;
    }
  }

  /**
   * Generate unique reminder ID
   */
  private generateReminderId(): string {
    return `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}