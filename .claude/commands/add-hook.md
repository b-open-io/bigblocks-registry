Add a new hook "$ARGUMENTS" to the BigBlocks registry.

## Shared Context
@.claude/prompts/shared-context.md
@.claude/prompts/bitcoin-patterns.md

## Hook-Specific Guidelines

### Hooks MUST:
1. **Always include "use client" directive** - All hooks use React hooks internally
2. **Return typed interfaces** - Define explicit return types
3. **Handle loading/error states** - Consistent state management
4. **Be SSR-safe** - Check for browser APIs with `typeof window !== "undefined"`

### Hook Categories:
- **authentication**: useBitcoinAuth, useOAuthRestore, useDeviceLink, usePasswordValidation
- **wallet**: useSendBSV, useWalletBalance, useTokenOperations, useTransactionStatus
- **social**: useSocialFeed, useLikePost, useFollowUser, useFriends, useChannels
- **market**: useMarketplace, useCreateListing, useBuyListing, useCancelListing
- **utility**: useBlockchainService, useCopyToClipboard, useDebounce

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

## Hook State Management Patterns

### Accessing Global Providers
Most hooks should access app-level providers rather than creating their own:
```tsx
"use client"

import { useContext } from "react"
import { BitcoinAuthContext } from "@/providers/bitcoin-auth-provider"

export function useBitcoinAuth() {
  const context = useContext(BitcoinAuthContext)
  
  if (!context) {
    throw new Error("useBitcoinAuth must be used within BitcoinAuthProvider")
  }
  
  return context
}
```

### Using Jotai for Component State
For state that needs to be shared between components, use Jotai atoms:
```tsx
"use client"

import { atom, useAtom } from "jotai"

// Define atom in a separate file or at the top
const selectedItemAtom = atom<string | null>(null)

export function useSelectedItem() {
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom)
  
  return {
    selectedItem,
    setSelectedItem,
    clearSelection: () => setSelectedItem(null),
  }
}
```

### Using Zustand for Module State
For more complex module-level state, use Zustand:
```tsx
"use client"

import { create } from "zustand"

interface WalletStore {
  balance: number
  isLoading: boolean
  fetchBalance: () => Promise<void>
}

const useWalletStore = create<WalletStore>((set) => ({
  balance: 0,
  isLoading: false,
  fetchBalance: async () => {
    set({ isLoading: true })
    try {
      const balance = await fetchBalanceFromAPI()
      set({ balance, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
    }
  },
}))

// Export a hook that uses the store
export function useWalletBalance() {
  const { balance, isLoading, fetchBalance } = useWalletStore()
  
  return {
    balance,
    isLoading,
    refetch: fetchBalance,
  }
}
```

### State Management Guidelines:
1. **App-level providers**: For authentication, wallet, theme
2. **Jotai atoms**: For component-centric shared state
3. **Zustand stores**: For module-level complex state
4. **Local useState**: For component-specific UI state

Never create providers inside hooks unless it's for app-level setup.

## Bitcoin Backup Patterns in Hooks

### Storage Access Pattern
Hooks that need storage should use the proper separation:

```tsx
"use client"

import { useCallback, useEffect, useState } from "react"
import { encryptBackup, decryptBackup } from "bitcoin-backup"
import type { BapMasterBackup, BapMemberBackup, OneSatBackup, WifBackup, BackupTypeName } from "@/lib/types"

export function useBackupManager() {
  const [hasEncryptedBackup, setHasEncryptedBackup] = useState(false)
  
  // Check for encrypted backup in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return
    const encrypted = localStorage.getItem("encryptedBackup")
    setHasEncryptedBackup(!!encrypted)
  }, [])
  
  // Import backup with proper storage
  const importBackup = useCallback(async (
    backup: BapMasterBackup | BapMemberBackup | OneSatBackup | WifBackup,
    password: string
  ) => {
    // Encrypt for persistent storage
    const encrypted = await encryptBackup(backup, password)
    localStorage.setItem("encryptedBackup", encrypted)
    
    // Store decrypted in session only
    sessionStorage.setItem("decryptedBackup", JSON.stringify(backup))
    
    // Extract keys if needed
    if ('payPk' in backup) {
      sessionStorage.setItem("paymentKey", backup.payPk)
    }
    if ('ordPk' in backup) {
      sessionStorage.setItem("ordinalKey", backup.ordPk)
    }
  }, [])
  
  // Clear session data on signout
  const clearSession = useCallback(() => {
    sessionStorage.removeItem("decryptedBackup")
    sessionStorage.removeItem("paymentKey")
    sessionStorage.removeItem("ordinalKey")
    // NOTE: Keep encrypted backup in localStorage!
  }, [])
  
  return {
    hasEncryptedBackup,
    importBackup,
    clearSession,
  }
}
```

### Backup Type Detection Hook

```tsx
"use client"

import { detectBackupType, isBackupTypeAllowed } from "@/lib/backup-utils"
import type { BackupTypeName } from "@/lib/types"

export interface UseBackupDetectionOptions {
  allowedTypes?: BackupTypeName[]
}

export function useBackupDetection(options: UseBackupDetectionOptions = {}) {
  const {
    allowedTypes = ["BapMemberBackup", "OneSatBackup", "WifBackup"]
  } = options
  
  const detectAndValidate = useCallback((backup: unknown) => {
    const backupType = detectBackupType(backup)
    
    if (!backupType) {
      return {
        isValid: false,
        error: "Invalid backup format",
        backupType: null,
      }
    }
    
    if (!isBackupTypeAllowed(backupType, allowedTypes)) {
      return {
        isValid: false,
        error: `${backupType} backups are not supported`,
        backupType,
      }
    }
    
    return {
      isValid: true,
      error: null,
      backupType,
    }
  }, [allowedTypes])
  
  return { detectAndValidate, allowedTypes }
}
```

