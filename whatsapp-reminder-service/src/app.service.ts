import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'WhatsApp Reminder Service with Fonnte API is running! 🚀';
  }
}