import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FontteModule } from './modules/fonnte/fonnte.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { ReminderModule } from './modules/reminder/reminder.module';
import { appConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    FontteModule,
    WhatsappModule,
    ReminderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}