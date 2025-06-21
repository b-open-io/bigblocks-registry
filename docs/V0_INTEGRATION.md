# v0 Integration Documentation

This document explains how to set up advanced v0 integration for the BigBlocks Registry.

## Current Status

The BigBlocks Registry supports two levels of v0 integration:

### 1. Basic Integration (Currently Active)
- Uses the public `https://v0.dev/chat/api/open?url=` endpoint
- No authentication required
- Works out of the box
- Limited to opening the component JSON

### 2. Advanced Integration (Requires V0_EDIT_SECRET)
- Uses the private `https://v0.dev/chat/api/open-in-v0` POST endpoint
- Sends rich component data with metadata
- Better handling of component variants
- Requires authentication token from Vercel

## How to Enable Advanced Integration

### Step 1: Obtain V0_EDIT_SECRET

The `V0_EDIT_SECRET` is a special authentication token that must be obtained from the Vercel team. This is not available through standard Vercel CLI commands.

To request access:
1. Contact the v0 team at support@v0.dev
2. Explain that you're running a shadcn-compatible component registry
3. Request access to the `open-in-v0` API endpoint
4. They will provide you with:
   - `V0_EDIT_SECRET` - Authentication token
   - `DEPLOYMENT_PROTECTION_BYPASS` (optional) - For protected deployments

### Step 2: Configure Environment Variables

Add the following to your `.env.local` file:

```env
# v0 Integration
V0_URL=https://v0.dev
V0_EDIT_SECRET=your_secret_here
DEPLOYMENT_PROTECTION_BYPASS=your_bypass_token_here  # Optional
```

### Step 3: Deploy

Once the environment variables are set, the advanced integration will automatically activate. The server action will detect the presence of `V0_EDIT_SECRET` and use the POST endpoint instead of the simple URL approach.

## Benefits of Advanced Integration

1. **Better Variant Handling**: The POST endpoint receives the full component data, potentially allowing v0 to better understand and render variants
2. **Rich Metadata**: Includes project name, source URL, and other context
3. **Future Features**: Access to new v0 features as they're released

## Fallback Behavior

If `V0_EDIT_SECRET` is not set, the system automatically falls back to the basic integration, ensuring the "Open in v0" functionality always works.

## Component Variants Pattern

Following shadcn-ui's pattern, we register component variants (like `step-indicator-vertical`) as separate registry entries. This allows:
- Documentation to show different examples via `<ComponentPreview>`
- Users to install specific variants if needed
- v0 to open specific variants (though users can modify any component in v0)

## Troubleshooting

- If you see "Unauthorized - check V0_EDIT_SECRET", verify your token is correct
- Check the browser console for any errors
- Ensure your registry URL is publicly accessible
- Contact support@v0.dev for assistance with the API