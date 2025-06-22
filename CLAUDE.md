# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

BigBlocks Registry is a monorepo containing a shadcn-compatible component registry and documentation showcase for Bitcoin-related UI components. The project follows shadcn's component distribution model, allowing developers to install components directly into their projects using the shadcn CLI.

## 🚨 CRITICAL: Adding Components

### Automated Generation (Recommended)
Use the Claude Code SDK for multi-phase component generation:
```bash
bun scripts/sdk/generate-component.ts "component-name" category "description"
```

### Manual Commands
Use project commands for more control:
- `/project:plan-component [description]` - Plan and analyze requirements
- `/project:add-component [component-name]` - Add a UI component
- `/project:add-hook [hook-name]` - Add a React hook

## 📚 Shared Prompts & Memory

### Prompt System
All commands use shared context from:
@.claude/prompts/shared-context.md
@.claude/prompts/bitcoin-patterns.md

### Component Generation Phases
@.claude/prompts/phase1-planning.md
@.claude/prompts/phase2-questions.md
@.claude/prompts/phase3-implementation.md
@.claude/prompts/phase4-review.md
@.claude/prompts/phase5-finalize.md

## Architecture

### Monorepo Structure
- **apps/registry**: Component registry server (port 3002) that serves component definitions as JSON
- **apps/showcase**: Documentation and showcase site (port 3003) built with Fumadocs
- **packages/registry**: Shared registry data package

### Key Technologies
- Next.js 15 with React 19 and Turbopack
- Tailwind CSS v4 with CSS variables
- Fumadocs for MDX-based documentation
- rehype-pretty-code for syntax highlighting
- Radix UI primitives
- Turbo for monorepo orchestration

## Common Development Commands

### Root-level Commands
```bash
# Development
bun dev                  # Run all apps in parallel
bun registry:dev         # Run only registry app (port 3002)
bun showcase:dev         # Run only showcase app (port 3003)

# Build
bun build               # Build all apps
bun registry:build      # Build component registry using shadcn CLI
```

### Working in apps/showcase
```bash
cd apps/showcase
bun dev                 # Start with Turbopack on port 3003
bun build              # Production build
```

### Working in apps/registry
```bash
cd apps/registry
bun dev                # Start on port 3002
bun build             # Production build
bun registry:build    # Build component definitions to /public/r/
```

## Component Registry System

The registry follows shadcn's component distribution model:

1. Components are defined in `apps/registry/registry.json`
2. Running `bun registry:build` generates JSON files at `/public/r/[component-name].json`
3. These JSON files are consumed by the shadcn CLI for installation
4. Currently uses a local shadcn build: `node ~/code/shadcn-ui/packages/shadcn/dist/index.js build`

## Documentation System

### MDX Documentation
- Located in `apps/showcase/content/docs/`
- Uses Fumadocs with custom frontmatter schema
- Supports `featured` and `component` boolean flags
- Categories: Authentication, Social, Wallet, Market

### Code Block Styling
- Uses rehype-pretty-code with GitHub themes
- Custom transformers in `lib/transformers.ts` add copy functionality
- Supports npm/yarn/pnpm/bun command variations

### Component Documentation Pattern
```mdx
---
title: Component Name
description: Brief description
featured: true
component: true
---

<ComponentPreview name="component-demo" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">
    ```bash
    bunx shadcn@latest add http://localhost:3002/r/component-name.json
    ```
  </TabsContent>
  <TabsContent value="manual">
    <Steps>
      <Step>Install dependencies</Step>
      <Step>Copy component code</Step>
    </Steps>
  </TabsContent>
</CodeTabs>
```

## Routing Structure

### Showcase App
- `/` - Homepage with component grid
- `/docs` - Documentation root
- `/docs/[...slug]` - MDX documentation pages
- `/components/[name]` - Component demo pages

### Registry App
- `/r/[name].json` - Component definition endpoints
- `/r/index.json` - Registry index

## Key Configuration Files

### Component Configuration
- `apps/showcase/components.json` - shadcn configuration
- `apps/registry/registry.json` - Component registry definition (ONLY custom BigBlocks components)
- Style: "new-york" theme throughout

