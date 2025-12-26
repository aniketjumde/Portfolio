#!/bin/bash

echo "🚀 Portfolio Deployment Readiness Check"
echo "========================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    exit 1
fi

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

echo ""

# Check if node_modules exists
echo "📚 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules found"
else
    echo -e "${YELLOW}!${NC} node_modules not found. Installing..."
    npm install
fi

echo ""

# Check required files
echo "📄 Checking required files..."

files=("vercel.json" "api/contact.ts" "lib/mail.ts" ".env.example" "package.json" "index.html")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file exists"
    else
        echo -e "${RED}✗${NC} $file missing"
    fi
done

echo ""

# Check .env file
echo "🔐 Checking environment configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    if grep -q "EMAIL_USER=" .env && grep -q "EMAIL_PASS=" .env; then
        echo -e "${GREEN}✓${NC} Email credentials configured"
    else
        echo -e "${YELLOW}!${NC} Email credentials might be missing in .env"
    fi
else
    echo -e "${YELLOW}!${NC} .env file not found (optional for Vercel deployment)"
    echo "   Environment variables should be set in Vercel Dashboard"
fi

echo ""

# Check if .gitignore exists
echo "🔒 Checking .gitignore..."
if [ -f ".gitignore" ]; then
    if grep -q ".env" .gitignore; then
        echo -e "${GREEN}✓${NC} .env is in .gitignore"
    else
        echo -e "${YELLOW}!${NC} .env should be in .gitignore"
    fi
else
    echo -e "${YELLOW}!${NC} .gitignore not found"
fi

echo ""

# Test build
echo "🏗️  Testing production build..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Build successful"
    
    # Check dist folder
    if [ -d "dist" ]; then
        echo -e "${GREEN}✓${NC} dist/ folder created"
        
        # Check if index.html exists in dist
        if [ -f "dist/index.html" ]; then
            echo -e "${GREEN}✓${NC} dist/index.html exists"
        else
            echo -e "${RED}✗${NC} dist/index.html not found"
        fi
    else
        echo -e "${RED}✗${NC} dist/ folder not created"
    fi
else
    echo -e "${RED}✗${NC} Build failed"
    echo "   Run 'npm run build' to see the error"
fi

echo ""

# Git check
echo "📚 Checking Git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Git repository initialized"
    
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}!${NC} You have uncommitted changes"
        echo "   Commit and push before deploying to Vercel"
    else
        echo -e "${GREEN}✓${NC} No uncommitted changes"
    fi
    
    # Check remote
    if git remote -v | grep -q "origin"; then
        REMOTE_URL=$(git remote get-url origin)
        echo -e "${GREEN}✓${NC} Remote repository: $REMOTE_URL"
    else
        echo -e "${YELLOW}!${NC} No remote repository configured"
    fi
else
    echo -e "${YELLOW}!${NC} Not a git repository"
fi

echo ""
echo "========================================"
echo "📋 Deployment Checklist:"
echo ""
echo "Before deploying to Vercel:"
echo "  1. ✓ Ensure all files are committed to Git"
echo "  2. ✓ Push to GitHub/GitLab/Bitbucket"
echo "  3. ✓ Get Gmail App Password from https://myaccount.google.com/apppasswords"
echo "  4. ✓ Import repository in Vercel (https://vercel.com/new)"
echo "  5. ✓ Add EMAIL_USER and EMAIL_PASS environment variables in Vercel"
echo "  6. ✓ Deploy!"
echo ""
echo "📖 Read README_DEPLOY.md for detailed instructions"
echo "========================================"
