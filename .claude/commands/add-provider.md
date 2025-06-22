Add a new app-level provider "$ARGUMENTS" to the BigBlocks registry.

## CRITICAL RULES
1. **App-level providers ONLY** - Never create component-level providers for shared state
2. **Must be installed in app layout** - Not embedded in individual components
3. **Follow shadcn-ui patterns** - Check ThemeProvider implementation
4. **Type safety is mandatory** - No `any`, `unknown`, or type casting
5. **SSR compatibility required** - Must work with server-side rendering

## When to Create an App-Level Provider

Create a provider when you need:
- **Global authentication state** (user, auth status, sign in/out)
- **Wallet state** (balance, transactions, addresses)
- **Theme configuration** (colors, mode, preferences)
- **App-wide settings** (language, currency, network)

DO NOT create providers for:
- Component-specific UI state (use embedded providers)
- Simple shared state (use Jotai atoms or Zustand)
- Static configuration (use constants)

## Step 1: Research shadcn-ui Patterns

**ALWAYS check shadcn-ui implementation first:**
```bash
# Check how shadcn implements providers
cat /Users/satchmo/code/shadcn-ui/apps/www/components/providers.tsx
cat /Users/satchmo/code/shadcn-ui/apps/www/app/layout.tsx

# Look for provider patterns
grep -r "Provider" /Users/satchmo/code/shadcn-ui/apps/www/components/
```

## Step 2: Create Provider File

Location: `apps/registry/registry/new-york/providers/[provider-name]-provider.tsx`

