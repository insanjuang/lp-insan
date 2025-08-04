#!/bin/bash

# WhatsApp ChatBot Installation Script
# This script helps you set up the WhatsApp chatbot quickly

echo "🤖 WhatsApp ChatBot Installation Script"
echo "======================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created from template"
    echo ""
    echo "🔧 IMPORTANT: Please edit the .env file with your WhatsApp API credentials:"
    echo "   - WHATSAPP_TOKEN"
    echo "   - WHATSAPP_PHONE_NUMBER_ID"
    echo "   - VERIFY_TOKEN"
    echo "   - OPENAI_API_KEY (optional)"
    echo ""
else
    echo "ℹ️  .env file already exists"
fi

# Check if nodemon is installed globally
if ! command -v nodemon &> /dev/null; then
    echo "📋 Installing nodemon globally for development..."
    npm install -g nodemon
    if [ $? -eq 0 ]; then
        echo "✅ nodemon installed globally"
    else
        echo "⚠️  Failed to install nodemon globally. You can still use 'npm start'"
    fi
fi

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Edit the .env file with your WhatsApp API credentials"
echo "2. Set up your WhatsApp Business API (see README.md)"
echo "3. Start the development server: npm run dev"
echo "4. Use ngrok to expose your local server: ngrok http 3001"
echo "5. Configure the webhook URL in Facebook Developer Console"
echo ""
echo "📚 For detailed setup instructions, see README.md"
echo "🆘 For support, create an issue on GitHub"
echo ""
echo "Happy chatbot building! 🚀"