Add a new component "$ARGUMENTS" to the BigBlocks registry.

## CRITICAL RULES
1. Only add CUSTOM BigBlocks components! NEVER add standard shadcn-ui components to our registry!
2. Always BUILD components using shadcn-ui components first, Radix UI primitives second
3. All imports must use @/components/ui/* for installed components

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
2. Install required shadcn dependencies in BOTH apps:
   ```bash
   cd apps/showcase && bunx shadcn@latest add [required-components]
   cd apps/registry && bunx shadcn@latest add [required-components]
   ```
3. Note all npm dependencies from the shadcn docs

## Step 2: Create Component File

Location: `apps/registry/registry/new-york/ui/[component-name].tsx`

Template:
```tsx
"use client"

import * as React from "react"
// Import shadcn-ui components - use @/components/ui/*
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// Import from @/lib/utils for cn
import { cn } from "@/lib/utils"

export interface ComponentNameProps {
  // Define props with proper TypeScript types
  className?: string
  // ... other props
}

export function ComponentName({
  className,
  ...props
}: ComponentNameProps) {
  return (
    <div className={cn("", className)} {...props}>
      {/* Component implementation using shadcn-ui components */}
    </div>
  )
}
```

## Step 3: Update Registry Configuration

Edit `apps/registry/registry.json`:
```json
{
  "name": "[component-name]",
  "type": "registry:ui",
  "title": "[Component Title]",
  "description": "[Brief description of what the component does]",
  "categories": ["[category]"],
  "dependencies": ["[npm-packages-from-shadcn-docs]"],
  "files": [
    {
      "path": "registry/new-york/ui/[component-name].tsx",
      "type": "registry:ui"
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
npx shadcn@latest add http://localhost:3002/r/[component-name].json
```

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

Create at least 3 demos in `apps/showcase/registry/bigblocks/examples/`:

1. `[component-name]-demo.tsx` - Basic/default usage
2. `[component-name]-[variant].tsx` - Showing a specific variant or feature
3. `[component-name]-[another-variant].tsx` - Another use case

Demo template:
```tsx
"use client"

import { ComponentName } from "@/registry/bigblocks/ui/[component-name]"
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

## Step 7: Update Registry Index

The showcase registry should auto-update when you restart the dev server.

## Common Mistakes to Avoid
- Adding standard shadcn components to our registry
- Using wrong import paths (registry paths instead of @/components/ui/*)
- Forgetting to install shadcn dependencies in both apps
- Not following the exact MDX structure from step-indicator
- Missing API reference documentation
- Not creating enough demo examples