Template with Bitcoin Backup Support:
```tsx
"use client"

import * as React from "react"
import { HD, Mnemonic, PrivateKey } from "@bsv/sdk"
import { BAP } from "bsv-bap"
// Import proper types - never use any
import type { User, AuthConfig, BackupTypeName, AuthUser, BapMasterBackup, BapMemberBackup, OneSatBackup, WifBackup } from "@/lib/types"
import { encryptBackup, decryptBackup } from "bitcoin-backup"
import { createAuthToken, parseAuthToken, verifyAuthToken } from "bitcoin-auth"
import { detectBackupType, isBackupTypeAllowed, DEFAULT_ALLOWED_BACKUP_TYPES } from "@/lib/backup-utils"

// Storage adapters for proper data separation
interface StorageAdapter {
  get(key: string): Promise<string | null>
  set(key: string, value: string): Promise<void>
  delete(key: string): Promise<void>
}

// Define the context value type
export interface BitcoinAuthContextValue {
  // Authentication state
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  hasLocalBackup: boolean
  
  // Backup configuration
  allowedBackupTypes: BackupTypeName[]
  
  // Actions
  signIn: (password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (password: string) => Promise<void>
  importBackup: (backup: BapMasterBackup | BapMemberBackup | OneSatBackup | WifBackup | string, password: string) => Promise<void>
  exportBackup: (password: string) => Promise<string>
}

// Create the context
export const BitcoinAuthContext = React.createContext<BitcoinAuthContextValue | null>(null)

// Provider props
export interface BitcoinAuthProviderProps {
  children: React.ReactNode
  config?: AuthConfig
  // API configuration (defaults to auth.sigmaidentity.com)
  apiUrl?: string
  // Bitcoin auth configuration
  authConfig?: {
    requestPath: string     // Path for signature generation (default: "/api/auth")
    timePadMs: number      // Time window in ms (default: 300000 = 5 minutes)
    includeBody: boolean   // Include request body in signature (default: true)
    headerName: string     // Auth header name (default: "X-Auth-Token")
  }
  // Storage adapters - CRITICAL for proper data separation
  persistentStorage?: StorageAdapter // For encrypted backups (localStorage)
  sessionStorage?: StorageAdapter    // For decrypted data (sessionStorage)
  storageNamespace?: string          // Prefix for keys (e.g., 'dev', 'prod')
  // Backup configuration
  allowedBackupTypes?: BackupTypeName[]
  // Optional callbacks
  onAuthStateChange?: (user: User | null) => void
}

// Default storage adapters using browser storage
const defaultPersistentStorage: StorageAdapter = {
  get: async (key) => localStorage.getItem(key),
  set: async (key, value) => localStorage.setItem(key, value),
  delete: async (key) => localStorage.removeItem(key),
}

const defaultSessionStorage: StorageAdapter = {
  get: async (key) => sessionStorage.getItem(key),
  set: async (key, value) => sessionStorage.setItem(key, value),
  delete: async (key) => sessionStorage.removeItem(key),
}

// Provider component
export function BitcoinAuthProvider({
  children,
  config,
  apiUrl = 'https://auth.sigmaidentity.com', // Default to sigma auth  
  authConfig = {
    requestPath: '/api/auth',
    timePadMs: 300000, // 5 minutes
    includeBody: true,
    headerName: 'X-Auth-Token'
  },
  persistentStorage = defaultPersistentStorage,
  sessionStorage = defaultSessionStorage,
  storageNamespace = '',
  allowedBackupTypes = DEFAULT_ALLOWED_BACKUP_TYPES,
  onAuthStateChange,
}: BitcoinAuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasLocalBackup, setHasLocalBackup] = React.useState(false)

  // Storage key helpers
  const getKey = (key: string) => storageNamespace ? `${storageNamespace}:${key}` : key

  // Initialize auth state
  React.useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for encrypted backup in persistent storage
        const encryptedBackup = await persistentStorage.get(getKey('encryptedBackup'))
        setHasLocalBackup(!!encryptedBackup)

        // Check for existing session in session storage
        const sessionBackup = await sessionStorage.get(getKey('decryptedBackup'))
        if (sessionBackup) {
          const backup = JSON.parse(sessionBackup)
          const user = await createUserFromBackup(backup)
          setUser(user)
          onAuthStateChange?.(user)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [onAuthStateChange])

  // Bitcoin authentication helper
  const authenticateWithServer = async (privateKey: string, body?: string) => {
    const authToken = createAuthToken({
      privateKey,
      requestPath: authConfig.requestPath,
      body,
      timestamp: new Date().toISOString()
    })

    const response = await fetch(`${apiUrl}${authConfig.requestPath}`, {
      method: 'POST',
      headers: {
        [authConfig.headerName]: authToken,
        'Content-Type': 'application/json'
      },
      body: body || '{}'
    })

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`)
    }

    return response.json()
  }

  // Generate new BAP backup (real implementation)
  const generateNewBackup = () => {
    const mnemonic = Mnemonic.fromRandom()
    const seed = mnemonic.toSeed()
    const hdKey = HD.fromSeed(seed)
    const xprv = hdKey.toString()
    
    const bap = new BAP(xprv)
    bap.newId() // Create root identity
    const ids = bap.exportIds()
    
    return {
      xprv,
      mnemonic: mnemonic.toString(),
      ids
    }
  }

  // Create user from backup (real implementation)
  const createUserFromBackup = (backup: BapMasterBackup | BapMemberBackup | OneSatBackup | WifBackup): AuthUser => {
    const backupType = detectBackupType(backup)
    
    switch (backupType) {
      case "BapMasterBackup":
        const bap = new BAP(backup.xprv)
        bap.importIds(backup.ids)
        const identity = backup.ids[0]
        
        return {
          id: identity.identityKey,
          address: identity.rootAddress,
          idKey: identity.identityKey,
          profiles: [{
            id: identity.identityKey,
            address: identity.rootAddress,
            isPublished: false
          }],
          activeProfileId: identity.identityKey
        }
      
      case "OneSatBackup":
        return {
          id: backup.identityPk,
          address: backup.paymentAddress,
          idKey: backup.identityPk,
          profiles: [{
            id: backup.identityPk,
            address: backup.paymentAddress,
            isPublished: false
          }],
          activeProfileId: backup.identityPk
        }
      
      case "BapMemberBackup":
        return {
          id: backup.identityKey,
          address: backup.address,
          idKey: backup.identityKey,
          profiles: [{
            id: backup.identityKey,
            address: backup.address,
            isPublished: false
          }],
          activeProfileId: backup.identityKey
        }
      
      case "WifBackup":
        // For WIF backup, derive address and create basic profile
        const privateKey = PrivateKey.fromWif(backup.wif)
        const address = privateKey.toPublicKey().toAddress()
        
        return {
          id: address,
          address,
          idKey: address,
          profiles: [{
            id: address,
            address,
            isPublished: false
          }],
          activeProfileId: address
        }
      
      default:
        throw new Error(`Unsupported backup type: ${backupType}`)
    }
  }

  // Auth methods with backup support
  const signIn = React.useCallback(async (password: string) => {
    setIsLoading(true)
    try {
      // Get encrypted backup from persistent storage
      const encryptedBackup = await persistentStorage.get(getKey('encryptedBackup'))
      if (!encryptedBackup) {
        throw new Error('No local backup found')
      }

      // Decrypt backup
      const decryptedBackup = await decryptBackup(encryptedBackup, password)
      
      // Validate backup type
      const backupType = detectBackupType(decryptedBackup)
      if (!isBackupTypeAllowed(backupType, allowedBackupTypes)) {
        throw new Error(`${backupType} backups are not supported`)
      }

      // Store in session storage
      await sessionStorage.set(getKey('decryptedBackup'), JSON.stringify(decryptedBackup))
      
      // Extract keys based on backup type
      let privateKey = ''
      if (backupType === 'OneSatBackup') {
        await sessionStorage.set(getKey('paymentKey'), decryptedBackup.payPk)
        await sessionStorage.set(getKey('ordinalKey'), decryptedBackup.ordPk)
        privateKey = decryptedBackup.identityPk || decryptedBackup.payPk
      } else if (backupType === 'BapMemberBackup') {
        privateKey = decryptedBackup.wif || decryptedBackup.derivedPrivateKey
      } else if (backupType === 'WifBackup') {
        privateKey = decryptedBackup.wif
      }

      // Authenticate with server using Bitcoin signature
      const authResult = await authenticateWithServer(privateKey)
      
      // Create user from auth result
      const user = await createUserFromBackup(decryptedBackup)
      setUser(user)
      onAuthStateChange?.(user)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [persistentStorage, sessionStorage, allowedBackupTypes, onAuthStateChange, authenticateWithServer])

  const signOut = React.useCallback(async () => {
    setIsLoading(true)
    try {
      // Clear ONLY session storage (temporary data)
      await sessionStorage.delete(getKey('decryptedBackup'))
      await sessionStorage.delete(getKey('paymentKey'))
      await sessionStorage.delete(getKey('ordinalKey'))
      
      // IMPORTANT: Keep encrypted backup in persistent storage!
      // Users can sign back in with their password
      
      setUser(null)
      onAuthStateChange?.(null)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [sessionStorage, onAuthStateChange])

  const signUp = React.useCallback(async (password: string) => {
    setIsLoading(true)
    try {
      // Generate new BAP backup
      const backup = generateNewBackup()
      
      // Encrypt and store in persistent storage
      const encryptedBackup = await encryptBackup(backup, password)
      await persistentStorage.set(getKey('encryptedBackup'), encryptedBackup)
      
      // Store decrypted in session storage
      await sessionStorage.set(getKey('decryptedBackup'), JSON.stringify(backup))
      
      // Get private key for authentication (from generated BAP backup)
      const privateKey = backup.ids[0].rootPrivateKey || backup.xprv
      
      // Authenticate with server using Bitcoin signature
      const authResult = await authenticateWithServer(privateKey)
      
      // Create user
      const user = await createUserFromBackup(backup)
      setUser(user)
      setHasLocalBackup(true)
      onAuthStateChange?.(user)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [persistentStorage, sessionStorage, onAuthStateChange, authenticateWithServer])

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      hasLocalBackup,
      allowedBackupTypes,
      signIn,
      signOut,
      signUp,
      // Import/export functionality
      importBackup: async (backup: BapMasterBackup | BapMemberBackup | OneSatBackup | WifBackup | string, password: string) => {
        // Implementation for importing backup
        const decryptedBackup = typeof backup === 'string' 
          ? await decryptBackup(backup, password)
          : backup
        
        const user = createUserFromBackup(decryptedBackup)
        await sessionStorage.set(getKey('decryptedBackup'), JSON.stringify(decryptedBackup))
        setUser(user)
        onAuthStateChange?.(user)
      },
      exportBackup: async (password: string) => {
        const sessionBackup = await sessionStorage.get(getKey('decryptedBackup'))
        if (!sessionBackup) throw new Error('No backup to export')
        
        const backup = JSON.parse(sessionBackup)
        return await encryptBackup(backup, password)
      },
      authenticateWithServer, // Expose for direct use in components
    }),
    [user, isLoading, hasLocalBackup, signIn, signOut, signUp, authenticateWithServer]
  )

  return (
    <BitcoinAuthContext.Provider value={value}>
      {children}
    </BitcoinAuthContext.Provider>
  )
}

```

## Step 3: Create Accompanying Hook

Location: `apps/registry/registry/new-york/hooks/use-[provider-name].ts`

```tsx
"use client"

import * as React from "react"
import { BitcoinAuthContext } from "@/providers/bitcoin-auth-provider"

export function useBitcoinAuth() {
  const context = React.useContext(BitcoinAuthContext)
  
  if (!context) {
    throw new Error("useBitcoinAuth must be used within BitcoinAuthProvider")
  }
  
  return context
}
```

## Step 4: Update Registry Configuration

Edit `apps/registry/registry.json` and add BOTH entries:

```json
// Provider entry
{
  "name": "[provider-name]-provider",
  "type": "registry:lib",
  "author": "Satchmo",
  "dependencies": ["[npm-packages-needed]"],
  "files": [
    {
      "path": "registry/new-york/providers/[provider-name]-provider.tsx",
      "type": "registry:lib",
      "target": ""
    }
  ]
}

// Hook entry
{
  "name": "use-[provider-name]",
  "type": "registry:hook",
  "author": "Satchmo",
  "registryDependencies": ["[provider-name]-provider"],
  "files": [
    {
      "path": "registry/new-york/hooks/use-[provider-name].ts",
      "type": "registry:hook",
      "target": ""
    }
  ]
}
```

## Step 5: Create Provider Documentation

Location: `apps/showcase/content/docs/providers/[provider-name]-provider.mdx`

Template:
```mdx
---
title: [Provider Name]
description: App-level provider for [purpose]
---

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

```bash
# Install both provider and hook (uses copy-to-project pattern)
bunx shadcn@latest add {{REGISTRY_URL}}/r/[provider-name]-provider.json
bunx shadcn@latest add {{REGISTRY_URL}}/r/use-[provider-name].json
```

**Variable Substitution:**
- Development: Replace `{{REGISTRY_URL}}` with `http://localhost:3002`
- Production: Replace `{{REGISTRY_URL}}` with `https://registry.bigblocks.dev`

  </TabsContent>
  <TabsContent value="manual">

<Steps>

<Step>Install dependencies:</Step>

```bash
npm install [dependencies]
```

<Step>Add the provider to your app:</Step>

<ComponentSource name="[provider-name]-provider" />

<Step>Add the hook:</Step>

<ComponentSource name="use-[provider-name]" />

</Steps>

  </TabsContent>
</CodeTabs>

## Setup

Add the provider to your root layout or `_app.tsx`:

### Next.js App Router

```tsx
// app/layout.tsx
import { [ProviderName]Provider } from "@/providers/[provider-name]-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <[ProviderName]Provider>
          {children}
        </[ProviderName]Provider>
      </body>
    </html>
  )
}
```

### Next.js Pages Router

```tsx
// pages/_app.tsx
import { [ProviderName]Provider } from "@/providers/[provider-name]-provider"

export default function App({ Component, pageProps }) {
  return (
    <[ProviderName]Provider>
      <Component {...pageProps} />
    </[ProviderName]Provider>
  )
}
```

## Usage

```tsx
"use client"

import { use[ProviderName] } from "@/hooks/use-[provider-name]"
import { AUTH_MESSAGES } from "@/lib/sensible-defaults"

export function MyComponent() {
  const { user, signIn, signOut, isLoading } = use[ProviderName]()

  const handleAuth = async () => {
    if (user) {
      await signOut()
    } else {
      // For demo purposes - in real app, collect password from form
      const password = prompt('Enter password:')
      if (password) {
        await signIn(password)
      }
    }
  }

  return (
    <div>
      <button onClick={handleAuth} disabled={isLoading}>
        {isLoading 
          ? AUTH_MESSAGES.loading
          : user 
            ? AUTH_MESSAGES.signOut 
            : AUTH_MESSAGES.signIn
        }
      </button>
    </div>
  )
}
```

## Provider Composition

When using multiple providers, compose them in the correct order:

```tsx
<ThemeProvider>
  <[ProviderName]Provider>
    <TooltipProvider>
      {children}
    </TooltipProvider>
  </[ProviderName]Provider>
</ThemeProvider>
```

## API Reference

### [ProviderName]Provider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| children | `React.ReactNode` | - | Child components |
| config | `ConfigType` | `undefined` | Provider configuration |
| onAuthStateChange | `(user: User \| null) => void` | `undefined` | Auth state change callback |

### use[ProviderName] Hook

Returns the current context value with all state and actions.

## Storage Architecture

### Critical Storage Rules

1. **Session Storage** (Temporary Data):
   - Decrypted backup objects (BapMasterBackup, etc.)
   - Payment keys
   - Ordinal keys
   - OAuth state
   - **Cleared on signout**

2. **Local Storage** (Persistent Data):
   - Encrypted backup strings (Base64)
   - BAP rotation history (encrypted)
   - **Never store decrypted data here**
   - **Preserved on signout**

### Storage Namespace Pattern

```typescript
// Development environment
<BitcoinAuthProvider storageNamespace="dev">

// Production environment  
<BitcoinAuthProvider storageNamespace="prod">

// Storybook/testing
<BitcoinAuthProvider storageNamespace="storybook">
```

This prevents data conflicts between environments.

## Bitcoin Backup Types

### Default Configuration

```typescript
// Excludes BapMasterBackup for security
const DEFAULT_ALLOWED_BACKUP_TYPES = [
  "BapMemberBackup",   // Member identity
  "OneSatBackup",      // 1Sat wallet
  "WifBackup"          // Simple WIF key
]
```

### Backup Type Details

1. **BapMasterBackup** (Excluded by default):
   - Contains: xprv, mnemonic, ids
   - Risk: Full identity control
   - Use case: Advanced users only

2. **BapMemberBackup** (Recommended):
   - Contains: wif/derivedPrivateKey, id
   - Risk: Limited to member identity
   - Use case: Standard authentication

3. **OneSatBackup** (Wallet):
   - Contains: ordPk, payPk, identityPk
   - Risk: Wallet access
   - Use case: Full wallet features

4. **WifBackup** (Basic):
   - Contains: wif only
   - Risk: Single key exposure
   - Use case: Simple auth

## SSR Considerations

This provider is SSR-compatible with proper storage checks:

```typescript
// Check if running in browser
if (typeof window !== 'undefined') {
  // Access localStorage/sessionStorage
}
```

## State Management Architecture

This is an app-level provider for global auth state. For component-specific state, embed providers within components. For cross-component communication, use Jotai atoms or Zustand stores.
```

## Step 6: Build and Test

```bash
# Build registry
cd apps/registry && bun registry:build

# Type check
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Test in development
bun dev
```

## Common Mistakes to Avoid

1. Creating providers for component-specific state
2. Not wrapping the entire app with the provider
3. Missing SSR compatibility checks
4. Using `any` types instead of proper interfaces
5. Not memoizing context values (causes unnecessary re-renders)
6. Forgetting to export both provider and hook
7. Not documenting provider composition order
8. Creating multiple instances of the same provider
9. Not handling loading states properly
10. Missing error boundaries for provider failures

## Provider Best Practices

1. **Single Instance**: Only one instance per app
2. **Root Level**: Install at the highest level possible
3. **Composition**: Document the order when using multiple providers
4. **Performance**: Use `useMemo` for context values
5. **Error Handling**: Include error boundaries
6. **Type Safety**: Export all types and interfaces
7. **SSR Safe**: Check for browser APIs before using
8. **Documentation**: Include setup instructions for all frameworks