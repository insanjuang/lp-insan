import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FontteService } from '../fonnte/fonnte.service';
import { WhatsAppMessage, MessageResult } from '../../common/interfaces/whatsapp.interface';
import { FontteMessageRequest } from '../../common/interfaces/fonnte.interface';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly fallbackRecipient: string;

  constructor(
    private readonly fontteService: FontteService,
    private readonly configService: ConfigService,
  ) {
    this.fallbackRecipient = this.configService.get<string>('app.whatsapp.defaultFallbackRecipient');
  }

  /**
   * Send a single WhatsApp message
   */
  async sendMessage(messageData: WhatsAppMessage): Promise<MessageResult[]> {
    try {
      const recipients = Array.isArray(messageData.recipient) 
        ? messageData.recipient 
        : [messageData.recipient];

      const results: MessageResult[] = [];

      for (const recipient of recipients) {
        try {
          // Validate and format phone number
          const formattedRecipient = this.formatPhoneNumber(recipient);
          
          const fontteRequest: FontteMessageRequest = {
            target: formattedRecipient,
            message: messageData.message,
            delay: messageData.delay,
            schedule: messageData.schedule ? messageData.schedule.toISOString() : undefined,
          };

          const response = await this.fontteService.sendMessage(fontteRequest);

          results.push({
            success: true,
            messageId: response.id,
            recipient: formattedRecipient,
          });

          this.logger.log(`Message sent successfully to ${formattedRecipient}`);

        } catch (error) {
          this.logger.error(`Failed to send message to ${recipient}: ${error.message}`);
          
          results.push({
            success: false,
            error: error.message,
            recipient,
          });
        }
      }

      return results;

    } catch (error) {
      this.logger.error(`Failed to send WhatsApp message: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to send WhatsApp message: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Send bulk WhatsApp messages
   */
  async sendBulkMessages(recipients: string[], message: string): Promise<MessageResult[]> {
    try {
      const messageData: WhatsAppMessage = {
        recipient: recipients,
        message,
      };

      return await this.sendMessage(messageData);

    } catch (error) {
      this.logger.error(`Failed to send bulk messages: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to send bulk messages: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Send a message with file attachment
   */
  async sendMessageWithFile(
    recipients: string[], 
    message: string, 
    fileUrl: string
  ): Promise<MessageResult[]> {
    try {
      const results: MessageResult[] = [];

      for (const recipient of recipients) {
        try {
          const formattedRecipient = this.formatPhoneNumber(recipient);
          
          const fontteRequest: FontteMessageRequest = {
            target: formattedRecipient,
            message,
            file: fileUrl,
          };

          const response = await this.fontteService.sendMessage(fontteRequest);

          results.push({
            success: true,
            messageId: response.id,
            recipient: formattedRecipient,
          });

        } catch (error) {
          results.push({
            success: false,
            error: error.message,
            recipient,
          });
        }
      }

      return results;

    } catch (error) {
      this.logger.error(`Failed to send message with file: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to send message with file: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Validate phone number
   */
  async validatePhoneNumber(phoneNumber: string): Promise<boolean> {
    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      return await this.fontteService.validateNumber(formattedNumber);
    } catch (error) {
      this.logger.warn(`Failed to validate phone number ${phoneNumber}: ${error.message}`);
      return false;
    }
  }

  /**
   * Get device status
   */
  async getDeviceStatus() {
    try {
      return await this.fontteService.getDeviceStatus();
    } catch (error) {
      this.logger.error(`Failed to get device status: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to get device status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Format phone number to international format
   */
  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // If it starts with 0, replace with country code (assuming Indonesia +62)
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.substring(1);
    }
    
    // If it doesn't start with country code, add default (Indonesia +62)
    if (!cleaned.startsWith('62') && cleaned.length < 12) {
      cleaned = '62' + cleaned;
    }
    
    return cleaned;
  }

  /**
   * Send message to fallback recipient (useful for testing)
   */
  async sendTestMessage(message: string): Promise<MessageResult[]> {
    if (!this.fallbackRecipient) {
      throw new HttpException(
        'Fallback recipient not configured. Please set DEFAULT_FALLBACK_RECIPIENT environment variable.',
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.sendMessage({
      recipient: this.fallbackRecipient,
      message,
    });
  }
}