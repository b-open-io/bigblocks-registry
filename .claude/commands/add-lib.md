Add a new library "$ARGUMENTS" to the BigBlocks registry.

## What is a Library?
A library is a utility module that provides helper functions, classes, or services used by components. Examples: AuthManager, storage adapters, API clients, utility functions.

## CRITICAL RULES
1. **Libraries are non-visual** - they provide functionality, not UI
2. **Can be used in both client and server** unless they use browser APIs
3. **NEVER use `any`, `unknown`, or type casting** - full type safety required
4. **Export all public APIs** - users need access to types and functions
5. **Check shadcn-ui pattern**: Reference `/Users/satchmo/code/shadcn-ui/apps/www/registry/registry-lib.ts`

## Valid BigBlocks Library Categories
- auth: AuthManager, token utilities, session management
- storage: Storage adapters, key management, data persistence
- blockchain: Transaction builders, wallet utilities, signing helpers
- api: API clients, request builders, response handlers
- utils: General utilities, formatters, validators

## Step 1: Research and Plan

### Check if similar utilities exist:
```bash
# Check shadcn-ui lib
cat /Users/satchmo/code/shadcn-ui/apps/www/registry/new-york/lib/utils.ts
# Check existing BigBlocks libs
ls /Users/satchmo/code/bigblocks/src/lib/
```

### Determine library scope:
1. What functionality does it provide?
2. What are the main exports?
3. Does it need browser APIs?
4. What types need to be exported?
5. What are the dependencies?

## Step 2: Create Library File(s)

### Single File Library
Location: `apps/registry/registry/new-york/lib/[library-name].ts`

```typescript
// Add "use client" ONLY if using browser APIs or React hooks
// Most libraries should NOT have "use client"

import type { SomeType } from "@/lib/types"

// Define and export all types
export interface LibraryConfig {
  option1: string
  option2?: number
  // Full type definitions, no any
}

export interface LibraryResult {
  success: boolean
  data?: unknown // Use specific type, not unknown
  error?: Error
}

// Constants
export const LIBRARY_CONSTANTS = {
  DEFAULT_TIMEOUT: 5000,
  MAX_RETRIES: 3,
} as const

// Main class/function
export class LibraryName {
  private config: LibraryConfig
  
  constructor(config: LibraryConfig) {
    this.config = config
  }
  
  async performAction(input: string): Promise<LibraryResult> {
    try {
      // Implementation
      return { success: true, data: result }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error : new Error("Unknown error")
      }
    }
  }
}

// Utility functions
export function utilityHelper(value: string): string {
  return value.toLowerCase().trim()
}

// Factory functions
export function createLibrary(config: LibraryConfig): LibraryName {
  return new LibraryName(config)
}
```

### Multi-File Library
For complex libraries with multiple modules:

Main file: `apps/registry/registry/new-york/lib/[library-name]/index.ts`
```typescript
// Re-export all public APIs
export * from "./client"
export * from "./types"
export * from "./utils"
export { LibraryClient as default } from "./client"
```

Types file: `apps/registry/registry/new-york/lib/[library-name]/types.ts`
```typescript
export interface LibraryOptions {
  // All type definitions
}

export type LibraryEventType = 
  | "connected"
  | "disconnected" 
  | "error"

export interface LibraryEvent {
  type: LibraryEventType
  timestamp: number
  data?: unknown // Use specific type
}
```

Implementation: `apps/registry/registry/new-york/lib/[library-name]/client.ts`
```typescript
import type { LibraryOptions, LibraryEvent } from "./types"

export class LibraryClient {
  // Implementation
}
```

## Step 3: Browser API Handling

If your library uses browser APIs:
```typescript
// Check for browser environment
export function isBrowser(): boolean {
  return typeof window !== "undefined"
}

// Safe browser API usage
export function getStorageItem(key: string): string | null {
  if (!isBrowser()) {
    return null
  }
  
  try {
    return window.localStorage.getItem(key)
  } catch {
    // Handle storage errors (private browsing, etc.)
    return null
  }
}

// SSR-safe initialization
let client: LibraryClient | null = null

export function getClient(): LibraryClient {
  if (!client && isBrowser()) {
    client = new LibraryClient()
  }
  
  if (!client) {
    throw new Error("LibraryClient can only be used in browser environment")
  }
  
  return client
}
```

## Step 4: Update Registry Configuration

Edit `apps/registry/registry.json`:

### Single File Library:
```json
{
  "name": "[library-name]",
  "type": "registry:lib",
  "author": "Satchmo",
  "dependencies": ["needed-npm-packages"],
  "files": [
    {
      "path": "registry/new-york/lib/[library-name].ts",
      "type": "registry:lib",
      "target": ""
    }
  ]
}
```

