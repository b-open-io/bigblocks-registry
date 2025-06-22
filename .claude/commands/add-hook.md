Add a new hook "$ARGUMENTS" to the BigBlocks registry.

## CRITICAL TYPE SAFETY RULES
1. **NEVER use `any`, `unknown`, or type casting**
   - NO `as` type assertions
   - NO `@ts-ignore` (except for documented third-party library issues)
   - NO `@ts-expect-error` (except for documented third-party library issues)
2. **ALL types must be properly imported and traced**
   - If unsure of types, use Read tool to check imported type definitions
   - Trace types back to their source files in BigBlocks
   - Generic types must have proper constraints
3. **Type checking is mandatory**
   - Run before committing: `cd apps/showcase && bunx tsc --noEmit`
   - Run before committing: `cd apps/registry && bunx tsc --noEmit`

## CRITICAL SSR/CLIENT RULES
1. **Hooks MUST have "use client" directive**
   - ALL hooks use React hooks internally
   - Place at the very top of the file
2. **Browser API checks**
   - If using window/document: `if (typeof window !== "undefined")`
   - If using localStorage: Check availability first
3. **Document SSR compatibility in MDX**

## Valid BigBlocks Hook Categories
- authentication: useBitcoinAuth, useOAuthRestore, useDeviceLink, usePasswordValidation
- wallet: useSendBSV, useWalletBalance, useTokenOperations, useTransactionStatus
- social: useSocialFeed, useLikePost, useFollowUser, useFriends, useChannels
- market: useMarketplace, useCreateListing, useBuyListing, useCancelListing
- utility: useBlockchainService, useCopyToClipboard, useDebounce

## Step 1: Research in shadcn-ui Reference

**ALWAYS check the shadcn-ui reference first:**
```bash
# Check if similar hooks exist
ls /Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/hooks/
ls /Users/satchmo/code/shadcn-ui/apps/www/hooks/

# Check documentation patterns
grep -r "use[A-Z]" /Users/satchmo/code/shadcn-ui/apps/www/content/docs/
```

## Step 2: Create Hook File

Location: `apps/registry/registry/new-york/hooks/[hook-name].ts`

Template:
```typescript
"use client"

import * as React from "react"
// Import types - trace to source, never use any
import type { SpecificType } from "@/lib/types"

// Define return type interface explicitly
export interface UseHookNameReturn {
  // Every property must have a type
  data: SpecificDataType | null
  isLoading: boolean
  error: Error | null
  actions: {
    doSomething: (param: ParamType) => Promise<ResultType>
    reset: () => void
  }
}

// Define options interface if needed
export interface UseHookNameOptions {
  initialValue?: string
  onSuccess?: (data: SpecificDataType) => void
  onError?: (error: Error) => void
}

export function useHookName(options: UseHookNameOptions = {}): UseHookNameReturn {
  const [data, setData] = React.useState<SpecificDataType | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  // Browser API check example
  React.useEffect(() => {
    if (typeof window === "undefined") return
    
    // Browser-specific code here
  }, [])

  const doSomething = React.useCallback(async (param: ParamType): Promise<ResultType> => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Implementation
      const result = await someAsyncOperation(param)
      setData(result)
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error")
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [options])

  const reset = React.useCallback(() => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    data,
    isLoading,
    error,
    actions: {
      doSomething,
      reset,
    },
  }
}
```

## Step 3: Update Registry Configuration

Edit `apps/registry/registry.json` and add:
```json
{
  "name": "use-[hook-name]",
  "type": "registry:hook",
  "author": "Satchmo",
  "dependencies": ["[npm-packages-needed]"],
  "files": [
    {
      "path": "registry/new-york/hooks/use-[hook-name].ts",
      "type": "registry:hook",
      "target": ""
    }
  ]
}
```

## Step 4: Build Registry
```bash
cd apps/registry && bun registry:build
```

## Step 5: Create Hook Documentation

Location: `apps/showcase/content/docs/hooks/use-[hook-name].mdx`

Template:
```mdx
---
title: use[HookName]
description: [Detailed description of the hook's purpose and capabilities]
---

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

```bash
npx shadcn@latest add {{REGISTRY_URL}}/r/use-[hook-name].json
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

<ComponentSource name="use-[hook-name]" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

  </TabsContent>
</CodeTabs>

## Usage

```tsx
"use client"

import { use[HookName] } from "@/hooks/use-[hook-name]"

export function MyComponent() {
  const { data, isLoading, error, actions } = use[HookName]({
    onSuccess: (data) => {
      console.log("Success:", data)
    },
  })

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button onClick={() => actions.doSomething("param")}>
        Do Something
      </button>
    </div>
  )
}
```

## SSR Compatibility

This hook requires client-side rendering due to [reason]. To use in Next.js:

```tsx
"use client"

import { use[HookName] } from "@/hooks/use-[hook-name]"

// Component using the hook must also be a client component
```

## API Reference

### use[HookName]

```typescript
function use[HookName](options?: Use[HookName]Options): Use[HookName]Return
```

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| initialValue | `string` | `undefined` | Initial value for the hook |
| onSuccess | `(data: DataType) => void` | `undefined` | Callback when operation succeeds |
| onError | `(error: Error) => void` | `undefined` | Callback when operation fails |

### Return Value

| Property | Type | Description |
| --- | --- | --- |
| data | `DataType \| null` | The current data |
| isLoading | `boolean` | Loading state |
| error | `Error \| null` | Error state |
| actions | `object` | Available actions |

### Actions

| Method | Type | Description |
| --- | --- | --- |
| doSomething | `(param: string) => Promise<ResultType>` | Performs the main action |
| reset | `() => void` | Resets the hook state |

## Examples

### With Error Handling

```tsx
const { data, error, actions } = use[HookName]()

const handleAction = async () => {
  try {
    await actions.doSomething("param")
  } catch (err) {
    // Error is also available in hook state
    console.error("Failed:", err)
  }
}
```

### With Default Values

```tsx
const { data } = use[HookName]({
  initialValue: "default",
})
```
```

## Step 6: Type Checking

**MANDATORY before committing:**
```bash
# Check types in both apps
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Check for any usage
grep -r "\bany\b" apps/registry/registry/new-york/hooks/use-[hook-name].ts

# Run linting
cd apps/showcase && bun run lint
cd apps/registry && bun run lint
```

## Common Mistakes to Avoid
- Forgetting "use client" directive
- Using `any` type instead of tracing actual types
- Not checking browser API availability
- Missing SSR documentation
- Not testing in both client and server contexts
- Creating visual demos (hooks don't have visual output)
- Putting documentation in wrong folder (use /docs/hooks not /docs/components)

## Hooks That Return Providers
Some authentication/context hooks may return provider components:
```tsx
export function useBitcoinAuth() {
  // ... hook logic ...
  
  // Return provider as part of the hook
  return {
    Provider: BitcoinAuthProvider,
    user,
    signIn,
    signOut,
    // ... other returns
  }
}

// Usage:
const { Provider, user } = useBitcoinAuth()

return (
  <Provider>
    <App />
  </Provider>
)
```

This pattern follows shadcn-ui's approach of embedding providers within their related components/hooks rather than distributing them separately.

## Reference shadcn-ui Implementation
Always check how shadcn-ui implements similar functionality:
- `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/hooks/`
- `/Users/satchmo/code/shadcn-ui/apps/www/hooks/`
- Match their patterns for consistency