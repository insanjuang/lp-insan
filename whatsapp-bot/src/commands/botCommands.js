const whatsappAPI = require('../services/whatsappAPI');
const userSession = require('../utils/userSession');

class BotCommands {
  constructor() {
    this.commands = {
      '/help': this.helpCommand,
      '/menu': this.menuCommand,
      '/about': this.aboutCommand,
      '/contact': this.contactCommand,
      '/services': this.servicesCommand,
      '/start': this.startCommand,
      '/status': this.statusCommand,
      '/time': this.timeCommand,
      '/joke': this.jokeCommand,
      '/quote': this.quoteCommand,
      '!help': this.helpCommand,
      '!menu': this.menuCommand,
      '!about': this.aboutCommand,
      '!contact': this.contactCommand,
      '!services': this.servicesCommand,
    };
  }

  async handleCommand(commandText, userPhone, userName) {
    const command = commandText.toLowerCase().split(' ')[0];
    const args = commandText.split(' ').slice(1);

    console.log(`🤖 Handling command: ${command} from ${userName}`);

    if (this.commands[command]) {
      return await this.commands[command].call(this, userPhone, userName, args);
    } else {
      return `❓ Unknown command: ${command}\n\nType /help to see available commands.`;
    }
  }

  async handleButtonClick(buttonId, userPhone, userName) {
    console.log(`🔘 Button clicked: ${buttonId} by ${userName}`);

    switch (buttonId) {
      case 'btn_help':
        return await this.helpCommand(userPhone, userName);
      case 'btn_services':
        return await this.servicesCommand(userPhone, userName);
      case 'btn_contact':
        return await this.contactCommand(userPhone, userName);
      case 'btn_about':
        return await this.aboutCommand(userPhone, userName);
      default:
        return `Thanks for clicking the button! 🔘\n\nHow else can I help you?`;
    }
  }

  async handleListSelection(listId, userPhone, userName) {
    console.log(`📋 List item selected: ${listId} by ${userName}`);

    switch (listId) {
      case 'service_web':
        return `🌐 *Web Development Services*\n\nWe offer:\n• Custom website development\n• E-commerce solutions\n• Responsive design\n• SEO optimization\n\nWould you like to know more about any specific service?`;
      case 'service_mobile':
        return `📱 *Mobile App Development*\n\nWe create:\n• iOS applications\n• Android applications\n• Cross-platform apps\n• UI/UX design\n\nInterested in building a mobile app?`;
      case 'service_ai':
        return `🤖 *AI & Machine Learning*\n\nOur AI services include:\n• Chatbot development\n• Data analysis\n• Predictive modeling\n• Natural language processing\n\nLet's discuss your AI needs!`;
      case 'service_consulting':
        return `💼 *IT Consulting*\n\nWe provide:\n• Technology strategy\n• System architecture\n• Digital transformation\n• Technical audits\n\nHow can we help optimize your technology?`;
      default:
        return `Thanks for your selection! 📋\n\nHow can I assist you further?`;
    }
  }

  async startCommand(userPhone, userName) {
    const welcomeMessage = `🎉 *Welcome ${userName}!*\n\nI'm your WhatsApp assistant, ready to help you 24/7!\n\n✨ *What I can do:*\n• Answer your questions\n• Provide information about our services\n• Help with support requests\n• Share useful resources\n\nType /menu to see all available options or just start chatting with me! 💬`;

    // Send welcome message with buttons
    setTimeout(async () => {
      await whatsappAPI.sendButtonMessage(
        userPhone,
        "Choose what you'd like to do:",
        [
          { id: 'btn_services', title: '🛠️ Our Services' },
          { id: 'btn_help', title: '❓ Get Help' },
          { id: 'btn_contact', title: '📞 Contact Us' }
        ]
      );
    }, 1000);

    return welcomeMessage;
  }

  async helpCommand(userPhone, userName) {
    return `🆘 *Help Center*\n\nHere are the available commands:\n\n🤖 *Bot Commands:*\n/help - Show this help message\n/menu - Show main menu\n/about - About our company\n/contact - Contact information\n/services - Our services\n/status - Bot status\n/time - Current time\n/joke - Random joke\n/quote - Inspirational quote\n\n💬 *Natural Chat:*\nYou can also just chat with me naturally! I understand:\n• Greetings (hi, hello, hey)\n• Questions about services\n• Support requests\n• General inquiries\n\nHow can I help you today, ${userName}? 😊`;
  }

  async menuCommand(userPhone, userName) {
    // Send list message
    setTimeout(async () => {
      await whatsappAPI.sendListMessage(
        userPhone,
        "Here's what I can help you with:",
        "Choose an option",
        [
          {
            title: "🛠️ Our Services",
            rows: [
              { id: 'service_web', title: '🌐 Web Development', description: 'Custom websites & web apps' },
              { id: 'service_mobile', title: '📱 Mobile Apps', description: 'iOS & Android development' },
              { id: 'service_ai', title: '🤖 AI Solutions', description: 'Machine learning & chatbots' },
              { id: 'service_consulting', title: '💼 IT Consulting', description: 'Technology strategy & advice' }
            ]
          }
        ]
      );
    }, 500);

    return `📋 *Main Menu*\n\nWelcome ${userName}! I'm here to help you with various services and information.\n\nPlease select an option from the menu below, or feel free to ask me anything! 💬`;
  }

