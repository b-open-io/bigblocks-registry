Add a new example "$ARGUMENTS" to the BigBlocks registry.

## What is an Example?
An example is a demo implementation showing how to use a component in different ways. Examples are always dependent on the main component they demonstrate.

## CRITICAL RULES
1. **Examples ALWAYS require the main component** via registryDependencies
2. **No npm dependencies** - only registryDependencies allowed
3. **Import from @/components/ui/* not from registry paths**
4. **Type as "registry:example"** to match shadcn patterns
5. **NEVER use `any`, `unknown`, or type casting**

## Step 1: Identify the Component to Demo

Examples must demonstrate an existing component:
```bash
# Check existing components
ls apps/registry/registry/new-york/ui/
# Or check registry.json
grep '"type": "registry:ui"' apps/registry/registry.json
```

## Step 2: Create Example File

Location: `apps/registry/registry/new-york/examples/[component-name]-[variant].tsx`

### Basic Example Template:
```tsx
"use client"

import { ComponentName } from "@/components/ui/[component-name]"

export default function ComponentNameDemo() {
  return (
    <div className="flex items-center justify-center">
      <ComponentName />
    </div>
  )
}
```

### Interactive Example Template:
```tsx
"use client"

import { useState } from "react"
import { ComponentName } from "@/components/ui/[component-name]"
import { Button } from "@/components/ui/button"

export default function ComponentNameInteractive() {
  const [state, setState] = useState("default")
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setState("variant1")}>
          Variant 1
        </Button>
        <Button onClick={() => setState("variant2")}>
          Variant 2
        </Button>
      </div>
      
      <ComponentName variant={state} />
    </div>
  )
}
```

### Form Example Template:
```tsx
"use client"

import { ComponentName } from "@/components/ui/[component-name]"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ComponentNameForm() {
  return (
    <Card className="w-full max-w-md p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="demo">Demo Label</Label>
          <ComponentName id="demo" placeholder="Enter value..." />
        </div>
      </div>
    </Card>
  )
}
```

## Step 3: Update Registry Configuration

Edit `apps/registry/registry.json`:
```json
{
  "name": "[component-name]-[variant]",
  "type": "registry:example",
  "author": "Satchmo",
  "registryDependencies": [
    "https://bigblocks-registry.vercel.app/r/[component-name].json"
  ],
  "files": [
    {
      "path": "registry/new-york/examples/[component-name]-[variant].tsx",
      "type": "registry:example",
      "target": ""
    }
  ]
}
```

**IMPORTANT**: 
- NO `dependencies` field for examples
- NO `title` or `description` fields (causes v0.dev errors)
- `registryDependencies` uses full URL to the component

## Step 4: Build Registry
```bash
cd apps/registry && bun registry:build
```

## Step 5: Add to Component Documentation

Update the component's MDX file to include your example:
`apps/showcase/content/docs/components/[component-name].mdx`

Add a new section:
```mdx
### [Variant Name]

[Description of what this example demonstrates]

<ComponentPreview name="[component-name]-[variant]" />
```

## Common Example Patterns

### 1. Basic Demo (default)
Shows the component with minimal props:
```tsx
export default function ComponentNameDemo() {
  return <ComponentName />
}
```

### 2. Variants Demo
Shows different visual variants:
```tsx
export default function ComponentNameVariants() {
  return (
    <div className="flex gap-4">
      <ComponentName variant="default" />
      <ComponentName variant="outline" />
      <ComponentName variant="ghost" />
    </div>
  )
}
```

### 3. Sizes Demo
Shows different size options:
```tsx
export default function ComponentNameSizes() {
  return (
    <div className="flex items-center gap-4">
      <ComponentName size="sm" />
      <ComponentName size="md" />
      <ComponentName size="lg" />
    </div>
  )
}
```

### 4. Interactive Demo
Shows component with user interaction:
```tsx
export default function ComponentNameInteractive() {
  const [value, setValue] = useState("")
  
  return (
    <ComponentName 
      value={value} 
      onChange={setValue}
      placeholder="Try me!"
    />
  )
}
```

### 5. With Form Demo
Shows component in a form context:
```tsx
export default function ComponentNameWithForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ComponentName name="field" required />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### 6. Loading States Demo
Shows loading/disabled states:
```tsx
export default function ComponentNameStates() {
  return (
    <div className="space-y-4">
      <ComponentName loading />
      <ComponentName disabled />
      <ComponentName error="Something went wrong" />
    </div>
  )
}
```

## Naming Conventions

- `[component-name]-demo` - Basic/default usage
- `[component-name]-variants` - Showing different variants
- `[component-name]-sizes` - Showing different sizes
- `[component-name]-interactive` - Interactive example
- `[component-name]-form` - Form integration
- `[component-name]-[specific-feature]` - Specific feature demo

## Testing Examples

```bash
# Type check
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Verify imports
grep -n "from.*registry" apps/registry/registry/new-york/examples/[component-name]-[variant].tsx
# Should return nothing - examples use @/components/ui/* imports
```

## Common Mistakes to Avoid
- Adding npm `dependencies` (examples don't need them)
- Using registry import paths instead of @/components/ui/*
- Forgetting registryDependencies
- Creating overly complex examples (keep them focused)
- Not wrapping in appropriate containers for layout
- Using production data (use mock data instead)
- Including business logic (examples should be presentational)

## Reference Examples
Check shadcn-ui examples for patterns:
```bash
ls /Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/examples/
```

Common patterns from shadcn-ui:
- Simple, focused demonstrations
- Clear visual hierarchy
- Proper spacing and alignment
- Responsive containers
- Mock data that's easy to understand