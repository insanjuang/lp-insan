import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  fonnte: {
    apiUrl: process.env.FONNTE_API_URL || 'https://api.fonnte.com',
    token: process.env.FONNTE_TOKEN,
  },
  whatsapp: {
    defaultFallbackRecipient: process.env.DEFAULT_FALLBACK_RECIPIENT,
  },
}));