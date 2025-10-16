#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Retail Relay Backend...${NC}"

# Navigate to backend directory
cd "$(dirname "$0")" || exit

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${RED}❌ MongoDB is not running!${NC}"
    echo -e "${YELLOW}Starting MongoDB...${NC}"
    brew services start mongodb-community 2>/dev/null || {
        echo -e "${RED}Failed to start MongoDB. Please start it manually:${NC}"
        echo "  brew services start mongodb-community"
        echo "  or use Docker: docker run -d -p 27017:27017 mongo"
        exit 1
    }
    sleep 2
fi

# Kill any process on port 5002
echo -e "${YELLOW}Checking port 5002...${NC}"
lsof -ti:5002 | xargs kill -9 2>/dev/null
sleep 1

# Start the backend
echo -e "${GREEN}✅ Starting backend on port 5002...${NC}"
npm run dev
