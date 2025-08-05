# WhatsApp Reminder Service

A NestJS-based service for sending WhatsApp reminder messages using the Fonnte.com unofficial WhatsApp API. This service provides a comprehensive solution for sending immediate, scheduled, and recurring WhatsApp reminders.

## Features

- 🚀 **Immediate Messages**: Send WhatsApp messages instantly
- ⏰ **Scheduled Reminders**: Schedule messages for future delivery
- 🔄 **Recurring Reminders**: Set up repeating reminders (daily, weekly, monthly)
- 📱 **Bulk Messaging**: Send messages to multiple recipients
- 📎 **File Attachments**: Send messages with file attachments
- ✅ **Phone Validation**: Validate WhatsApp phone numbers
- 📊 **Device Status**: Check Fonnte device connection status
- 🔧 **RESTful API**: Easy-to-use REST endpoints
- 📝 **Comprehensive Logging**: Detailed logging for monitoring
- 🛡️ **Error Handling**: Robust error handling and validation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Fonnte.com account and API token
- WhatsApp number connected to Fonnte

## Installation

1. **Clone or create the project directory:**
   ```bash
   mkdir whatsapp-reminder-service
   cd whatsapp-reminder-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your environment variables in `.env`:**
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Fonnte API Configuration
   FONNTE_API_URL=https://api.fonnte.com
   FONNTE_TOKEN=your_fonnte_token_here

   # Default WhatsApp Settings
   DEFAULT_FALLBACK_RECIPIENT=your_whatsapp_number_here
   ```

## Getting Your Fonnte Token

1. Sign up at [fonnte.com](https://fonnte.com)
2. Connect your WhatsApp number to Fonnte
3. Get your API token from the dashboard
4. Add the token to your `.env` file

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

The service will be available at `http://localhost:3000/api`

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Health Check
```http
GET /health
```

### WhatsApp Endpoints

#### 1. Send Message
Send an immediate WhatsApp message to one or more recipients.

```http
POST /whatsapp/send
Content-Type: application/json

{
  "recipients": ["628123456789", "628987654321"],
  "message": "Hello from WhatsApp Reminder Service!",
  "delay": 0,
  "schedule": "2024-01-15T10:30:00Z"
}
```

#### 2. Send Bulk Message
Send the same message to multiple recipients.

```http
POST /whatsapp/send-bulk
Content-Type: application/json

{
  "recipients": ["628123456789", "628987654321"],
  "message": "Bulk message to all recipients"
}
```

#### 3. Send Message with File
Send a message with a file attachment.

```http
POST /whatsapp/send-with-file
Content-Type: application/json

{
  "recipients": ["628123456789"],
  "message": "Please find the attached file",
  "fileUrl": "https://example.com/file.pdf"
}
```

#### 4. Send Test Message
Send a test message to the fallback recipient.

```http
POST /whatsapp/test
Content-Type: application/json

{
  "message": "This is a test message"
}
```

#### 5. Validate Phone Number
Check if a phone number is valid and registered on WhatsApp.

```http
GET /whatsapp/validate?number=628123456789
```

#### 6. Get Device Status
Check the status of your Fonnte device connection.

```http
GET /whatsapp/device-status
```

### Reminder Endpoints

#### 1. Send Immediate Reminder
Send a formatted reminder message immediately.

```http
POST /reminders/send-immediate
Content-Type: application/json

{
  "recipients": ["628123456789"],
  "message": "Don't forget about your appointment today!",
  "title": "Appointment Reminder",
  "description": "Your appointment is at 2:00 PM",
  "reminderType": "immediate"
}
```

#### 2. Schedule Reminder
Schedule a reminder for future delivery.

```http
POST /reminders/schedule
Content-Type: application/json

{
  "recipients": ["628123456789"],
  "message": "Meeting reminder: Project review at 3 PM",
  "title": "Meeting Reminder",
  "scheduledAt": "2024-01-15T14:30:00Z",
  "reminderType": "scheduled"
}
```

#### 3. Create Recurring Reminder
Set up a recurring reminder.

```http
POST /reminders/recurring
Content-Type: application/json

{
  "recipients": ["628123456789"],
  "message": "Daily standup meeting in 30 minutes",
  "title": "Daily Standup",
  "reminderType": "recurring",
  "recurring": {
    "frequency": "daily",
    "interval": 1,
    "endDate": "2024-12-31T23:59:59Z"
  }
}
```

#### 4. Quick Reminder
Send a quick reminder with optional delay.

```http
POST /reminders/quick
Content-Type: application/json

{
  "recipients": ["628123456789"],
  "message": "Quick reminder message",
  "title": "Quick Reminder",
  "delayMinutes": 5
}
```

#### 5. Bulk Schedule Reminders
Schedule multiple reminders at once.

```http
POST /reminders/bulk-schedule
Content-Type: application/json

{
  "reminders": [
    {
      "recipients": ["628123456789"],
      "message": "First reminder",
      "title": "Reminder 1",
      "scheduledAt": "2024-01-15T10:00:00Z"
    },
    {
      "recipients": ["628987654321"],
      "message": "Second reminder",
      "title": "Reminder 2",
      "scheduledAt": "2024-01-15T11:00:00Z"
    }
  ]
}
```

#### 6. Get Scheduled Reminders
List all scheduled and recurring reminders.

```http
GET /reminders
```

#### 7. Cancel Reminder
Cancel a scheduled or recurring reminder.

```http
DELETE /reminders/{reminderId}
```

## Phone Number Format

The service automatically formats phone numbers to international format. You can provide numbers in various formats:

- `08123456789` (Indonesian local format)
- `628123456789` (Indonesian international format)
- `+628123456789` (With plus sign)

The service will automatically convert them to the correct format for Fonnte API.

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "results": [...],
  "totalSent": 2,
  "totalFailed": 0,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Invalid phone number format",
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/whatsapp/send",
  "method": "POST"
}
```

## Recurring Reminder Configuration

### Frequency Options
- `daily`: Repeat every X days
- `weekly`: Repeat every X weeks
- `monthly`: Repeat every X months

### Example Configurations
```json
{
  "frequency": "daily",
  "interval": 1,
  "endDate": "2024-12-31T23:59:59Z"
}
```

```json
{
  "frequency": "weekly",
  "interval": 2,
  "endDate": "2024-06-30T23:59:59Z"
}
```

```json
{
  "frequency": "monthly",
  "interval": 1
}
```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3000` | No |
| `NODE_ENV` | Environment mode | `development` | No |
| `FONNTE_API_URL` | Fonnte API base URL | `https://api.fonnte.com` | No |
| `FONNTE_TOKEN` | Your Fonnte API token | - | Yes |
| `DEFAULT_FALLBACK_RECIPIENT` | Default recipient for test messages | - | No |

