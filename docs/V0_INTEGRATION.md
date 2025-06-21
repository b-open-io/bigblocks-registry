# v0 Integration Documentation

This document explains how to set up advanced v0 integration for the BigBlocks Registry.

## Current Status

The BigBlocks Registry now has full v0 integration enabled with both:

### 1. Basic Integration (Fallback)
- Uses the public `https://v0.dev/chat/api/open?url=` endpoint
- No authentication required
- Works out of the box
- Limited to opening the component JSON

### 2. Advanced Integration (Currently Active)
- Uses the private `https://v0.dev/chat/api/open-in-v0` POST endpoint
- Sends rich component data with metadata
- Better handling of component variants
- Uses authentication token for v0 API access

## How Advanced Integration Works

### Environment Configuration

The `V0_EDIT_SECRET` is configured in the environment variables. This token enables the advanced integration features.

### Server Action Implementation

The integration uses a server action (`editInV0`) that:
1. Fetches the registry item JSON
2. Transforms the component data with metadata
3. Makes a POST request to v0's API
4. Returns a session URL for editing in v0

### Deployment

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
- The advanced integration requires proper environment configuration