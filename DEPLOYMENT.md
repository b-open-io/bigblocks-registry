# BigBlocks Registry Deployment Guide

## Overview

This guide explains how to deploy the BigBlocks Registry monorepo to Vercel.

## Architecture

- **Registry App** (`apps/registry/`) - Serves component JSON files at `registry.bigblocks.dev`
- **Showcase App** (`apps/showcase/`) - Documentation site at `bigblocks.dev`

## Prerequisites

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   # or
   bun add -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Ensure you have access to the Vercel team/account

## Deployment Methods

### Method 1: Automated Script (Recommended)

Run the deployment script from the project root:

```bash
bun run deploy
```

This will:
1. Build all apps
2. Deploy the registry app to `registry.bigblocks.dev`
3. Deploy the showcase app to `bigblocks.dev`

### Method 2: Individual Deployment

Deploy each app separately:

```bash
# Deploy registry
bun run deploy:registry

# Deploy showcase
bun run deploy:showcase
```

### Method 3: Manual Vercel CLI

```bash
# Deploy registry
cd apps/registry
vercel --prod

# Deploy showcase
cd apps/showcase
vercel --prod
```

## First-Time Setup

When deploying for the first time, Vercel will ask:

1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your team/account
3. **Link to existing project?** → No (create new)
4. **Project name?** → 
   - Registry: `bigblocks-registry`
   - Showcase: `bigblocks-showcase`
5. **Directory?** → `./` (current directory)
6. **Override settings?** → No

## Environment Variables

### Registry App
Set in Vercel Dashboard or during deployment:
- `NEXT_PUBLIC_REGISTRY_URL`: `https://registry.bigblocks.dev`

### Showcase App
Set in Vercel Dashboard or during deployment:
- `NEXT_PUBLIC_REGISTRY_URL`: `https://registry.bigblocks.dev`
- `NEXT_PUBLIC_BASE_URL`: `https://bigblocks.dev`

## Custom Domains

After deployment, configure custom domains in Vercel Dashboard:

1. Go to Project Settings → Domains
2. Add custom domain:
   - Registry: `registry.bigblocks.dev`
   - Showcase: `bigblocks.dev`
3. Follow DNS configuration instructions

## Post-Deployment Testing

1. **Test Registry JSON endpoint**:
   ```bash
   curl https://registry.bigblocks.dev/r/step-indicator.json
   ```

2. **Test Component Installation**:
   ```bash
   npx shadcn@latest add https://registry.bigblocks.dev/r/step-indicator.json
   ```

3. **Test OpenInV0 Button**:
   - Visit a component page
   - Click "Open in v0" button
   - Verify it opens with correct registry URL

## Deployment Configuration

### Registry App (`apps/registry/vercel.json`)
- Builds registry JSON files before deployment
- Sets CORS headers for API access
- Configures caching for JSON files

### Showcase App (`apps/showcase/vercel.json`)
- Standard Next.js deployment
- Environment variables for registry URL

## Troubleshooting

### Build Failures
1. Ensure all dependencies are installed: `bun install`
2. Test local build: `bun run build`
3. Check for TypeScript errors

### CORS Issues
The registry app is configured with:
- `Access-Control-Allow-Origin: *`
- Proper cache headers

### Domain Issues
1. Verify DNS propagation
2. Check SSL certificate status in Vercel
3. Ensure no conflicting deployments

## CI/CD Setup (Future)

To automate deployments on push to main:

1. Add Vercel GitHub integration
2. Configure production branch as `main`
3. Set environment variables in Vercel project settings

## Rollback

To rollback a deployment:
1. Go to Vercel Dashboard
2. Select the project
3. Go to Deployments tab
4. Click "..." on a previous deployment
5. Select "Promote to Production"