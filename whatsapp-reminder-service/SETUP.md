# Quick Setup Guide

## 1. Get Your Fonnte Token

1. Visit [fonnte.com](https://fonnte.com) and create an account
2. Connect your WhatsApp number to Fonnte
3. Get your API token from the dashboard

## 2. Configure Environment

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   FONNTE_TOKEN=your_fonnte_token_here
   DEFAULT_FALLBACK_RECIPIENT=628123456789
   ```

## 3. Install and Run

```bash
# Install dependencies
npm install

# Start in development mode
npm run start:dev
```

## 4. Test the API

The service will be available at `http://localhost:3000/api`

### Quick Test Endpoints:

1. **Health Check**: `GET /api/health`
2. **Device Status**: `GET /api/whatsapp/device-status`
3. **Send Test Message**: `POST /api/whatsapp/test`
   ```json
   {
     "message": "Hello from WhatsApp service!"
   }
   ```

### Send a Reminder:

```bash
curl -X POST http://localhost:3000/api/reminders/send-immediate \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "This is a test reminder",
    "title": "Test Reminder",
    "reminderType": "immediate"
  }'
```

## 5. Schedule a Reminder

```bash
curl -X POST http://localhost:3000/api/reminders/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Scheduled reminder message",
    "title": "Scheduled Test",
    "scheduledAt": "2024-01-15T14:30:00Z",
    "reminderType": "scheduled"
  }'
```

## Phone Number Format

The service accepts various formats:
- `08123456789` (Indonesian local)
- `628123456789` (Indonesian international)
- `+628123456789` (With plus sign)

All formats are automatically converted to the correct format for Fonnte API.

## Need Help?

- Check the full README.md for detailed documentation
- Review the API logs for debugging
- Test with the included `test-api.js` script: `node test-api.js`