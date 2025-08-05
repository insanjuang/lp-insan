import { IsString, IsOptional, IsArray, IsDateString, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SendMessageDto {
  @IsString({ each: true })
  @IsArray()
  @Transform(({ value }) => Array.isArray(value) ? value : [value])
  recipients: string[];

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsString()
  file?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(3600)
  delay?: number;

  @IsOptional()
  @IsDateString()
  schedule?: string;
}

export class SendReminderDto extends SendMessageDto {
  @IsEnum(['immediate', 'scheduled', 'recurring'])
  reminderType: 'immediate' | 'scheduled' | 'recurring';

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @Type(() => RecurringDto)
  recurring?: RecurringDto;
}

export class RecurringDto {
  @IsEnum(['daily', 'weekly', 'monthly'])
  frequency: 'daily' | 'weekly' | 'monthly';

  @IsNumber()
  @Min(1)
  @Max(365)
  interval: number;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}