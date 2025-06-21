# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

BigBlocks Registry is a monorepo containing a shadcn-compatible component registry and documentation showcase for Bitcoin-related UI components. The project follows shadcn's component distribution model, allowing developers to install components directly into their projects using the shadcn CLI.

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
- `apps/registry/registry.json` - Component registry definition
- Style: "new-york" theme throughout

### Build Configuration
- `turbo.json` - Defines build pipeline and caching
- Root `package.json` - Workspace configuration

## Adding New Components

1. Add component definition to `apps/registry/registry.json`
2. Create component file in appropriate location
3. Run `bun registry:build` to generate JSON
4. Create MDX documentation in `apps/showcase/content/docs/components/`
5. Add component preview/demo if needed

## Important Notes

- The project uses Bun as the package manager (requires Bun 1.0.0+)
- Tailwind CSS v4 is used - do not downgrade
- All apps use the same "new-york" shadcn style for consistency
- The showcase app uses `[[...slug]]` routing for flexible documentation paths
- Code highlighting requires transformers to enable copy buttons