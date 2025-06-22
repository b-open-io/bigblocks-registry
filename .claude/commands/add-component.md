Add a new component "$ARGUMENTS" to the BigBlocks registry.

## Shared Context
@.claude/prompts/shared-context.md
@.claude/prompts/bitcoin-patterns.md

## Component-Specific Guidelines

This command creates UI components that:
- Have visual representation and user interaction
- Use shadcn-ui components as building blocks
- Follow Bitcoin-specific patterns for auth/wallet/social features
- Are theme-compatible and accessible

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

### Provider Pattern (shadcn-ui style):

**IMPORTANT**: Only embed providers for component-specific state that doesn't need to be shared with other components!

#### When to Embed a Provider:
- Component-specific UI state (e.g., sidebar open/closed, accordion expanded)
- State that is isolated to this component and its direct children
- Complex components that manage their own internal state

#### When NOT to Embed a Provider:
- Authentication state (use app-level BitcoinAuthProvider)
- Wallet state (use app-level WalletProvider)
- Any state that multiple components need to access
- Cross-component communication

#### Embedded Provider Example:
```tsx
// Context definition inside the component file
// ONLY for component-specific state!
type SidebarContextValue = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }
  return context
}

// Provider embedded in the component
export function Sidebar({ children, ...props }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div {...props}>{children}</div>
    </SidebarContext.Provider>
  )
}
```

#### Using Global State Instead:
For shared state, components should use hooks that access app-level providers:
```tsx
// DON'T embed auth provider in component
// DO use the global hook
import { useBitcoinAuth } from "@/hooks/use-bitcoin-auth"

export function AuthButton() {
  const { user, signIn } = useBitcoinAuth() // Accesses app-level provider
  
  return (
    <Button onClick={signIn}>
      {user ? `Signed in as ${user.name}` : "Sign In"}
    </Button>
  )
}
```

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

### Components with Embedded Providers:
If your component includes an embedded provider for component-specific state:
```tsx
// Export the component with embedded provider
export function Sidebar({ children }: SidebarProps) {
  // Provider logic here
}

// Export the hook to access the provider
export { useSidebar }

// Don't export the Context - keep it private to the component
```

The registry entry remains the same - just one file that exports multiple items.

### State Management Architecture Guidelines:

1. **App-Level Providers** (in app layout):
   - `BitcoinAuthProvider` - Authentication state
   - `WalletProvider` - Wallet and transaction state
   - `ThemeProvider` - Theme configuration
   
2. **Component-Level Providers** (embedded in components):
   - Only for UI state specific to that component
   - Examples: sidebar state, accordion state, tooltip state

3. **Cross-Component State** (use state management libraries):
   - **Jotai**: For component-centric, atomic state
   - **Zustand**: For module-level stores
   - See `/project:add-hook` for implementation patterns

### Bitcoin Backup Handling

Components that handle authentication should understand Bitcoin backup types:

#### Backup Types
```typescript
// From bitcoin-backup library
type BackupTypeName = 
  | "BapMasterBackup"    // Full identity with xprv, mnemonic, IDs
  | "BapMemberBackup"    // Member identity with WIF/derivedPrivateKey
  | "OneSatBackup"       // ordPk, payPk, identityPk
  | "WifBackup"          // Simple WIF private key

// Default configuration (BapMasterBackup excluded for security)
const DEFAULT_ALLOWED_BACKUP_TYPES = [
  "BapMemberBackup",
  "OneSatBackup", 
  "WifBackup"
]
```

#### Storage Patterns
```typescript
// CRITICAL: Never store decrypted backups in localStorage!

// Session Storage (temporary, cleared on signout)
sessionStorage.setItem("decryptedBackup", JSON.stringify(backup))
sessionStorage.setItem("paymentKey", paymentPrivateKey)
sessionStorage.setItem("ordinalKey", ordinalPrivateKey)

// Local Storage (persistent, encrypted only!)
localStorage.setItem("encryptedBackup", encryptedBackupString)
localStorage.setItem("bap-rotation-{idKey}", encryptedRotationData)
```

#### Component Example with Backup Support
```tsx
import { useBitcoinAuth } from "@/hooks/use-bitcoin-auth"
import { detectBackupType, isBackupTypeAllowed } from "@/lib/backup-utils"

export function BackupImportButton() {
  const { importBackup } = useBitcoinAuth()
  
  const handleImport = async (backupData: string, password: string) => {
    try {
      // Decrypt if needed
      const decrypted = await decryptBackup(backupData, password)
      
      // Detect type
      const backupType = detectBackupType(decrypted)
      
      // Validate allowed types
      if (!isBackupTypeAllowed(backupType, DEFAULT_ALLOWED_BACKUP_TYPES)) {
        throw new Error(`${backupType} backups are not supported`)
      }
      
      // Import
      await importBackup(decrypted, password)
    } catch (error) {
      // Handle errors
    }
  }
  
  return <Button onClick={handleImport}>Import Backup</Button>
}
```

#### Sensible Defaults for Auth Components
- **Allowed Backup Types**: Exclude BapMasterBackup by default
- **Password Requirements**: Minimum 8 characters
- **Storage**: Use sessionStorage for decrypted data
- **Cleanup**: Clear session data on signout
- **Encryption**: Always encrypt before localStorage

### Auth Server Detection (Works with auth.sigmaidentity.com!)

Components that handle authentication should auto-detect when they're running on an auth server:

```typescript
// Utility for detecting auth context
const detectAuthContext = () => {
  const params = new URLSearchParams(window.location.search)
  const currentUrl = window.location.origin
  
  return {
    // Running on auth server
    isAuthServer: currentUrl.includes('auth.sigmaidentity.com') ||
                  currentUrl.includes('auth-staging.sigmaidentity.com') ||
                  currentUrl.includes('auth.'),
    
    // OAuth callback detection
    isOAuthCallback: params.has('code') || params.has('state'),
    
    // OAuth authorization request
    isOAuthRequest: params.has('client_id') && params.has('redirect_uri'),
    
    // OAuth parameters
    clientId: params.get('client_id'),
    redirectUri: params.get('redirect_uri'),
    state: params.get('state'),
    code: params.get('code'),
    provider: params.get('provider') || 'sigma',
  }
}

// Example usage in auth components
export function AuthButton() {
  const authContext = detectAuthContext()
  const { user, signIn } = useBitcoinAuth()
  
  const handleAuth = async () => {
    if (authContext.isAuthServer) {
      // Direct Bitcoin authentication
      await signIn()
    } else if (authContext.isOAuthRequest) {
      // OAuth authorization request - redirect to auth server
      const authUrl = `https://auth.sigmaidentity.com/authorize?client_id=${authContext.clientId}&redirect_uri=${authContext.redirectUri}`
      window.location.href = authUrl
    } else {
      // Normal app flow
      await signIn()
    }
  }
  
  return (
    <Button onClick={handleAuth}>
      {user ? `Signed in as ${user.name}` : "Sign In"}
    </Button>
  )
}
```

### Bitcoin Authentication Patterns

Components should use proper Bitcoin signature authentication:

```typescript
import { createAuthToken } from "bitcoin-auth"

// Example for components that make authenticated requests
const makeAuthenticatedRequest = async (privateKey: string, endpoint: string, body?: string) => {
  const authToken = createAuthToken({
    privateKey,
    requestPath: endpoint,
    body,
    timestamp: new Date().toISOString()
  })

  const response = await fetch(`https://auth.sigmaidentity.com${endpoint}`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': authToken,
      'Content-Type': 'application/json'
    },
    body: body || '{}'
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`)
  }

  return response.json()
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