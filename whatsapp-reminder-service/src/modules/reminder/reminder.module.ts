import { Module } from '@nestjs/common';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { ReminderService } from './reminder.service';
import { ReminderController } from './reminder.controller';

@Module({
  imports: [WhatsappModule],
  providers: [ReminderService],
  controllers: [ReminderController],
  exports: [ReminderService],
})
export class ReminderModule {}