  async aboutCommand(userPhone, userName) {
    return `ℹ️ *About Us*\n\n🏢 *Company:* Tech Solutions Inc.\n🤖 *Bot:* WhatsApp Assistant v1.0\n\n📋 *What we do:*\n• Web & Mobile Development\n• AI & Machine Learning Solutions\n• IT Consulting & Support\n• Digital Transformation\n\n🎯 *Our Mission:*\nTo provide cutting-edge technology solutions that help businesses grow and succeed in the digital world.\n\n⭐ *Why choose us:*\n• 24/7 Support via this bot\n• Expert team of developers\n• Proven track record\n• Competitive pricing\n\nReady to start your project, ${userName}? 🚀`;
  }

  async contactCommand(userPhone, userName) {
    return `📞 *Contact Information*\n\n🏢 *Tech Solutions Inc.*\n\n📧 *Email:* contact@techsolutions.com\n📱 *Phone:* +1 (555) 123-4567\n🌐 *Website:* www.techsolutions.com\n\n📍 *Address:*\n123 Tech Street\nSilicon Valley, CA 94000\nUnited States\n\n🕒 *Business Hours:*\nMonday - Friday: 9:00 AM - 6:00 PM (PST)\nSaturday: 10:00 AM - 4:00 PM (PST)\nSunday: Closed\n\n💬 *24/7 Support:*\nThis WhatsApp bot is available round the clock for your convenience!\n\nHow can I help you today, ${userName}? 😊`;
  }

  async servicesCommand(userPhone, userName) {
    return `🛠️ *Our Services*\n\n🌐 *Web Development*\n• Custom websites\n• E-commerce platforms\n• Web applications\n• Responsive design\n\n📱 *Mobile Development*\n• iOS apps\n• Android apps\n• Cross-platform solutions\n• App store optimization\n\n🤖 *AI & Machine Learning*\n• Chatbots & virtual assistants\n• Data analysis & insights\n• Predictive modeling\n• Natural language processing\n\n💼 *IT Consulting*\n• Technology strategy\n• System architecture\n• Digital transformation\n• Technical audits\n\n🔧 *Support & Maintenance*\n• 24/7 technical support\n• Regular updates\n• Performance optimization\n• Security monitoring\n\nInterested in any of these services, ${userName}? Let me know how I can help! 🚀`;
  }

  async statusCommand(userPhone, userName) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return `📊 *Bot Status*\n\n✅ *Status:* Online & Running\n⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s\n🤖 *Version:* 1.0.0\n📅 *Date:* ${new Date().toLocaleDateString()}\n🕒 *Time:* ${new Date().toLocaleTimeString()}\n\n🔋 *Health Check:* All systems operational\n📡 *WhatsApp API:* Connected\n💾 *Database:* Active\n\nEverything is working perfectly, ${userName}! How can I assist you? 😊`;
  }

  async timeCommand(userPhone, userName) {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return `🕒 *Current Time*\n\n📅 *Date:* ${dateString}\n⏰ *Time:* ${timeString}\n🌍 *Timezone:* ${timezone}\n\nHave a great day, ${userName}! ☀️`;
  }

  async jokeCommand(userPhone, userName) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything! 😄",
      "Why did the developer go broke? Because he used up all his cache! 💸",
      "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
      "What's a computer's favorite snack? Microchips! 🍟",
      "Why was the JavaScript developer sad? Because he didn't know how to null his feelings! 😢",
      "How many programmers does it take to change a light bulb? None. That's a hardware problem! 💡",
      "Why do Java developers wear glasses? Because they don't C#! 👓",
      "What do you call a programmer from Finland? Nerdic! 🤓"
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return `😂 *Joke of the Day*\n\n${randomJoke}\n\nHope that made you smile, ${userName}! Want another one? Just type /joke again! 🎭`;
  }

  async quoteCommand(userPhone, userName) {
    const quotes = [
      "\"The only way to do great work is to love what you do.\" - Steve Jobs 💻",
      "\"Innovation distinguishes between a leader and a follower.\" - Steve Jobs 🚀",
      "\"The future belongs to those who believe in the beauty of their dreams.\" - Eleanor Roosevelt ✨",
      "\"It is during our darkest moments that we must focus to see the light.\" - Aristotle 🌟",
      "\"Success is not final, failure is not fatal: it is the courage to continue that counts.\" - Winston Churchill 💪",
      "\"The only impossible journey is the one you never begin.\" - Tony Robbins 🛤️",
      "\"In the middle of difficulty lies opportunity.\" - Albert Einstein 🎯",
      "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House 😄"
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return `💭 *Inspirational Quote*\n\n${randomQuote}\n\nStay motivated, ${userName}! 🌈`;
  }
}

module.exports = new BotCommands();