## Error Handling

The service includes comprehensive error handling:

- **Validation Errors**: Invalid request data
- **Authentication Errors**: Invalid or missing Fonnte token
- **Network Errors**: Connection issues with Fonnte API
- **Rate Limiting**: Automatic retry with exponential backoff
- **Phone Number Validation**: Automatic format validation and correction

## Logging

The service provides detailed logging:

- **Request/Response Logging**: All API calls are logged
- **Error Logging**: Detailed error information with stack traces
- **Reminder Execution**: Scheduled reminder execution logs
- **Device Status**: Fonnte device connection status logs

## Development

### Project Structure
```
src/
├── common/
│   ├── dto/              # Data Transfer Objects
│   ├── interfaces/       # TypeScript interfaces
│   ├── filters/          # Exception filters
│   └── interceptors/     # Request/response interceptors
├── config/
│   └── app.config.ts     # Application configuration
├── modules/
│   ├── fonnte/           # Fonnte API integration
│   ├── whatsapp/         # WhatsApp messaging service
│   └── reminder/         # Reminder scheduling service
├── app.module.ts         # Main application module
└── main.ts              # Application entry point
```

### Scripts
```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Linting
npm run lint

# Testing
npm run test

# Test coverage
npm run test:cov
```

## Deployment

### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start dist/main.js --name whatsapp-reminder-service

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the Fonnte.com documentation
- Review the API logs for debugging

## Disclaimer

This service uses the unofficial Fonnte.com WhatsApp API. Please ensure compliance with WhatsApp's Terms of Service and local regulations when using this service.

## Changelog

### v1.0.0
- Initial release
- Basic WhatsApp messaging functionality
- Scheduled and recurring reminders
- Fonnte API integration
- Comprehensive error handling and logging