### Namespace Storage Hook

```tsx
"use client"

export function useNamespacedStorage(namespace?: string) {
  const getKey = useCallback((key: string) => {
    return namespace ? `${namespace}:${key}` : key
  }, [namespace])
  
  const persistentStorage = {
    get: (key: string) => localStorage.getItem(getKey(key)),
    set: (key: string, value: string) => localStorage.setItem(getKey(key), value),
    delete: (key: string) => localStorage.removeItem(getKey(key)),
  }
  
  const sessionStorage = {
    get: (key: string) => window.sessionStorage.getItem(getKey(key)),
    set: (key: string, value: string) => window.sessionStorage.setItem(getKey(key), value),
    delete: (key: string) => window.sessionStorage.removeItem(getKey(key)),
  }
  
  return { persistentStorage, sessionStorage, getKey }
}
```

### Critical Storage Rules for Hooks:
1. **Never store decrypted backups in localStorage**
2. **Always clear session storage on signout**
3. **Use namespace prefixes for multi-environment support**
4. **Check browser environment before accessing storage**
5. **Validate backup types before processing**

## Bitcoin Authentication Utilities

### Auth Server Detection Hook

```tsx
"use client"

import { useMemo } from "react"

export interface AuthContext {
  isAuthServer: boolean
  isOAuthCallback: boolean
  isOAuthRequest: boolean
  clientId: string | null
  redirectUri: string | null
  state: string | null
  code: string | null
  provider: string
}

export function useAuthContext(): AuthContext {
  return useMemo(() => {
    if (typeof window === "undefined") {
      return {
        isAuthServer: false,
        isOAuthCallback: false,
        isOAuthRequest: false,
        clientId: null,
        redirectUri: null,
        state: null,
        code: null,
        provider: "sigma",
      }
    }

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
  }, [])
}
```

### Bitcoin Signature Hook

```tsx
"use client"

import { useCallback } from "react"
import { createAuthToken } from "bitcoin-auth"

export interface UseBitcoinSignatureOptions {
  apiUrl?: string
  requestPath?: string
  timePadMs?: number
  includeBody?: boolean
}

export function useBitcoinSignature(options: UseBitcoinSignatureOptions = {}) {
  const {
    apiUrl = "https://auth.sigmaidentity.com",
    requestPath = "/api/auth",
    timePadMs = 300000, // 5 minutes
    includeBody = true,
  } = options

  const createSignature = useCallback((privateKey: string, body?: string) => {
    return createAuthToken({
      privateKey,
      requestPath,
      body: includeBody ? body : undefined,
      timestamp: new Date().toISOString(),
    })
  }, [requestPath, includeBody])

  const makeAuthenticatedRequest = useCallback(async (
    privateKey: string,
    endpoint: string,
    body?: string,
    method: string = 'POST'
  ) => {
    const authToken = createSignature(privateKey, body)

    const response = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers: {
        'X-Auth-Token': authToken,
        'Content-Type': 'application/json',
      },
      body: body || (method === 'POST' ? '{}' : undefined),
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`)
    }

    return response.json()
  }, [apiUrl, createSignature])

  return {
    createSignature,
    makeAuthenticatedRequest,
  }
}
```

### OAuth Integration Hook

```tsx
"use client"

import { useCallback } from "react"
import { useAuthContext } from "./use-auth-context"

export interface UseOAuthIntegrationOptions {
  authUrl?: string
  onSuccess?: (token: string) => void
  onError?: (error: Error) => void
}

export function useOAuthIntegration(options: UseOAuthIntegrationOptions = {}) {
  const { authUrl = "https://auth.sigmaidentity.com" } = options
  const authContext = useAuthContext()

  const redirectToAuth = useCallback((clientId: string, redirectUri: string, state?: string) => {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      provider: 'sigma',
    })

    if (state) {
      params.set('state', state)
    }

    const authorizationUrl = `${authUrl}/authorize?${params.toString()}`
    window.location.href = authorizationUrl
  }, [authUrl])

  const handleOAuthCallback = useCallback(async (code: string, state?: string) => {
    try {
      const response = await fetch(`${authUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          state,
          grant_type: 'authorization_code',
        }),
      })

      if (!response.ok) {
        throw new Error(`OAuth token exchange failed: ${response.statusText}`)
      }

      const { access_token } = await response.json()
      options.onSuccess?.(access_token)
      return access_token
    } catch (error) {
      const err = error instanceof Error ? error : new Error('OAuth callback failed')
      options.onError?.(err)
      throw err
    }
  }, [authUrl, options])

  return {
    authContext,
    redirectToAuth,
    handleOAuthCallback,
    isOAuthFlow: authContext.isOAuthCallback || authContext.isOAuthRequest,
  }
}
```

## Reference shadcn-ui Implementation
Always check how shadcn-ui implements similar functionality:
- `/Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/hooks/`
- `/Users/satchmo/code/shadcn-ui/apps/www/hooks/`
- Match their patterns for consistency