export interface WhatsAppMessage {
  recipient: string | string[];
  message: string;
  type?: 'text' | 'image' | 'document' | 'audio';
  delay?: number;
  schedule?: Date;
}

export interface WhatsAppReminder extends WhatsAppMessage {
  reminderType: 'immediate' | 'scheduled' | 'recurring';
  title?: string;
  description?: string;
  scheduledAt?: Date;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
}

export interface MessageResult {
  success: boolean;
  messageId?: string;
  error?: string;
  recipient: string;
}