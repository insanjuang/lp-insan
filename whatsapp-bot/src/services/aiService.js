const OpenAI = require('openai');

class AIService {
  constructor() {
    this.openai = null;
    this.isEnabled = false;
    
    if (process.env.OPENAI_API_KEY) {
      try {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
        this.isEnabled = true;
        console.log('✅ OpenAI service initialized');
      } catch (error) {
        console.warn('⚠️  OpenAI initialization failed:', error.message);
      }
    } else {
      console.log('ℹ️  OpenAI API key not provided - AI responses disabled');
    }
  }

  async generateResponse(userMessage, userPhone, userName) {
    if (!this.isEnabled) {
      return this.getFallbackResponse(userMessage, userName);
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful WhatsApp chatbot assistant for Tech Solutions Inc., a technology company. 
            
            Your personality:
            - Friendly, professional, and helpful
            - Use emojis appropriately but not excessively
            - Keep responses concise and clear
            - Always try to be helpful and solution-oriented
            
            Company information:
            - Name: Tech Solutions Inc.
            - Services: Web development, mobile apps, AI solutions, IT consulting
            - Available 24/7 through this WhatsApp bot
            - Contact: contact@techsolutions.com, +1 (555) 123-4567
            
            Guidelines:
            - If asked about services, provide helpful information
            - If asked technical questions, give practical advice
            - If someone needs support, be empathetic and helpful
            - Keep responses under 300 characters when possible
            - End with a question or call-to-action when appropriate
            - The user's name is ${userName}
            
            Do not:
            - Provide information about competitors
            - Make promises about pricing without consultation
            - Share personal information
            - Discuss topics unrelated to business or technology`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0].message.content.trim();
      console.log(`🤖 AI response generated for ${userName}: ${aiResponse.substring(0, 50)}...`);
      
      return aiResponse;

    } catch (error) {
      console.error('❌ OpenAI API error:', error);
      return this.getFallbackResponse(userMessage, userName);
    }
  }

  getFallbackResponse(userMessage, userName) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Technology-related responses
    if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
      return `Hi ${userName}! 🌐 I'd be happy to help with website development. We create custom websites, e-commerce platforms, and web applications. Would you like to know more about our web services?`;
    }
    
    if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
      return `${userName}, we develop amazing mobile apps! 📱 Both iOS and Android applications, plus cross-platform solutions. What kind of app are you thinking about?`;
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('chatbot')) {
      return `Great question about AI, ${userName}! 🤖 We specialize in AI solutions including chatbots, data analysis, and machine learning. How can AI help your business?`;
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
      return `${userName}, pricing depends on your specific needs! 💰 I'd recommend scheduling a consultation to discuss your project. Would you like me to connect you with our team?`;
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('problem')) {
      return `I'm here to help, ${userName}! 🛠️ What specific issue are you facing? Our support team is available 24/7 and we'll get you sorted out quickly.`;
    }
    
    // Question responses
    if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('when') || lowerMessage.includes('where') || lowerMessage.includes('why')) {
      return `That's a great question, ${userName}! 🤔 While I'd love to give you a detailed answer, I think our experts could provide you with the best information. Would you like me to connect you with someone from our team?`;
    }
    
    // Default friendly response
    const responses = [
      `Thanks for your message, ${userName}! 😊 I'm here to help with any questions about our tech services. What can I assist you with today?`,
      `Hi ${userName}! 👋 I understand you're interested in our services. Could you tell me more about what you're looking for?`,
      `${userName}, I'd be happy to help! 🌟 Whether it's web development, mobile apps, or AI solutions, we've got you covered. What's on your mind?`,
      `Great to hear from you, ${userName}! 💬 Our team specializes in creating amazing digital solutions. How can we help bring your ideas to life?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  async generateSummary(messages) {
    if (!this.isEnabled || !messages || messages.length === 0) {
      return 'Conversation summary not available';
    }

    try {
      const conversationText = messages.map(msg => `${msg.sender}: ${msg.text}`).join('\n');
      
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Summarize this WhatsApp conversation in 2-3 sentences, focusing on the main topics discussed and any action items.'
          },
          {
            role: 'user',
            content: conversationText
          }
        ],
        max_tokens: 100,
        temperature: 0.3,
      });

      return response.choices[0].message.content.trim();

    } catch (error) {
      console.error('❌ Error generating summary:', error);
      return 'Unable to generate conversation summary';
    }
  }

  isAIEnabled() {
    return this.isEnabled;
  }
}

module.exports = new AIService();