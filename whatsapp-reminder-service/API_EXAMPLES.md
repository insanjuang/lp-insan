# API Usage Examples

## Environment Setup

First, make sure your `.env` file is configured:

```env
PORT=3000
NODE_ENV=development
FONNTE_API_URL=https://api.fonnte.com
FONNTE_TOKEN=your_fonnte_token_here
DEFAULT_FALLBACK_RECIPIENT=628123456789
```

## Basic WhatsApp Messaging

### 1. Send Simple Message

```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Hello! This is a test message from WhatsApp Reminder Service."
  }'
```

### 2. Send Bulk Message

```bash
curl -X POST http://localhost:3000/api/whatsapp/send-bulk \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789", "628987654321", "628555666777"],
    "message": "Bulk notification: System maintenance scheduled for tonight at 11 PM."
  }'
```

### 3. Send Message with File

```bash
curl -X POST http://localhost:3000/api/whatsapp/send-with-file \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Please find the attached document for your review.",
    "fileUrl": "https://example.com/document.pdf"
  }'
```

## Reminder System

### 1. Immediate Reminder

```bash
curl -X POST http://localhost:3000/api/reminders/send-immediate \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Don'\''t forget about your doctor appointment today at 3:00 PM!",
    "title": "Doctor Appointment",
    "description": "Dr. Smith - General Checkup",
    "reminderType": "immediate"
  }'
```

### 2. Scheduled Reminder

```bash
curl -X POST http://localhost:3000/api/reminders/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Meeting reminder: Weekly team standup in 30 minutes.",
    "title": "Team Standup",
    "description": "Conference Room A - Don'\''t forget your laptop!",
    "scheduledAt": "2024-01-15T09:30:00Z",
    "reminderType": "scheduled"
  }'
```

### 3. Daily Recurring Reminder

```bash
curl -X POST http://localhost:3000/api/reminders/recurring \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Daily reminder: Take your medication and drink water!",
    "title": "Health Reminder",
    "description": "Remember to take your morning pills",
    "reminderType": "recurring",
    "recurring": {
      "frequency": "daily",
      "interval": 1,
      "endDate": "2024-12-31T23:59:59Z"
    }
  }'
```

### 4. Weekly Recurring Reminder

```bash
curl -X POST http://localhost:3000/api/reminders/recurring \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Weekly reminder: Submit your timesheet before 5 PM today.",
    "title": "Timesheet Reminder",
    "reminderType": "recurring",
    "recurring": {
      "frequency": "weekly",
      "interval": 1,
      "endDate": "2024-06-30T23:59:59Z"
    }
  }'
```

### 5. Quick Reminder with Delay

```bash
curl -X POST http://localhost:3000/api/reminders/quick \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Quick reminder: Your Zoom meeting starts in 5 minutes!",
    "title": "Zoom Meeting",
    "delayMinutes": 5
  }'
```

## Utility Functions

### 1. Validate Phone Number

```bash
curl "http://localhost:3000/api/whatsapp/validate?number=628123456789"
```

### 2. Check Device Status

```bash
curl http://localhost:3000/api/whatsapp/device-status
```

### 3. Health Check

```bash
curl http://localhost:3000/api/health
```

### 4. Get All Scheduled Reminders

```bash
curl http://localhost:3000/api/reminders
```

### 5. Cancel a Reminder

```bash
curl -X DELETE http://localhost:3000/api/reminders/reminder_1641234567890_abc123def
```

## Bulk Operations

### 1. Bulk Schedule Multiple Reminders

```bash
curl -X POST http://localhost:3000/api/reminders/bulk-schedule \
  -H "Content-Type: application/json" \
  -d '{
    "reminders": [
      {
        "recipients": ["628123456789"],
        "message": "Reminder: Project deadline tomorrow!",
        "title": "Project Deadline",
        "scheduledAt": "2024-01-14T09:00:00Z",
        "description": "Final submission for Project Alpha"
      },
      {
        "recipients": ["628987654321"],
        "message": "Reminder: Client presentation at 2 PM",
        "title": "Client Presentation",
        "scheduledAt": "2024-01-15T13:30:00Z",
        "description": "Prepare slides and demo"
      },
      {
        "recipients": ["628555666777"],
        "message": "Reminder: Team building event this Friday",
        "title": "Team Building",
        "scheduledAt": "2024-01-17T08:00:00Z",
        "description": "Location: Central Park - Bring comfortable shoes"
      }
    ]
  }'
```

