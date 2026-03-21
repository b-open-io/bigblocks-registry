# Local Testing Guide for BigBlocks Registry

## ✅ System Status

All components are properly configured:
- Claude Code SDK installed
- ANTHROPIC_API_KEY environment variable set
- All prompt files present and valid
- GitHub Actions configured (using `@beta` version)
- TypeScript types fixed

## 🧪 Testing Methods

### Method 1: Manual Commands (Recommended for Testing)

Use the project commands directly in this Claude Code session:

```bash
# Plan a component
/project:plan-component "An authentication button with Bitcoin wallet support"

# Add a component
/project:add-component test-auth-button

# Add a hook
/project:add-hook use-bitcoin-balance

# Add a provider
/project:add-provider wallet-provider
```

### Method 2: Claude Code SDK (Within Claude Terminal)

The SDK scripts are designed to work within the Claude Code terminal environment:

1. **In Claude Code terminal** (not regular terminal):
   ```bash
   # This will work in Claude Code
   bun scripts/sdk/generate-component.ts "auth-button" authentication "Bitcoin authentication button"
   ```

2. **With MCP servers** (for visual testing):
   ```bash
   # Start Claude with MCP config
   claude --mcp-config .claude/mcp-config.json
   
   # Then run visual tests
   bun scripts/sdk/visual-test.ts auth-button
   ```

### Method 3: GitHub Actions (Automated)

1. **Set up GitHub Actions**:
   ```bash
   # In Claude Code terminal
   /install-github-app
   ```

2. **Or manually**:
   - Add `ANTHROPIC_API_KEY` to repository secrets
   - Create a PR with component changes
   - Add `new-component` label
   - Claude will automatically review

## 📋 Quick Test

To verify everything works, try this command right now:

```
/project:add-component simple-test-button
```

When prompted, use:
- Category: `authentication`
- Description: `A simple button to test the generation system`

## 🎯 Why the SDK Scripts Don't Work Standalone

The Claude Code SDK (`@anthropic-ai/claude-code`) is designed to:
1. Run within the Claude Code terminal environment
2. Have access to Claude's tool execution system
3. Use the running Claude session's context

When run outside Claude Code terminal, it can't establish the proper connection.

## 🚀 Next Steps

1. **Test a manual command**: Try `/project:add-component test-button`
2. **Review the generated code**: Check the output follows all patterns
3. **Build the registry**: Run `bun registry:build`
4. **Test installation**: Use the shadcn CLI to install your component

## 📝 Alternative: Direct API Testing

If you need to test the Claude API directly, use the Anthropic SDK instead:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

This bypasses the Claude Code SDK and uses the standard API directly.