Add a new component "$ARGUMENTS" to the BigBlocks registry.

## CRITICAL RULES
1. Only add CUSTOM BigBlocks components! NEVER add standard shadcn-ui components to our registry!
2. Always BUILD components using shadcn-ui components first, Radix UI primitives second
3. All imports must use @/components/ui/* for installed components
4. **NEVER use `any`, `unknown`, or type casting** - trace all types to their source
5. **Check shadcn-ui reference**: Always look at `/Users/satchmo/code/shadcn-ui` for patterns

## Valid BigBlocks Categories
- authentication: AuthButton, LoginForm, DeviceLinkQR, SignupFlow, OAuthRestoreFlow
- wallet: SendBSVButton, WalletOverview, TokenBalance, DonateButton
- social: PostButton, SocialFeed, LikeButton, FollowButton, MessageDisplay
- market: CreateListingButton, MarketTable, BuyListingButton, CancelListingButton
- ui-components: StepIndicator, QRCodeRenderer, TransactionProgress, ErrorDisplay

## Step 1: Research and Plan

### Available shadcn-ui components:
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, checkbox, collapsible, combobox, command, context-menu, data-table, date-picker, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip

### Radix UI primitives (if no shadcn alternative):
https://www.radix-ui.com/primitives/docs/overview/introduction

### Actions:
1. Check shadcn-ui docs for the component you need: https://ui.shadcn.com/docs/components/[component-name]
2. **Check shadcn-ui source code for patterns**:
   ```bash
   # Look at similar components
   ls /Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/ui/
   # Check if they use "use client"
   grep "use client" /Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/ui/[similar-component].tsx
   ```
3. Install required shadcn dependencies in BOTH apps:
   ```bash
   cd apps/showcase && bunx shadcn@latest add [required-components]
   cd apps/registry && bunx shadcn@latest add [required-components]
   ```
4. Note all npm dependencies from the shadcn docs

## Step 2: Create Component File

Location: `apps/registry/registry/new-york/ui/[component-name].tsx`

### "use client" Decision Tree:
1. **Does it use hooks (useState, useEffect, etc.)?** → Add "use client"
2. **Does it have event handlers (onClick, onChange)?** → Add "use client"
3. **Does it use browser APIs (window, document)?** → Add "use client"
4. **Does it use Context?** → Add "use client"
5. **Is it pure presentational with no interactivity?** → No "use client" needed

Template:
```tsx
// Add "use client" only if needed (see decision tree above)
"use client"

import * as React from "react"
// Import shadcn-ui components - use @/components/ui/*
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// Import types - NEVER use any, trace to source
import type { SpecificType } from "@/lib/types"
// Import from @/lib/utils for cn
import { cn } from "@/lib/utils"

export interface ComponentNameProps {
  // Define ALL props with proper TypeScript types
  // NEVER use any or unknown
  className?: string
  onAction?: (result: SpecificType) => void
  // ... other props with explicit types
}

export function ComponentName({
  className,
  onAction,
  ...props
}: ComponentNameProps) {
  // If using state/hooks, component needs "use client"
  const [state, setState] = React.useState<SpecificType | null>(null)
  
  // Browser API checks if needed
  React.useEffect(() => {
    if (typeof window === "undefined") return
    // Browser-specific code
  }, [])

  return (
    <div className={cn("", className)} {...props}>
      {/* Component implementation using shadcn-ui components */}
      {/* THEME COMPATIBILITY: Use semantic color classes:
          - bg-primary text-primary-foreground (main actions)
          - bg-secondary text-secondary-foreground (secondary actions)
          - bg-muted text-muted-foreground (disabled/inactive)
          - bg-accent text-accent-foreground (highlights)
          - bg-destructive text-destructive-foreground (dangerous actions)
          - border-border (borders)
          - ring-ring (focus rings)
          NEVER use hard-coded colors like bg-green-500, bg-blue-600, etc.
      */}
    </div>
  )
}
```

## Step 3: Update Registry Configuration

**IMPORTANT**: Component JSON must follow the shadcn registry schema:
- Schema reference: https://ui.shadcn.com/schema/registry-item.json
- Documentation: https://ui.shadcn.com/docs/registry/registry-item-json
- Valid types: "registry:lib", "registry:block", "registry:component", "registry:ui", "registry:hook", "registry:theme", "registry:page", "registry:file", "registry:style"
- Note: "registry:example" is NOT in the schema but is used by shadcn internally

Edit `apps/registry/registry.json`:
```json
{
  "name": "[component-name]",
  "type": "registry:ui",
  "author": "Satchmo",
  "dependencies": ["[npm-packages-from-shadcn-docs]"],
  "files": [
    {
      "path": "registry/new-york/ui/[component-name].tsx",
      "type": "registry:ui",
      "target": ""
    }
  ]
}
```

## Step 4: Build Registry
```bash
cd apps/registry && bun registry:build
```

## Step 5: Create MDX Documentation

Location: `apps/showcase/content/docs/components/[component-name].mdx`

Template:
```mdx
---
title: [Component Title]
description: [Detailed description of the component's purpose and use cases]
featured: true
component: true
---

<ComponentPreview name="[component-name]-demo" />

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

```bash
npx shadcn@latest add {{REGISTRY_URL}}/r/[component-name].json
```

**Variable Substitution:**
- Development: Replace `{{REGISTRY_URL}}` with `http://localhost:3002`
- Production: Replace `{{REGISTRY_URL}}` with `https://bigblocks-registry.vercel.app`

  </TabsContent>
  <TabsContent value="manual">

<Steps>

<Step>Install the following dependencies:</Step>

```bash
npm install [dependencies]
```

<Step>Copy and paste the following code into your project:</Step>

<ComponentSource name="[component-name]" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

  </TabsContent>
</CodeTabs>

## Usage

```tsx
import { ComponentName } from "@/components/ui/[component-name]"

export default function Example() {
  return <ComponentName />
}
```

## Examples

### [Variant Name]

[Description of this variant/example]

<ComponentPreview name="[component-name]-[variant]" />

### [Another Variant]

[Description of another variant/example]

<ComponentPreview name="[component-name]-[another-variant]" />

## API Reference

### ComponentName

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| prop1 | `string` | - | Description of prop1 |
| prop2 | `boolean` | `false` | Description of prop2 |
| className | `string` | `""` | Additional CSS classes |

### Type Definitions

```typescript
interface ComponentNameProps {
  // Show the full interface here
}
```
```

## Step 6: Create Demo Components

Create at least 3 demos in `apps/registry/registry/new-york/examples/`:

1. `[component-name]-demo.tsx` - Basic/default usage
2. `[component-name]-[variant].tsx` - Showing a specific variant or feature  
3. `[component-name]-[another-variant].tsx` - Another use case

Demo template:
```tsx
"use client"

import { ComponentName } from "@/components/ui/[component-name]"
// Only import shadcn components from @/components/ui/*
import { Button } from "@/components/ui/button"

export default function ComponentNameDemo() {
  // Add realistic example with proper BigBlocks terminology
  // Use authentication/wallet/social context as appropriate
  
  return (
    <div className="flex items-center justify-center">
      <ComponentName />
    </div>
  )
}
```

## Step 7: Update Registry Configuration for Demo Components

Add demo entries to `apps/registry/registry.json`:
```json
{
  "name": "[component-name]-demo",
  "type": "registry:example",
  "author": "Satchmo",
  "files": [
    {
      "path": "registry/new-york/examples/[component-name]-demo.tsx",
      "type": "registry:example",
      "target": ""
    }
  ]
}
```

**IMPORTANT Notes:**
- Do NOT include `registryDependencies` - demos assume the component is already installed
- All imports in demos must use `@/components/ui/*` paths, not registry paths
- Demo components use `type: "registry:example"` to match shadcn-ui patterns
- v0 integration: "Open in v0" buttons are only shown on the main component, not on individual demo variants (v0 doesn't execute variant-specific code)

Repeat for each demo variant you create.

## Step 8: Type Checking and Validation

**MANDATORY before committing:**
```bash
# Type check both apps
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Check for any usage (should return nothing)
grep -r "\bany\b" apps/registry/registry/new-york/ui/[component-name].tsx

# Run linting
cd apps/showcase && bun run lint
cd apps/registry && bun run lint

# Test the component builds
cd apps/showcase && bun run build
```

## Step 9: Test Theme Compatibility

**MANDATORY theme testing:**
```bash
# Test with different shadcn themes
bunx shadcn@latest add https://tweakcn.com/r/themes/caffeine.json
# Or other themes from https://ui.shadcn.com/themes

# Verify component uses theme-aware colors
# Check that no hard-coded colors remain
grep -r "bg-\(red\|blue\|green\|yellow\|orange\|purple\|pink\|gray\|slate\)-[0-9]" apps/registry/registry/new-york/ui/[component-name].tsx
# Should return nothing - all colors should use semantic classes
```

**Theme Compatibility Verified:**
- Components automatically adapt to any shadcn theme
- Primary colors change based on theme selection (e.g., blue → orange/brown for Caffeine)
- All color classes use CSS variables for full theme support
- Tested with multiple themes including Caffeine, ensuring proper color inheritance

## Step 10: Test v0.dev Integration

After building and deploying:
```bash
# Test that v0.dev accepts the component
curl -I "https://v0.dev/chat/api/open?url=https://bigblocks-registry.vercel.app/r/[component-name].json"
# Should return HTTP 307 (redirect to login)
```

**v0 Integration Notes:**
- "Open in v0" buttons are useful for full blocks/pages, less useful for component variants
- v0 opens the component definition but doesn't execute demo-specific code
- Users can ask v0 to modify components after opening (e.g., "make this vertical")
- We show "Open in v0" only on the main component preview, not on each variant demo

## Common Mistakes to Avoid
- Adding standard shadcn components to our registry
- Using wrong import paths (registry paths instead of @/components/ui/*)
- Using registry paths in demo imports (use @/components/ui/* instead)
- Including `registryDependencies` in demos (they should be standalone)
- Adding `title`/`description` to components (causes v0.dev errors)
- Forgetting `author: "Satchmo"` field
- Forgetting `target: ""` in file entries
- Forgetting to install shadcn dependencies in both apps
- Not following the exact MDX structure from step-indicator
- Missing API reference documentation
- Not creating enough demo examples
- Using `any` type instead of finding proper types
- Adding "use client" to pure presentational components
- Not checking browser API availability before use
- Type casting with `as` instead of proper typing