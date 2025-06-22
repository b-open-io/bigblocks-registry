Add a new block "$ARGUMENTS" to the BigBlocks registry.

## What is a Block?
A block is a complete, self-contained section or page component that includes multiple files and dependencies. Examples: dashboards, authentication flows, complete forms, landing pages.

## CRITICAL RULES
1. **Blocks are multi-file components** - they include pages, components, and data files
2. **Use target paths** - each file needs a proper target location in the user's project
3. **Heavy dependencies** - blocks typically need many shadcn components and npm packages
4. **NEVER use `any`, `unknown`, or type casting** - trace all types to their source
5. **Check shadcn-ui blocks**: Always reference `/Users/satchmo/code/shadcn-ui/apps/www/registry/registry-blocks.ts`

## Valid BigBlocks Block Categories
- authentication-flows: Complete auth pages with all steps
- dashboards: Analytics dashboards with charts and tables
- marketing: Landing pages, pricing sections, feature showcases
- wallet-pages: Full wallet management interfaces
- social-feeds: Complete social media interfaces

## Step 1: Research and Plan

### Check shadcn-ui blocks for patterns:
```bash
# Look at existing blocks
ls /Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/blocks/
# Check block structure
cat /Users/satchmo/code/shadcn-ui/apps/www/registry/registry-blocks.ts
```

### Plan your block structure:
1. Main page component(s)
2. Sub-components needed
3. Data files (if needed)
4. Required shadcn components
5. NPM dependencies

## Step 2: Create Block Files

### Main Page File
Location: `apps/registry/registry/new-york/blocks/[block-name]/page.tsx`

```tsx
"use client"

import * as React from "react"
// Import all needed shadcn components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// Import block-specific components
import { BlockHeader } from "./components/block-header"
import { BlockContent } from "./components/block-content"

export default function BlockNamePage() {
  // Page-level state and logic
  
  return (
    <div className="container mx-auto py-10">
      <BlockHeader />
      <BlockContent />
    </div>
  )
}
```

### Sub-component Files
Location: `apps/registry/registry/new-york/blocks/[block-name]/components/[component-name].tsx`

```tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentProps {
  className?: string
}

export function ComponentName({ className }: ComponentProps) {
  return (
    <div className={cn("", className)}>
      {/* Component content */}
    </div>
  )
}
```

### Data Files (if needed)
Location: `apps/registry/registry/new-york/blocks/[block-name]/data.json`

```json
{
  "items": [
    {
      "id": "1",
      "name": "Example",
      "value": 100
    }
  ]
}
```

## Step 3: Update Registry Configuration

Edit `apps/registry/registry.json`:
```json
{
  "name": "[block-name]",
  "type": "registry:block",
  "description": "Detailed description of what this block provides",
  "author": "Satchmo",
  "dependencies": [
    // NPM packages needed
    "@tanstack/react-table",
    "recharts",
    "zod"
  ],
  "registryDependencies": [
    // All shadcn components used
    "card",
    "button",
    "table",
    "tabs",
    "form",
    "input",
    "label"
  ],
  "files": [
    {
      "path": "registry/new-york/blocks/[block-name]/page.tsx",
      "type": "registry:page",
      "target": "app/[block-name]/page.tsx"
    },
    {
      "path": "registry/new-york/blocks/[block-name]/components/block-header.tsx",
      "type": "registry:component",
      "target": "app/[block-name]/components/block-header.tsx"
    },
    {
      "path": "registry/new-york/blocks/[block-name]/components/block-content.tsx",
      "type": "registry:component", 
      "target": "app/[block-name]/components/block-content.tsx"
    },
    {
      "path": "registry/new-york/blocks/[block-name]/data.json",
      "type": "registry:file",
      "target": "app/[block-name]/data.json"
    }
  ]
}
```

## Step 4: Build Registry
```bash
cd apps/registry && bun registry:build
```

## Step 5: Create Block Documentation

Location: `apps/showcase/content/docs/blocks/[block-name].mdx`

```mdx
---
title: [Block Title]
description: [Comprehensive description of the block's purpose and features]
featured: true
component: true
---

<ComponentPreview name="[block-name]" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

```bash
npx shadcn@latest add {{REGISTRY_URL}}/r/[block-name].json
```

This will:
- Install all required dependencies
- Add all shadcn-ui components used by the block
- Create the block files in your project

  </TabsContent>
  <TabsContent value="manual">

<Steps>

<Step>Install dependencies:</Step>

```bash
npm install [list all npm dependencies]
```

<Step>Install required shadcn-ui components:</Step>

```bash
npx shadcn@latest add card button table tabs form input label
```

<Step>Copy the block files to your project.</Step>

<Step>Update import paths to match your project structure.</Step>

</Steps>

  </TabsContent>
</CodeTabs>

## Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## File Structure

```
app/
└── [block-name]/
    ├── page.tsx              # Main page component
    ├── components/
    │   ├── block-header.tsx  # Header component
    │   └── block-content.tsx # Content component
    └── data.json            # Sample data (if applicable)
```

## Customization

### Styling
All components use Tailwind CSS and support theme customization through CSS variables.

### Data
Replace the sample data in `data.json` with your own data source.

### Components
Each component can be customized independently. They all accept `className` props for additional styling.
```

## Step 6: Create Visual Demo (if applicable)

For blocks that can be demoed in isolation, create:
`apps/registry/registry/new-york/examples/[block-name]-demo.tsx`

```tsx
"use client"

import BlockNamePage from "@/registry/new-york/blocks/[block-name]/page"

export default function BlockNameDemo() {
  return (
    <div className="w-full">
      <BlockNamePage />
    </div>
  )
}
```

## Step 7: Test the Block

```bash
# Type checking
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Linting
cd apps/showcase && bun run lint
cd apps/registry && bun run lint

# Test the build
cd apps/showcase && bun run build
```

## Common Mistakes to Avoid
- Forgetting to set target paths for files
- Not including all required registryDependencies
- Using relative imports instead of @/ imports
- Creating blocks that are too small (use components instead)
- Missing data files or configuration
- Not testing with a fresh installation
- Hard-coding colors instead of using theme variables

## Reference Implementation
Always check shadcn-ui blocks for patterns:
- Dashboard blocks: `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/blocks/dashboard-*`
- Sidebar blocks: `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/blocks/sidebar-*`

## Target Path Guidelines
- Pages: `app/[feature]/page.tsx`
- Components: `app/[feature]/components/[name].tsx`
- Data files: `app/[feature]/data.json`
- Utilities: `app/[feature]/lib/[name].ts`