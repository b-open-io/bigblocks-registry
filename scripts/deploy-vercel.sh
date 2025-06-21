#!/bin/bash

# BigBlocks Registry Vercel Deployment Script

echo "🚀 BigBlocks Registry Deployment to Vercel"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to deploy an app
deploy_app() {
    local app_name=$1
    local app_path=$2
    local production_url=$3
    
    echo -e "\n${YELLOW}Deploying $app_name...${NC}"
    cd "$app_path" || exit 1
    
    # Check if already linked to a Vercel project
    if [ -f ".vercel/project.json" ]; then
        echo "Project already linked to Vercel"
    else
        echo "Linking to Vercel project..."
        vercel link
    fi
    
    # Deploy to production
    echo -e "${GREEN}Deploying to production...${NC}"
    vercel --prod
    
    echo -e "${GREEN}✅ $app_name deployed successfully!${NC}"
    echo "URL: $production_url"
    
    cd - > /dev/null
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Error: Vercel CLI is not installed${NC}"
    echo "Install it with: npm i -g vercel"
    exit 1
fi

# Check if we're in the project root
if [ ! -f "package.json" ] || [ ! -d "apps" ]; then
    echo -e "${RED}Error: Please run this script from the project root${NC}"
    exit 1
fi

# Build everything first
echo -e "${YELLOW}Building all apps...${NC}"
bun run build

# Deploy Registry App
echo -e "\n${YELLOW}1. Registry App Deployment${NC}"
echo "This will be deployed to: registry.bigblocks.dev"
echo "Press Enter to continue or Ctrl+C to cancel..."
read -r

deploy_app "Registry App" "apps/registry" "https://registry.bigblocks.dev"

# Deploy Showcase App
echo -e "\n${YELLOW}2. Showcase App Deployment${NC}"
echo "This will be deployed to: bigblocks.dev"
echo "Press Enter to continue or Ctrl+C to cancel..."
read -r

deploy_app "Showcase App" "apps/showcase" "https://bigblocks.dev"

echo -e "\n${GREEN}🎉 Deployment Complete!${NC}"
echo "Registry: https://registry.bigblocks.dev"
echo "Showcase: https://bigblocks.dev"
echo ""
echo "Next steps:"
echo "1. Configure custom domains in Vercel dashboard"
echo "2. Test component installation:"
echo "   npx shadcn@latest add https://registry.bigblocks.dev/r/step-indicator.json"