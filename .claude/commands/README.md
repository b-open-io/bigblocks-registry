# BigBlocks Registry Commands

This directory contains command templates for adding different types of assets to the BigBlocks registry. Each command provides comprehensive guidance for creating production-ready components, hooks, and other assets.

## Available Commands

### 🧩 `/project:add-component [name]`
Add a new UI component to the registry.
- Examples: AuthButton, SendBSVButton, ProfileCard
- Includes embedded providers when needed
- Full theme compatibility

### 🪝 `/project:add-hook [name]`
Add a new React hook to the registry.
- Examples: useBitcoinAuth, useSendBSV, useSocialFeed
- Client-side only (includes "use client")
- Can return provider components

### 📦 `/project:add-block [name]`
Add a complete page/section block to the registry.
- Examples: dashboard, auth-flow, wallet-page
- Multiple files with target paths
- Heavy dependencies

### 🎨 `/project:add-example [name]`
Add a demo example for an existing component.
- Examples: button-sizes, form-validation, card-loading
- No npm dependencies (only registryDependencies)
- Always imports from @/components/ui/*

### 📚 `/project:add-lib [name]`
Add a utility library to the registry.
- Examples: AuthManager, storage-adapters, api-client
- Non-visual utilities and services
- Can work in both client and server

### 🎨 `/project:add-theme [name]`
Add a color theme to the registry.
- Examples: theme-bitcoin, theme-ocean, theme-sunset
- HSL format colors
- Light and dark mode definitions

## Key Principles

### Type Safety
- **NEVER** use `any`, `unknown`, or type casting
- Trace all types to their source
- Export all necessary types

### Provider Pattern
Following shadcn-ui patterns:
- Providers are embedded within components
- No separate provider registry type
- Small, focused providers

### File Structure
```
apps/registry/registry/new-york/
├── ui/               # Components (registry:ui)
├── hooks/            # Hooks (registry:hook)
├── blocks/           # Page blocks (registry:block)
├── examples/         # Demos (registry:example)
├── lib/              # Libraries (registry:lib)
└── themes/           # Color themes (registry:theme)
```

### Theme Compatibility
All components must use semantic color classes:
- `bg-primary text-primary-foreground`
- `bg-secondary text-secondary-foreground`
- `bg-muted text-muted-foreground`
- `bg-accent text-accent-foreground`
- `bg-destructive text-destructive-foreground`

Never use hard-coded colors like `bg-green-500` or `bg-blue-600`.

## Workflow

1. **Choose the right command** based on what you're building
2. **Follow the template** exactly - it includes all best practices
3. **Test thoroughly** - type checking, linting, and builds
4. **Document properly** - MDX files with installation and usage
5. **Build registry** - `cd apps/registry && bun registry:build`

## Common Patterns

### Client vs Server
- Components with interactivity: `"use client"`
- Hooks: Always `"use client"`
- Libraries: Usually no directive (unless using browser APIs)
- Themes: No code, just configuration

### Dependencies
- `dependencies`: NPM packages needed
- `registryDependencies`: Other BigBlocks/shadcn components needed
- Examples only use `registryDependencies`

### Import Paths
- Components/Hooks: `@/components/ui/*` or `@/hooks/*`
- Libraries: `@/lib/*`
- Never use relative imports for registry items

## Testing Checklist

Before committing any new asset:

```bash
# Type checking (MANDATORY)
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Check for any usage
grep -r "\bany\b" [your-files]

# Linting
cd apps/showcase && bun run lint
cd apps/registry && bun run lint

# Build test
cd apps/showcase && bun run build
```

## Reference Implementation

Always check shadcn-ui for patterns:
- Components: `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/ui/`
- Hooks: `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/hooks/`
- Blocks: `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/blocks/`
- Themes: `/Users/satchmo/code/shadcn-ui/apps/www/registry/registry-themes.ts`