### Environment Variables
- `NEXT_PUBLIC_REGISTRY_URL` - Registry URL for component installation (default: http://localhost:3002)
- `NEXT_PUBLIC_BASE_URL` - Base URL for v0 links
- `V0_URL` - v0.dev URL (default: https://v0.dev)
- `V0_EDIT_SECRET` - Authentication token for advanced v0 integration

### v0 Integration
- **"Open in v0" buttons**: Only displayed on main component previews, not on individual demo variants
- **Component variants**: v0 opens the base component definition, not variant-specific implementations
- **Best use case**: Full blocks/pages rather than component variants
- **User workflow**: Users can ask v0 to modify components after opening (e.g., "make this vertical")
- **Registry types**: Demo components use `type: "registry:example"` to match shadcn-ui patterns

### Theme Compatibility
- **Full shadcn theme support**: All BigBlocks components use semantic color classes that adapt to any shadcn theme
- **CSS Variables**: Components use theme-aware classes like `bg-primary`, `text-muted-foreground`, etc.
- **No hard-coded colors**: Never use specific color classes like `bg-green-500` or `bg-blue-600`
- **Tested themes**: Verified compatibility with Caffeine and other community themes
- **Automatic adaptation**: Components inherit theme colors without modification

### Build Configuration
- `turbo.json` - Defines build pipeline and caching
- Root `package.json` - Workspace configuration

## Adding New Assets to the Registry

Use the appropriate command for each asset type:

- **Components**: `/project:add-component [component-name]` - UI components with optional embedded providers
- **Hooks**: `/project:add-hook [hook-name]` - React hooks for functionality
- **Providers**: `/project:add-provider [provider-name]` - App-level providers for global state
- **Blocks**: `/project:add-block [block-name]` - Complete page sections with multiple files
- **Examples**: `/project:add-example [component-name]-[variant]` - Demo implementations
- **Libraries**: `/project:add-lib [library-name]` - Utility functions and services
- **Themes**: `/project:add-theme [theme-name]` - Color scheme configurations

See `.claude/commands/` directory for detailed instructions on each asset type.

Key rules:
- ONLY add custom BigBlocks components (authentication, wallet, social, market)
- NEVER add standard shadcn-ui components (button, card, dialog, etc.)
- Standard components are installed via: `bunx shadcn@latest add [component]`
- All imports must use `@/components/ui/*` for installed components

## State Management Architecture

### 1. **App-Level Providers** (Global State)
- Located in app layout, wrapping entire application
- Examples: `BitcoinAuthProvider`, `WalletProvider`, `ThemeProvider`
- Use `/project:add-provider` to create these
- Accessed via hooks like `useBitcoinAuth()`

### 2. **Component-Level Providers** (Local State)
- Embedded within components for component-specific state
- Examples: Sidebar open/closed, accordion expanded state
- Only for state that doesn't need sharing with other components
- Created as part of the component file

### 3. **Cross-Component State** (Shared State)
- **Jotai**: For component-centric atomic state
  - Best for: React Suspense, dynamic atoms, component state
  - Example: Selected items, UI preferences
- **Zustand**: For module-level stores
  - Best for: Complex state logic, DevTools support
  - Example: Shopping cart, user preferences

### 4. **State Management Decision Tree**
1. Is it authentication/wallet/theme state? → App-level provider
2. Is it specific to one component? → Embedded provider or useState
3. Do multiple components need it? → Jotai atoms or Zustand store
4. Is it server state? → Consider React Query or SWR

### 5. **Implementation Patterns**
- Providers are installed at root level, not imported into components
- Hooks access global providers via useContext
- Components consume state via hooks, not direct provider imports
- Follow shadcn-ui patterns: single ThemeProvider at app level

## ⚠️ Critical Guidelines - DO NOT MODIFY

### Never Edit These Files/Directories:
1. **Installed shadcn-ui components** in `components/ui/`:
   - These are managed by shadcn CLI
   - Any manual edits will be lost on updates
   - Examples: button.tsx, dialog.tsx, tabs.tsx, etc.
   
2. **Generated files**:
   - `registry/__index__.tsx` - Auto-generated by build-registry script
   - Any files in `public/r/` - Generated JSON files
   - `.next/` directories - Next.js build output

3. **Configuration files** (unless explicitly needed):
   - `components.json` - shadcn configuration
   - `tailwind.config.ts` - Only modify with extreme caution
   - `tsconfig.json` - TypeScript configuration

### Always Edit These:
1. **Custom BigBlocks components** in `registry/bigblocks/`:
   - Our authentication, wallet, social, market components
   - Example files and demos

2. **Documentation** in `content/docs/`:
   - Component documentation
   - Usage examples
   - API references

3. **Custom components** (not from shadcn):
   - Components specific to our apps
   - Layout components
   - Utility components

### Development Best Practices:
1. **Component Installation**:
   - Standard shadcn components: `bunx shadcn@latest add [component]`
   - BigBlocks components: Use the `/project:add-component` command
   - NEVER manually copy shadcn component code

2. **Import Paths**:
   - Always use `@/components/ui/*` for installed shadcn components
   - Use `@/registry/bigblocks/*` for our custom components
   - Never use relative imports for UI components

3. **Registry Structure**:
   - `apps/registry` only serves JSON files - don't add UI logic here
   - `apps/showcase` handles all documentation and demos
   - Keep registry TypeScript files minimal and focused on component definition

4. **Environment Variables**:
   - Always use `process.env.NEXT_PUBLIC_REGISTRY_URL` for registry URLs
   - Never hardcode localhost URLs
   - Default fallbacks are acceptable for development

## Deployment

The project is deployed on Vercel with:
- **Registry App**: `registry.bigblocks.dev` - Serves component JSON files
- **Showcase App**: `bigblocks.dev` - Documentation and component demos

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy
```bash
# Deploy both apps to production
bun run deploy

# Deploy individually
bun run deploy:registry
bun run deploy:showcase
```

## Important Notes

- The project uses Bun as the package manager (requires Bun 1.0.0+)
- Tailwind CSS v4 is used - do not downgrade
- All apps use the same "new-york" shadcn style for consistency
- The showcase app uses `[[...slug]]` routing for flexible documentation paths
- Code highlighting with copy buttons and package manager switching
- Registry app excludes `registry/` directory from TypeScript compilation to avoid build errors

## 🤖 Automation & CI/CD

### Claude Code SDK Integration
The project includes automated component generation using the Claude Code SDK:
```bash
# Generate components with multi-phase workflow
bun scripts/sdk/generate-component.ts "component-name" category "description"
```

### GitHub Actions
Automated workflows for component quality:
- **Component Review**: Automatic PR review for new components
- **Type Safety**: TypeScript validation on all PRs
- **Theme Compatibility**: Checks for hardcoded colors
- **Visual Testing**: Playwright screenshots for components

See `.claude/GITHUB_ACTIONS_SETUP.md` for setup instructions.

### MCP Servers
Configure Model Context Protocol servers in `.claude/mcp-config.json`:
- `playwright` - Visual testing and screenshots
- `filesystem` - Enhanced file operations
- `bigblocks` - Bitcoin wallet operations
- `github` - PR and issue automation

### Using MCP in Claude Code
```bash
# Use MCP servers for enhanced capabilities
claude --mcp-config .claude/mcp-config.json
```