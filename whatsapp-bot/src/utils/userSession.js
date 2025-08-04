class UserSession {
  constructor() {
    this.sessions = new Map();
    this.cleanupInterval = 24 * 60 * 60 * 1000; // 24 hours
    
    // Cleanup old sessions periodically
    setInterval(() => {
      this.cleanupOldSessions();
    }, this.cleanupInterval);
  }

  // Get or create user session
  getSession(userPhone) {
    if (!this.sessions.has(userPhone)) {
      this.sessions.set(userPhone, {
        phone: userPhone,
        name: null,
        firstInteraction: new Date(),
        lastInteraction: new Date(),
        messageCount: 0,
        currentContext: null,
        preferences: {},
        conversationHistory: []
      });
    }
    return this.sessions.get(userPhone);
  }

  // Update user information
  updateUserInfo(userPhone, name) {
    const session = this.getSession(userPhone);
    if (name && name !== 'User') {
      session.name = name;
    }
    return session;
  }

  // Update last interaction time
  updateLastInteraction(userPhone) {
    const session = this.getSession(userPhone);
    session.lastInteraction = new Date();
    session.messageCount += 1;
    return session;
  }

  // Set conversation context
  setContext(userPhone, context) {
    const session = this.getSession(userPhone);
    session.currentContext = context;
    return session;
  }

  // Get conversation context
  getContext(userPhone) {
    const session = this.getSession(userPhone);
    return session.currentContext;
  }

  // Clear conversation context
  clearContext(userPhone) {
    const session = this.getSession(userPhone);
    session.currentContext = null;
    return session;
  }

  // Add message to conversation history
  addToHistory(userPhone, message, sender = 'user') {
    const session = this.getSession(userPhone);
    session.conversationHistory.push({
      message,
      sender,
      timestamp: new Date()
    });

    // Keep only last 50 messages to prevent memory issues
    if (session.conversationHistory.length > 50) {
      session.conversationHistory = session.conversationHistory.slice(-50);
    }

    return session;
  }

  // Get conversation history
  getHistory(userPhone, limit = 10) {
    const session = this.getSession(userPhone);
    return session.conversationHistory.slice(-limit);
  }

  // Set user preference
  setPreference(userPhone, key, value) {
    const session = this.getSession(userPhone);
    session.preferences[key] = value;
    return session;
  }

  // Get user preference
  getPreference(userPhone, key, defaultValue = null) {
    const session = this.getSession(userPhone);
    return session.preferences[key] || defaultValue;
  }

  // Check if user is new (first interaction today)
  isNewUser(userPhone) {
    const session = this.getSession(userPhone);
    const today = new Date();
    const firstInteraction = session.firstInteraction;
    
    return (
      today.toDateString() === firstInteraction.toDateString() &&
      session.messageCount <= 1
    );
  }

  // Check if user has been inactive
  isInactive(userPhone, minutes = 30) {
    const session = this.getSession(userPhone);
    const now = new Date();
    const diffMinutes = (now - session.lastInteraction) / (1000 * 60);
    return diffMinutes > minutes;
  }

  // Get session statistics
  getStats(userPhone) {
    const session = this.getSession(userPhone);
    const now = new Date();
    const sessionDuration = now - session.firstInteraction;
    const daysSinceFirst = Math.floor(sessionDuration / (1000 * 60 * 60 * 24));
    
    return {
      phone: session.phone,
      name: session.name,
      messageCount: session.messageCount,
      firstInteraction: session.firstInteraction,
      lastInteraction: session.lastInteraction,
      daysSinceFirst,
      isNewUser: this.isNewUser(userPhone),
      isInactive: this.isInactive(userPhone),
      conversationLength: session.conversationHistory.length
    };
  }

  // Get all active sessions
  getActiveSessions(hours = 24) {
    const cutoff = new Date(Date.now() - (hours * 60 * 60 * 1000));
    const activeSessions = [];
    
    for (const [phone, session] of this.sessions) {
      if (session.lastInteraction > cutoff) {
        activeSessions.push({
          phone,
          name: session.name,
          lastInteraction: session.lastInteraction,
          messageCount: session.messageCount
        });
      }
    }
    
    return activeSessions;
  }

  // Cleanup old sessions
  cleanupOldSessions() {
    const cutoff = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)); // 7 days
    let cleanedCount = 0;
    
    for (const [phone, session] of this.sessions) {
      if (session.lastInteraction < cutoff) {
        this.sessions.delete(phone);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} old user sessions`);
    }
  }

  // Get total session count
  getTotalSessions() {
    return this.sessions.size;
  }

  // Export session data (for backup/analytics)
  exportSessions() {
    const sessions = [];
    for (const [phone, session] of this.sessions) {
      sessions.push({
        ...session,
        conversationHistory: session.conversationHistory.slice(-10) // Only last 10 messages
      });
    }
    return sessions;
  }
}

module.exports = new UserSession();