require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const webhookRoutes = require('./routes/webhook');
const messageHandler = require('./handlers/messageHandler');
const whatsappAPI = require('./services/whatsappAPI');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/webhook', webhookRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'WhatsApp Bot Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'WhatsApp ChatBot API',
    version: '1.0.0',
    endpoints: {
      webhook: '/webhook',
      health: '/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 WhatsApp Bot Server is running on port ${PORT}`);
  console.log(`📱 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  
  // Verify WhatsApp API configuration
  if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    console.warn('⚠️  Warning: WhatsApp API credentials not configured. Please check your .env file.');
  } else {
    console.log('✅ WhatsApp API credentials configured');
  }
});

module.exports = app;