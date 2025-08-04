const whatsappAPI = require('../services/whatsappAPI');
const botCommands = require('../commands/botCommands');
const aiService = require('../services/aiService');
const userSession = require('../utils/userSession');

class MessageHandler {
  constructor() {
    this.processingMessages = new Set(); // Prevent duplicate processing
  }

  async processMessage(message, contacts, metadata) {
    try {
      // Prevent duplicate processing
      if (this.processingMessages.has(message.id)) {
        console.log('⏭️  Message already being processed:', message.id);
        return;
      }
      this.processingMessages.add(message.id);

      console.log('📨 Processing message:', {
        id: message.id,
        from: message.from,
        type: message.type,
        timestamp: message.timestamp
      });

      // Extract user information
      const userPhone = message.from;
      const userName = contacts?.[0]?.profile?.name || 'User';
      
      // Mark message as read
      await whatsappAPI.markMessageAsRead(message.id);

      // Handle different message types
      let responseText = '';
      let shouldUseAI = false;

      switch (message.type) {
        case 'text':
          const messageText = message.text.body.trim();
          console.log(`💬 Text message from ${userName} (${userPhone}): ${messageText}`);
          
          // Check if it's a command
          if (messageText.startsWith('/') || messageText.startsWith('!')) {
            responseText = await botCommands.handleCommand(messageText, userPhone, userName);
          } else {
            // Check for specific keywords
            responseText = await this.handleKeywords(messageText, userPhone, userName);
            if (!responseText) {
              shouldUseAI = true;
            }
          }
          break;

        case 'interactive':
          console.log('🔘 Interactive message received');
          if (message.interactive.type === 'button_reply') {
            const buttonId = message.interactive.button_reply.id;
            const buttonTitle = message.interactive.button_reply.title;
            console.log(`Button clicked: ${buttonId} - ${buttonTitle}`);
            responseText = await botCommands.handleButtonClick(buttonId, userPhone, userName);
          } else if (message.interactive.type === 'list_reply') {
            const listId = message.interactive.list_reply.id;
            const listTitle = message.interactive.list_reply.title;
            console.log(`List item selected: ${listId} - ${listTitle}`);
            responseText = await botCommands.handleListSelection(listId, userPhone, userName);
          }
          break;

        case 'image':
          console.log('🖼️  Image message received');
          responseText = "Thanks for sharing the image! 📸 How can I help you with it?";
          break;

        case 'document':
          console.log('📄 Document message received');
          responseText = "I received your document! 📄 How can I assist you with it?";
          break;

        case 'audio':
          console.log('🎵 Audio message received');
          responseText = "I received your audio message! 🎵 Unfortunately, I can't process audio yet, but I'm here to help with text messages.";
          break;

        case 'video':
          console.log('🎥 Video message received');
          responseText = "Thanks for sharing the video! 🎥 How can I help you?";
          break;

        default:
          console.log(`❓ Unsupported message type: ${message.type}`);
          responseText = "I received your message, but I'm not sure how to handle that type of content yet. Please send me a text message and I'll be happy to help! 😊";
      }

      // Use AI service if no specific response was generated
      if (shouldUseAI && message.type === 'text') {
        try {
          responseText = await aiService.generateResponse(message.text.body, userPhone, userName);
        } catch (error) {
          console.error('AI service error:', error);
          responseText = "I'm having trouble processing your message right now. Please try again later! 🤖";
        }
      }

      // Send response if we have one
      if (responseText) {
        await whatsappAPI.sendTextMessage(userPhone, responseText);
        
        // Update user session
        userSession.updateLastInteraction(userPhone);
      }

      // Remove from processing set
      this.processingMessages.delete(message.id);

    } catch (error) {
      console.error('❌ Error processing message:', error);
      this.processingMessages.delete(message.id);
      
      // Send error message to user
      try {
        await whatsappAPI.sendTextMessage(
          message.from,
          "Sorry, I encountered an error while processing your message. Please try again! 🔧"
        );
      } catch (sendError) {
        console.error('❌ Error sending error message:', sendError);
      }
    }
  }

  async handleKeywords(messageText, userPhone, userName) {
    const lowerText = messageText.toLowerCase();
    
    // Greeting keywords
    if (lowerText.match(/^(hi|hello|hey|good morning|good afternoon|good evening|greetings)/)) {
      const greetings = [
        `Hello ${userName}! 👋 Welcome to our WhatsApp bot. How can I help you today?`,
        `Hi there ${userName}! 😊 I'm here to assist you. What can I do for you?`,
        `Hey ${userName}! 🌟 Great to hear from you. How may I help?`,
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Help keywords
    if (lowerText.match(/help|support|assist|what can you do/)) {
      return await botCommands.handleCommand('/help', userPhone, userName);
    }

    // Menu keywords
    if (lowerText.match(/menu|options|services|features/)) {
      return await botCommands.handleCommand('/menu', userPhone, userName);
    }

    // Contact keywords
    if (lowerText.match(/contact|phone|email|address|reach/)) {
      return await botCommands.handleCommand('/contact', userPhone, userName);
    }

    // About keywords
    if (lowerText.match(/about|who are you|what is this|info/)) {
      return await botCommands.handleCommand('/about', userPhone, userName);
    }

    // Goodbye keywords
    if (lowerText.match(/bye|goodbye|see you|thanks|thank you|exit|quit/)) {
      const goodbyes = [
        `Goodbye ${userName}! 👋 Feel free to message me anytime you need help.`,
        `Thank you ${userName}! 😊 Have a great day and don't hesitate to reach out again.`,
        `See you later ${userName}! 🌟 I'm always here when you need assistance.`,
      ];
      return goodbyes[Math.floor(Math.random() * goodbyes.length)];
    }

    // Return null if no keywords matched
    return null;
  }
}

module.exports = new MessageHandler();