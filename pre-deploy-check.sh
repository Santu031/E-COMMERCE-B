#!/bin/bash

# Vercel Deployment Pre-Check Script
# Run this before deploying to catch common issues

echo "🔍 Vercel Deployment Pre-Check"
echo "================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track if all checks pass
ALL_CHECKS_PASSED=true

# Check 1: Node modules installed
echo -n "📦 Checking node_modules... "
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   Run: npm install"
    ALL_CHECKS_PASSED=false
fi

# Check 2: TypeScript compilation
echo -n "🔧 Checking TypeScript compilation... "
if npm run type-check > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   Run: npm run type-check"
    ALL_CHECKS_PASSED=false
fi

# Check 3: Required files exist
echo -n "📄 Checking required files... "
REQUIRED_FILES=("vercel.json" "api/index.ts" ".vercelignore" ".env.example")
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   Missing files:"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
    ALL_CHECKS_PASSED=false
fi

# Check 4: .env file exists (for local testing)
echo -n "🔐 Checking .env file... "
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC} (Not required for Vercel, but needed for local dev)"
fi

# Check 5: Validate vercel.json
echo -n "📋 Validating vercel.json... "
if command -v jq &> /dev/null; then
    if jq empty vercel.json 2>/dev/null; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${RED}✗${NC}"
        echo "   Invalid JSON in vercel.json"
        ALL_CHECKS_PASSED=false
    fi
else
    echo -e "${YELLOW}⚠${NC} (Install 'jq' for JSON validation)"
fi

# Check 6: Check package.json scripts
echo -n "📜 Checking package.json scripts... "
if grep -q "vercel-build" package.json && grep -q "type-check" package.json; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   Missing required scripts in package.json"
    ALL_CHECKS_PASSED=false
fi

echo ""
echo "================================"

if [ "$ALL_CHECKS_PASSED" = true ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "🚀 Ready to deploy to Vercel!"
    echo ""
    echo "Next steps:"
    echo "1. Set up MongoDB Atlas (if not done)"
    echo "2. Configure environment variables in Vercel"
    echo "3. Run: vercel (for preview) or vercel --prod"
    echo ""
    echo "📚 See QUICK_DEPLOY.md for detailed instructions"
else
    echo -e "${RED}❌ Some checks failed!${NC}"
    echo ""
    echo "Please fix the issues above before deploying."
    exit 1
fi

echo ""
echo "📋 Environment Variables Needed in Vercel:"
echo "  - NODE_ENV"
echo "  - MONGODB_URI"
echo "  - JWT_SECRET"
echo "  - JWT_REFRESH_SECRET"
echo "  - JWT_EXPIRE"
echo "  - JWT_REFRESH_EXPIRE"
echo "  - ALLOWED_ORIGINS"
echo ""
echo "See .env.example for template"
