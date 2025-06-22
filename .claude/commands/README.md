# BigBlocks Registry Commands

This directory contains command templates for adding different types of assets to the BigBlocks registry.

## 📚 Shared Context

All commands use shared prompts and patterns defined in:
- `@.claude/prompts/shared-context.md` - Core rules and patterns
- `@.claude/prompts/bitcoin-patterns.md` - Bitcoin-specific patterns
- `@.claude/prompts/phase1-planning.md` - Planning phase
- `@.claude/prompts/phase2-questions.md` - Interactive Q&A
- `@.claude/prompts/phase3-implementation.md` - Implementation patterns
- `@.claude/prompts/phase4-review.md` - Review checklist
- `@.claude/prompts/phase5-finalize.md` - Final testing

## 🚀 Quick Start

### Automated Component Generation

Use the Claude Code SDK script for multi-phase generation:

```bash
# Generate a component with automation
bun scripts/sdk/generate-component.ts "auth-backup-manager" authentication "Manage Bitcoin backup files"

# Interactive mode with Q&A
bun scripts/sdk/generate-component.ts "send-token-button" wallet "Send BSV tokens" --interactive
```

### Manual Commands

Use these commands for more control:

- `/project:plan-component [description]` - Analyzes requirements and plans approach
- `/project:add-component [name]` - Add a UI component
- `/project:add-hook [name]` - Add a React hook
- `/project:add-provider [name]` - Add an app-level provider
- `/project:add-block [name]` - Add a complete page section
- `/project:add-example [name]` - Add a demo example
- `/project:add-lib [name]` - Add a utility library
- `/project:add-theme [name]` - Add a color theme

## 🤖 Automation Features

### GitHub Actions
- Automatic component review on PRs
- Type safety validation
- Theme compatibility checks
- Visual regression testing

### MCP Integration
Configure MCP servers in `.claude/mcp-config.json`:
- `playwright` - Visual testing and screenshots
- `filesystem` - Enhanced file operations
- `bigblocks` - Bitcoin operations
- `github` - PR and issue management

### Claude Code SDK
The SDK enables:
- Multi-phase component generation
- Automated testing workflows
- CI/CD integration
- Batch operations

## 📖 Documentation

For detailed information about each command and the generation process, see the individual command files and shared prompt documentation.