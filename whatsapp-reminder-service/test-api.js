const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test configuration
const TEST_CONFIG = {
  recipients: ['628123456789'], // Replace with your test number
  message: 'Test message from WhatsApp Reminder Service',
  title: 'Test Reminder',
  description: 'This is a test reminder from the API'
};

async function testAPI() {
  console.log('🧪 Testing WhatsApp Reminder Service API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Device Status
    console.log('2. Testing Device Status...');
    try {
      const deviceResponse = await axios.get(`${BASE_URL}/whatsapp/device-status`);
      console.log('✅ Device Status:', deviceResponse.data);
    } catch (error) {
      console.log('❌ Device Status Error:', error.response?.data?.message || error.message);
    }
    console.log('');

    // Test 3: Phone Number Validation
    console.log('3. Testing Phone Number Validation...');
    try {
      const validateResponse = await axios.get(`${BASE_URL}/whatsapp/validate?number=${TEST_CONFIG.recipients[0]}`);
      console.log('✅ Phone Validation:', validateResponse.data);
    } catch (error) {
      console.log('❌ Phone Validation Error:', error.response?.data?.message || error.message);
    }
    console.log('');

    // Test 4: Send Test Message
    console.log('4. Testing Send Test Message...');
    try {
      const testMessageResponse = await axios.post(`${BASE_URL}/whatsapp/test`, {
        message: 'Hello from test script!'
      });
      console.log('✅ Test Message:', testMessageResponse.data);
    } catch (error) {
      console.log('❌ Test Message Error:', error.response?.data?.message || error.message);
    }
    console.log('');

    // Test 5: Send Immediate Reminder
    console.log('5. Testing Immediate Reminder...');
    try {
      const immediateResponse = await axios.post(`${BASE_URL}/reminders/send-immediate`, {
        recipients: TEST_CONFIG.recipients,
        message: TEST_CONFIG.message,
        title: TEST_CONFIG.title,
        description: TEST_CONFIG.description,
        reminderType: 'immediate'
      });
      console.log('✅ Immediate Reminder:', immediateResponse.data);
    } catch (error) {
      console.log('❌ Immediate Reminder Error:', error.response?.data?.message || error.message);
    }
    console.log('');

    // Test 6: Schedule Reminder (5 minutes from now)
    console.log('6. Testing Scheduled Reminder...');
    try {
      const scheduledAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
      const scheduleResponse = await axios.post(`${BASE_URL}/reminders/schedule`, {
        recipients: TEST_CONFIG.recipients,
        message: 'This is a scheduled reminder',
        title: 'Scheduled Test',
        scheduledAt: scheduledAt.toISOString(),
        reminderType: 'scheduled'
      });
      console.log('✅ Scheduled Reminder:', scheduleResponse.data);
    } catch (error) {
      console.log('❌ Scheduled Reminder Error:', error.response?.data?.message || error.message);
    }
    console.log('');

    // Test 7: Get Scheduled Reminders
    console.log('7. Testing Get Scheduled Reminders...');
    try {
      const remindersResponse = await axios.get(`${BASE_URL}/reminders`);
      console.log('✅ Scheduled Reminders:', remindersResponse.data);
    } catch (error) {
      console.log('❌ Get Reminders Error:', error.response?.data?.message || error.message);
    }
    console.log('');

    // Test 8: Quick Reminder
    console.log('8. Testing Quick Reminder...');
    try {
      const quickResponse = await axios.post(`${BASE_URL}/reminders/quick`, {
        recipients: TEST_CONFIG.recipients,
        message: 'Quick reminder test',
        title: 'Quick Test',
        delayMinutes: 1
      });
      console.log('✅ Quick Reminder:', quickResponse.data);
    } catch (error) {
      console.log('❌ Quick Reminder Error:', error.response?.data?.message || error.message);
    }
    console.log('');

    console.log('🎉 API Testing Complete!');

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the service is running with: npm run start:dev');
    }
  }
}

// Run the test
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };