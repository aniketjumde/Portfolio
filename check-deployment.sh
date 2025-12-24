#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  Vercel Deployment Checker${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check if required files exist
echo -e "${YELLOW}Checking required files...${NC}"

files=(
  "vercel.json"
  "package.json"
  "api/contact.ts"
  "lib/mail.ts"
  ".env.example"
  ".gitignore"
)

all_files_exist=true

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file exists"
  else
    echo -e "${RED}✗${NC} $file is missing!"
    all_files_exist=false
  fi
done

echo ""

# Check if .env file exists
if [ -f ".env" ]; then
  echo -e "${GREEN}✓${NC} .env file exists"
  
  # Check if required environment variables are set
  if grep -q "EMAIL_USER=" .env && grep -q "EMAIL_PASS=" .env; then
    echo -e "${GREEN}✓${NC} Environment variables are configured"
  else
    echo -e "${YELLOW}⚠${NC} Some environment variables might be missing"
    echo -e "  Make sure .env contains EMAIL_USER and EMAIL_PASS"
  fi
else
  echo -e "${YELLOW}⚠${NC} .env file not found"
  echo -e "  ${BLUE}Tip:${NC} Copy .env.example to .env and add your credentials"
  echo -e "  ${BLUE}Command:${NC} cp .env.example .env"
fi

echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} Dependencies installed"
else
  echo -e "${YELLOW}⚠${NC} Dependencies not installed"
  echo -e "  ${BLUE}Run:${NC} npm install"
fi

echo ""

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
  echo -e "${GREEN}✓${NC} Vercel CLI is installed"
  vercel_version=$(vercel --version)
  echo -e "  Version: $vercel_version"
else
  echo -e "${YELLOW}⚠${NC} Vercel CLI not installed"
  echo -e "  ${BLUE}Install with:${NC} npm i -g vercel"
fi

echo ""

# Summary
echo -e "${BLUE}================================${NC}"
if [ "$all_files_exist" = true ]; then
  echo -e "${GREEN}✓ All required files are present!${NC}"
else
  echo -e "${RED}✗ Some files are missing!${NC}"
fi

echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo -e "1. Configure .env with your Gmail credentials"
echo -e "2. Run ${GREEN}npm install${NC} if dependencies are not installed"
echo -e "3. Test locally with ${GREEN}vercel dev${NC}"
echo -e "4. Deploy with ${GREEN}vercel${NC}"
echo ""
echo -e "For detailed instructions, see:"
echo -e "  📖 QUICK_DEPLOY.md - Quick start guide"
echo -e "  📖 DEPLOYMENT.md - Full deployment guide"
echo -e "  📖 VERCEL_SETUP.md - Configuration details"
echo -e "${BLUE}================================${NC}"