### Multi-File Library:
```json
{
  "name": "[library-name]",
  "type": "registry:lib", 
  "author": "Satchmo",
  "dependencies": ["needed-npm-packages"],
  "files": [
    {
      "path": "registry/new-york/lib/[library-name]/index.ts",
      "type": "registry:lib",
      "target": ""
    },
    {
      "path": "registry/new-york/lib/[library-name]/types.ts",
      "type": "registry:lib",
      "target": ""
    },
    {
      "path": "registry/new-york/lib/[library-name]/client.ts",
      "type": "registry:lib",
      "target": ""
    }
  ]
}
```

## Step 5: Build Registry
```bash
cd apps/registry && bun registry:build
```

## Step 6: Create Library Documentation

Location: `apps/showcase/content/docs/lib/[library-name].mdx`

```mdx
---
title: [Library Name]
description: [Detailed description of the library's purpose and capabilities]
---

## Installation

<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

```bash
npx shadcn@latest add {{REGISTRY_URL}}/r/[library-name].json
```

  </TabsContent>
  <TabsContent value="manual">

<Steps>

<Step>Install dependencies:</Step>

```bash
npm install [dependencies]
```

<Step>Copy the library files to your project.</Step>

<Step>Update import paths to match your project setup.</Step>

</Steps>

  </TabsContent>
</CodeTabs>

## Usage

### Basic Usage

```typescript
import { LibraryName } from "@/lib/[library-name]"

const library = new LibraryName({
  option1: "value",
  option2: 42
})

const result = await library.performAction("input")
```

### Advanced Usage

```typescript
import { 
  createLibrary, 
  LibraryConfig,
  LIBRARY_CONSTANTS 
} from "@/lib/[library-name]"

const config: LibraryConfig = {
  option1: "custom",
  option2: LIBRARY_CONSTANTS.MAX_RETRIES
}

const library = createLibrary(config)
```

## API Reference

### Classes

#### LibraryName

```typescript
new LibraryName(config: LibraryConfig)
```

##### Methods

| Method | Description | Returns |
| --- | --- | --- |
| `performAction(input: string)` | Main action method | `Promise<LibraryResult>` |
| `reset()` | Resets internal state | `void` |

### Functions

| Function | Description | Returns |
| --- | --- | --- |
| `createLibrary(config)` | Factory function | `LibraryName` |
| `utilityHelper(value)` | Helper function | `string` |

### Types

#### LibraryConfig

```typescript
interface LibraryConfig {
  option1: string
  option2?: number
}
```

#### LibraryResult

```typescript
interface LibraryResult {
  success: boolean
  data?: any
  error?: Error
}
```

### Constants

```typescript
const LIBRARY_CONSTANTS = {
  DEFAULT_TIMEOUT: 5000,
  MAX_RETRIES: 3
}
```

## Examples

### Error Handling

```typescript
try {
  const result = await library.performAction("input")
  if (!result.success) {
    console.error("Action failed:", result.error)
  }
} catch (error) {
  console.error("Unexpected error:", error)
}
```

### With React

```typescript
"use client"

import { useEffect, useState } from "react"
import { LibraryName } from "@/lib/[library-name]"

export function MyComponent() {
  const [library] = useState(() => new LibraryName({ option1: "value" }))
  
  useEffect(() => {
    library.performAction("test").then(result => {
      console.log("Result:", result)
    })
  }, [library])
  
  return <div>Component using library</div>
}
```

## Browser Compatibility

[Specify if the library requires browser APIs or works in Node.js]

## Type Safety

All types are fully exported and can be imported:

```typescript
import type { 
  LibraryConfig, 
  LibraryResult,
  LibraryEventType 
} from "@/lib/[library-name]"
```
```

## Step 7: Testing

```bash
# Type checking - CRITICAL
cd apps/showcase && bunx tsc --noEmit
cd apps/registry && bunx tsc --noEmit

# Check for any usage
grep -r "\bany\b" apps/registry/registry/new-york/lib/[library-name]

# Test in both environments if applicable
# Browser: Load in a component
# Node.js: Test with Node runtime
```

## Common Mistakes to Avoid
- Adding "use client" when not needed (most libs don't need it)
- Using `any` or `unknown` types
- Not exporting types for consumers
- Forgetting to handle SSR/browser differences
- Not providing factory functions
- Missing error handling
- Hard dependencies on browser APIs without checks
- Not documenting all exports

## Patterns for Different Library Types

### Storage Adapter Pattern
```typescript
export interface StorageAdapter {
  get(key: string): Promise<string | null>
  set(key: string, value: string): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
}

export class LocalStorageAdapter implements StorageAdapter {
  // Implementation
}
```

### Service Client Pattern
```typescript
export class APIClient {
  constructor(private baseUrl: string) {}
  
  async get<T>(path: string): Promise<T> {
    // Implementation
  }
}
```

### Utility Collection Pattern
```typescript
export const utils = {
  formatDate: (date: Date) => { /* ... */ },
  parseAmount: (amount: string) => { /* ... */ },
  validateAddress: (address: string) => { /* ... */ },
} as const
```