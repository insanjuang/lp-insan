const express = require('express');
const router = express.Router();
const messageHandler = require('../handlers/messageHandler');

// Webhook verification (GET)
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('Webhook verification request:', { mode, token, challenge });

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      console.log('✅ Webhook verified successfully');
      res.status(200).send(challenge);
    } else {
      console.log('❌ Webhook verification failed - invalid token');
      res.sendStatus(403);
    }
  } else {
    console.log('❌ Webhook verification failed - missing parameters');
    res.sendStatus(400);
  }
});

// Webhook endpoint for receiving messages (POST)
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    
    console.log('📨 Webhook received:', JSON.stringify(body, null, 2));

    // Check if this is a WhatsApp API event
    if (body.object === 'whatsapp_business_account') {
      if (body.entry && body.entry[0] && body.entry[0].changes && body.entry[0].changes[0]) {
        const change = body.entry[0].changes[0];
        
        // Check if this is a message event
        if (change.field === 'messages' && change.value && change.value.messages) {
          const messages = change.value.messages;
          const contacts = change.value.contacts;
          const metadata = change.value.metadata;

          // Process each message
          for (const message of messages) {
            try {
              await messageHandler.processMessage(message, contacts, metadata);
            } catch (error) {
              console.error('Error processing message:', error);
            }
          }
        }
        
        // Handle message status updates (delivered, read, etc.)
        if (change.field === 'messages' && change.value && change.value.statuses) {
          const statuses = change.value.statuses;
          console.log('📊 Message status updates:', statuses);
          // You can implement status tracking here if needed
        }
      }
      
      res.status(200).send('EVENT_RECEIVED');
    } else {
      console.log('❌ Invalid webhook object type:', body.object);
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;