import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get configuration service
  const configService = app.get(ConfigService);
  
  // Enable CORS
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // Global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  // Set global prefix
  app.setGlobalPrefix('api');
  
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  
  console.log(`🚀 WhatsApp Reminder Service is running on: http://localhost:${port}/api`);
  console.log(`📚 API Documentation: http://localhost:${port}/api`);
  console.log(`🔍 Health Check: http://localhost:${port}/api/health`);
}

bootstrap();