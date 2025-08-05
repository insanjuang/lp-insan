import { Controller, Post, Get, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { SendReminderDto } from '../../common/dto/send-message.dto';
import { WhatsAppReminder } from '../../common/interfaces/whatsapp.interface';

@Controller('reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post('send-immediate')
  @HttpCode(HttpStatus.OK)
  async sendImmediateReminder(@Body() sendReminderDto: SendReminderDto) {
    const reminder: WhatsAppReminder = {
      recipient: sendReminderDto.recipients,
      message: sendReminderDto.message,
      reminderType: 'immediate',
      title: sendReminderDto.title,
      description: sendReminderDto.description,
      delay: sendReminderDto.delay,
    };

    const results = await this.reminderService.sendImmediateReminder(reminder);
    
    return {
      success: results.every(r => r.success),
      results,
      totalSent: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
      reminderType: 'immediate',
    };
  }

  @Post('schedule')
  @HttpCode(HttpStatus.CREATED)
  async scheduleReminder(@Body() sendReminderDto: SendReminderDto) {
    if (sendReminderDto.reminderType !== 'scheduled') {
      sendReminderDto.reminderType = 'scheduled';
    }

    if (!sendReminderDto.scheduledAt) {
      return {
        success: false,
        error: 'scheduledAt is required for scheduled reminders',
      };
    }

    const reminder: WhatsAppReminder = {
      recipient: sendReminderDto.recipients,
      message: sendReminderDto.message,
      reminderType: 'scheduled',
      title: sendReminderDto.title,
      description: sendReminderDto.description,
      scheduledAt: new Date(sendReminderDto.scheduledAt),
      delay: sendReminderDto.delay,
    };

    const result = await this.reminderService.scheduleReminder(reminder);
    
    return {
      success: true,
      reminderId: result.reminderId,
      scheduledAt: result.scheduledAt,
      recipients: sendReminderDto.recipients,
      message: 'Reminder scheduled successfully',
    };
  }

  @Post('recurring')
  @HttpCode(HttpStatus.CREATED)
  async createRecurringReminder(@Body() sendReminderDto: SendReminderDto) {
    if (sendReminderDto.reminderType !== 'recurring') {
      sendReminderDto.reminderType = 'recurring';
    }

    if (!sendReminderDto.recurring) {
      return {
        success: false,
        error: 'recurring configuration is required for recurring reminders',
      };
    }

    const reminder: WhatsAppReminder = {
      recipient: sendReminderDto.recipients,
      message: sendReminderDto.message,
      reminderType: 'recurring',
      title: sendReminderDto.title,
      description: sendReminderDto.description,
      recurring: {
        frequency: sendReminderDto.recurring.frequency,
        interval: sendReminderDto.recurring.interval,
        endDate: sendReminderDto.recurring.endDate ? new Date(sendReminderDto.recurring.endDate) : undefined,
      },
    };

    const result = await this.reminderService.createRecurringReminder(reminder);
    
    return {
      success: true,
      reminderId: result.reminderId,
      nextExecution: result.nextExecution,
      recipients: sendReminderDto.recipients,
      recurring: reminder.recurring,
      message: 'Recurring reminder created successfully',
    };
  }

  @Delete(':reminderId')
  @HttpCode(HttpStatus.OK)
  async cancelReminder(@Param('reminderId') reminderId: string) {
    return await this.reminderService.cancelReminder(reminderId);
  }

  @Get()
  async getScheduledReminders() {
    const reminders = this.reminderService.getScheduledReminders();
    
    return {
      success: true,
      count: reminders.length,
      reminders,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('quick')
  @HttpCode(HttpStatus.OK)
  async sendQuickReminder(
    @Body() body: { 
      recipients: string[]; 
      message: string; 
      title?: string;
      delayMinutes?: number;
    }
  ) {
    const reminder: WhatsAppReminder = {
      recipient: body.recipients,
      message: body.message,
      reminderType: 'immediate',
      title: body.title,
      delay: body.delayMinutes ? body.delayMinutes * 60 : undefined, // Convert minutes to seconds
    };

    const results = await this.reminderService.sendImmediateReminder(reminder);
    
    return {
      success: results.every(r => r.success),
      results,
      totalSent: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
      message: 'Quick reminder sent',
    };
  }

  @Post('bulk-schedule')
  @HttpCode(HttpStatus.CREATED)
  async bulkScheduleReminders(
    @Body() body: {
      reminders: Array<{
        recipients: string[];
        message: string;
        title?: string;
        scheduledAt: string;
        description?: string;
      }>;
    }
  ) {
    const results = [];

    for (const reminderData of body.reminders) {
      try {
        const reminder: WhatsAppReminder = {
          recipient: reminderData.recipients,
          message: reminderData.message,
          reminderType: 'scheduled',
          title: reminderData.title,
          description: reminderData.description,
          scheduledAt: new Date(reminderData.scheduledAt),
        };

        const result = await this.reminderService.scheduleReminder(reminder);
        results.push({
          success: true,
          reminderId: result.reminderId,
          scheduledAt: result.scheduledAt,
          recipients: reminderData.recipients,
        });

      } catch (error) {
        results.push({
          success: false,
          error: error.message,
          recipients: reminderData.recipients,
        });
      }
    }

    return {
      success: results.some(r => r.success),
      results,
      totalScheduled: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
    };
  }
}