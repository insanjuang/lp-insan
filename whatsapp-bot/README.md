# WhatsApp ChatBot 🤖

A professional WhatsApp chatbot built with Node.js and the WhatsApp Business API. This bot can handle text messages, interactive buttons, lists, and includes optional AI-powered responses using OpenAI.

## 🌟 Features

- **Message Handling**: Process text, images, documents, audio, and video messages
- **Interactive Elements**: Support for buttons and list menus
- **Command System**: Built-in commands like `/help`, `/menu`, `/about`, etc.
- **AI Integration**: Optional OpenAI integration for intelligent responses
- **User Sessions**: Track user interactions and conversation history
- **Webhook Support**: Secure webhook verification and message processing
- **Rich Responses**: Send formatted messages with emojis and styling
- **24/7 Availability**: Always-on bot ready to assist users

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- WhatsApp Business Account
- Facebook Developer Account
- ngrok (for local development)

### Installation

1. **Clone or create the project**:
```bash
mkdir whatsapp-bot
cd whatsapp-bot
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.example .env
```

4. **Configure your `.env` file**:
```env
# WhatsApp Business API Configuration
WHATSAPP_TOKEN=your_whatsapp_business_api_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
VERIFY_TOKEN=your_webhook_verify_token

# Server Configuration
PORT=3001
NODE_ENV=development

# OpenAI Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key

# Webhook Configuration
WEBHOOK_URL=https://your-domain.com/webhook

# Bot Configuration
BOT_NAME=WhatsApp Assistant
DEFAULT_GREETING=Hello! Welcome to our WhatsApp bot. How can I help you today?
```

5. **Start the development server**:
```bash
npm run dev
```

## 📱 WhatsApp Business API Setup

### Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app and select "Business" type
3. Add WhatsApp product to your app

### Step 2: Configure WhatsApp

1. In your Facebook app, go to WhatsApp > Getting Started
2. Add a phone number or use the test number provided
3. Generate an access token
4. Copy your Phone Number ID and Access Token

### Step 3: Set Up Webhook

1. Use ngrok for local development:
```bash
ngrok http 3001
```

2. In Facebook Developer Console:
   - Webhook URL: `https://your-ngrok-url.ngrok.io/webhook`
   - Verify Token: Use the same token from your `.env` file
   - Subscribe to `messages` field

### Step 4: Test Your Bot

1. Send a test message to your WhatsApp number
2. Check the console logs to see if messages are received
3. Try commands like `/help` or `/menu`

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `/help` | Show help message and available commands |
| `/menu` | Display interactive menu with services |
| `/about` | Information about the company |
| `/contact` | Contact information and business hours |
| `/services` | List of available services |
| `/start` | Welcome message with quick actions |
| `/status` | Bot status and uptime information |
| `/time` | Current date and time |
| `/joke` | Random programming joke |
| `/quote` | Inspirational quote |

## 🎯 Bot Capabilities

### Message Types Supported

- **Text Messages**: Natural language processing and keyword detection
- **Interactive Messages**: Buttons and list selections
- **Media Messages**: Images, documents, audio, and video (with acknowledgment)
- **Commands**: Slash commands for specific actions

### Smart Features

- **Keyword Detection**: Responds to greetings, help requests, and common queries
- **Session Management**: Tracks user interactions and preferences
- **AI Responses**: Optional OpenAI integration for intelligent conversations
- **Context Awareness**: Maintains conversation context and history

## 📁 Project Structure

```
whatsapp-bot/
├── src/
│   ├── commands/
│   │   └── botCommands.js      # Bot command handlers
│   ├── handlers/
│   │   └── messageHandler.js   # Message processing logic
│   ├── routes/
│   │   └── webhook.js          # Webhook endpoints
│   ├── services/
│   │   ├── whatsappAPI.js      # WhatsApp API integration
│   │   └── aiService.js        # OpenAI integration
│   ├── utils/
│   │   └── userSession.js      # User session management
│   └── server.js               # Main server file
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WHATSAPP_TOKEN` | WhatsApp Business API access token | Yes |
| `WHATSAPP_PHONE_NUMBER_ID` | Phone number ID from Facebook | Yes |
| `VERIFY_TOKEN` | Webhook verification token | Yes |
| `PORT` | Server port (default: 3001) | No |
| `OPENAI_API_KEY` | OpenAI API key for AI responses | No |
| `NODE_ENV` | Environment (development/production) | No |

### Customization

You can customize the bot by modifying:

- **Commands**: Edit `src/commands/botCommands.js` to add new commands
- **Responses**: Update `src/services/aiService.js` for fallback responses
- **Message Handling**: Modify `src/handlers/messageHandler.js` for custom logic
- **Company Info**: Update company details in command responses

## 🚀 Deployment

### Using PM2 (Recommended)

1. Install PM2:
```bash
npm install -g pm2
```

2. Start the bot:
```bash
pm2 start src/server.js --name whatsapp-bot
```

3. Save PM2 configuration:
```bash
pm2 save
pm2 startup
```

### Using Docker

1. Create `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

2. Build and run:
```bash
docker build -t whatsapp-bot .
docker run -p 3001:3001 --env-file .env whatsapp-bot
```

### Environment-specific Settings

For production deployment:
- Set `NODE_ENV=production`
- Use HTTPS for webhook URL
- Configure proper logging
- Set up monitoring and alerts

## 📊 Monitoring and Analytics

### Health Check

The bot includes a health check endpoint:
```
GET /health
```

### Session Statistics

Monitor user sessions and bot performance:
- Active users in the last 24 hours
- Message volume and response times
- Error rates and system health

### Logging

The bot logs all activities including:
- Incoming messages and responses
- Command usage and button clicks
- Errors and system events
- User session activities

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit sensitive data to version control
2. **Webhook Verification**: Always verify webhook requests from WhatsApp
3. **Rate Limiting**: Implement rate limiting for production use
4. **Input Validation**: Validate all incoming message data
5. **HTTPS**: Use HTTPS for all webhook URLs in production

## 🐛 Troubleshooting

### Common Issues

1. **Webhook Verification Failed**:
   - Check that `VERIFY_TOKEN` matches in both .env and Facebook console
   - Ensure webhook URL is accessible and returns correct response

2. **Messages Not Sending**:
   - Verify `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID`
   - Check if phone number is verified in Facebook Business Manager

3. **AI Responses Not Working**:
   - Ensure `OPENAI_API_KEY` is set correctly
   - Check OpenAI API usage limits and billing

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📈 Scaling and Performance

### Performance Tips

1. **Memory Management**: User sessions are cleaned up automatically
2. **Rate Limiting**: Implement rate limiting for high-volume use
3. **Database Integration**: Consider adding a database for persistent storage
4. **Caching**: Implement Redis for session and response caching

### Scaling Options

- **Horizontal Scaling**: Deploy multiple instances behind a load balancer
- **Microservices**: Split into separate services (webhook, AI, commands)
- **Queue System**: Use message queues for high-volume processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review WhatsApp Business API documentation

## 🎉 Acknowledgments

- WhatsApp Business API for messaging platform
- OpenAI for AI-powered responses
- Express.js for web framework
- Node.js community for excellent packages

---

Made with ❤️ for businesses wanting to enhance customer communication through WhatsApp automation.