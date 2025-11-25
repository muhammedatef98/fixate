#!/bin/bash

# Fixate Setup Script
# This script helps you set up the Fixate project quickly

set -e

echo "🚀 Fixate Setup Script"
echo "======================"
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo "❌ Error: Node.js 22 or higher is required"
    echo "   Current version: $(node -v)"
    echo "   Please install Node.js 22+ from https://nodejs.org"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Check pnpm
echo "📦 Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm not found. Installing..."
    npm install -g pnpm
fi
echo "✅ pnpm version: $(pnpm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo ""

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found"
    echo ""
    echo "Please create a .env file with the following variables:"
    echo ""
    echo "DATABASE_URL=mysql://user:password@host:3306/fixate"
    echo "JWT_SECRET=$(openssl rand -base64 32)"
    echo "VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key"
    echo ""
    echo "See DEPLOYMENT.md for more details"
    echo ""
    read -p "Do you want to create .env now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "DATABASE_URL=mysql://root:password@localhost:3306/fixate" > .env
        echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env
        echo "VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key-here" >> .env
        echo "✅ .env file created. Please edit it with your actual values."
    fi
else
    echo "✅ .env file found"
fi
echo ""

# Check database connection
echo "🗄️  Checking database connection..."
if pnpm db:push --dry-run &> /dev/null; then
    echo "✅ Database connection successful"
    
    # Push schema
    echo "📊 Pushing database schema..."
    pnpm db:push
    echo "✅ Database schema created"
else
    echo "⚠️  Could not connect to database"
    echo "   Please check your DATABASE_URL in .env"
    echo "   See DEPLOYMENT.md for database setup instructions"
fi
echo ""

# Build project
echo "🔨 Building project..."
pnpm build
echo "✅ Project built successfully"
echo ""

echo "✨ Setup complete!"
echo ""
echo "To start the development server:"
echo "  pnpm dev"
echo ""
echo "To start the production server:"
echo "  pnpm start"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
echo ""
echo "Happy coding! 🎉"