## JavaScript/Node.js Examples

### Using axios in Node.js

```javascript
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

// Send immediate reminder
async function sendReminder() {
  try {
    const response = await axios.post(`${API_BASE}/reminders/send-immediate`, {
      recipients: ['628123456789'],
      message: 'Meeting in 15 minutes!',
      title: 'Meeting Reminder',
      reminderType: 'immediate'
    });
    
    console.log('Reminder sent:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Schedule reminder
async function scheduleReminder() {
  const scheduledTime = new Date();
  scheduledTime.setMinutes(scheduledTime.getMinutes() + 30); // 30 minutes from now
  
  try {
    const response = await axios.post(`${API_BASE}/reminders/schedule`, {
      recipients: ['628123456789'],
      message: 'Scheduled reminder message',
      title: 'Scheduled Reminder',
      scheduledAt: scheduledTime.toISOString(),
      reminderType: 'scheduled'
    });
    
    console.log('Reminder scheduled:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

sendReminder();
scheduleReminder();
```

## Python Examples

```python
import requests
import json
from datetime import datetime, timedelta

API_BASE = 'http://localhost:3000/api'

def send_immediate_reminder():
    data = {
        "recipients": ["628123456789"],
        "message": "Python reminder: Don't forget your task!",
        "title": "Task Reminder",
        "reminderType": "immediate"
    }
    
    response = requests.post(f"{API_BASE}/reminders/send-immediate", json=data)
    print("Response:", response.json())

def schedule_reminder():
    # Schedule for 1 hour from now
    scheduled_time = datetime.utcnow() + timedelta(hours=1)
    
    data = {
        "recipients": ["628123456789"],
        "message": "Scheduled from Python script",
        "title": "Python Reminder",
        "scheduledAt": scheduled_time.isoformat() + "Z",
        "reminderType": "scheduled"
    }
    
    response = requests.post(f"{API_BASE}/reminders/schedule", json=data)
    print("Scheduled:", response.json())

if __name__ == "__main__":
    send_immediate_reminder()
    schedule_reminder()
```

## Common Use Cases

### 1. Appointment Reminders

```bash
# 24 hours before
curl -X POST http://localhost:3000/api/reminders/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Reminder: You have a dentist appointment tomorrow at 2:00 PM. Please arrive 15 minutes early.",
    "title": "Dentist Appointment - Tomorrow",
    "scheduledAt": "2024-01-14T14:00:00Z"
  }'

# 1 hour before
curl -X POST http://localhost:3000/api/reminders/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Reminder: Your dentist appointment is in 1 hour at 2:00 PM. Address: 123 Main St.",
    "title": "Dentist Appointment - 1 Hour",
    "scheduledAt": "2024-01-15T13:00:00Z"
  }'
```

### 2. Medication Reminders

```bash
# Morning medication
curl -X POST http://localhost:3000/api/reminders/recurring \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Morning medication reminder: Take your blood pressure medication with breakfast.",
    "title": "Morning Medication",
    "reminderType": "recurring",
    "recurring": {
      "frequency": "daily",
      "interval": 1
    }
  }'
```

### 3. Bill Payment Reminders

```bash
# Monthly bill reminder
curl -X POST http://localhost:3000/api/reminders/recurring \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": ["628123456789"],
    "message": "Monthly reminder: Your electricity bill is due in 3 days. Amount: $150. Pay online or visit the office.",
    "title": "Electricity Bill Due",
    "reminderType": "recurring",
    "recurring": {
      "frequency": "monthly",
      "interval": 1
    }
  }'
```

## Response Examples

### Success Response
```json
{
  "success": true,
  "results": [
    {
      "success": true,
      "messageId": "msg_1641234567890_abc123",
      "recipient": "628123456789"
    }
  ],
  "totalSent": 1,
  "totalFailed": 0,
  "reminderType": "immediate"
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Fonnte token not configured",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/reminders/send-immediate",
  "method": "POST"
}
```