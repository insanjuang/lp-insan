import { Controller, Post, Get, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { SendMessageDto } from '../../common/dto/send-message.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    const messageData = {
      recipient: sendMessageDto.recipients,
      message: sendMessageDto.message,
      delay: sendMessageDto.delay,
      schedule: sendMessageDto.schedule ? new Date(sendMessageDto.schedule) : undefined,
    };

    const results = await this.whatsappService.sendMessage(messageData);
    
    return {
      success: results.every(r => r.success),
      results,
      totalSent: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
    };
  }

  @Post('send-bulk')
  @HttpCode(HttpStatus.OK)
  async sendBulkMessage(
    @Body() body: { recipients: string[]; message: string }
  ) {
    const results = await this.whatsappService.sendBulkMessages(
      body.recipients,
      body.message
    );
    
    return {
      success: results.every(r => r.success),
      results,
      totalSent: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
    };
  }

  @Post('send-with-file')
  @HttpCode(HttpStatus.OK)
  async sendMessageWithFile(
    @Body() body: { recipients: string[]; message: string; fileUrl: string }
  ) {
    const results = await this.whatsappService.sendMessageWithFile(
      body.recipients,
      body.message,
      body.fileUrl
    );
    
    return {
      success: results.every(r => r.success),
      results,
      totalSent: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length,
    };
  }

  @Post('test')
  @HttpCode(HttpStatus.OK)
  async sendTestMessage(@Body() body: { message: string }) {
    const results = await this.whatsappService.sendTestMessage(body.message);
    
    return {
      success: results.every(r => r.success),
      results,
      message: 'Test message sent to fallback recipient',
    };
  }

  @Get('validate')
  async validatePhoneNumber(@Query('number') phoneNumber: string) {
    const isValid = await this.whatsappService.validatePhoneNumber(phoneNumber);
    
    return {
      phoneNumber,
      isValid,
      message: isValid ? 'Phone number is valid and registered on WhatsApp' : 'Phone number is not valid or not registered',
    };
  }

  @Get('device-status')
  async getDeviceStatus() {
    const status = await this.whatsappService.getDeviceStatus();
    
    return {
      deviceStatus: status,
      timestamp: new Date().toISOString(),
    };
  }
}