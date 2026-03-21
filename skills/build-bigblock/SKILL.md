---
name: build-bigblock
description: "This skill should be used when building blocks for the BigBlocks registry, adding Bitcoin UI components, or working with the bigblocks-registry repo. Triggers on 'add a block', 'create a BigBlocks component', 'new block', 'build a block', 'BigBlocks registry', 'bitcoin UI component', 'marketplace block', 'social block', 'wallet block', 'identity block', '@1sat/react', '@1sat/actions', 'BSocial', 'OrdLock', 'inscribe', 'ordinals UI', or 'on-chain social'. Provides the standard block structure, registry entry format, SDK integration patterns, and project context detection."
---

# Build BigBlock

Build production-ready blocks for the BigBlocks registry — the shadcn-compatible component registry for Bitcoin applications.

## Project Context

Detect the project configuration before building:

```bash
cat apps/registry/registry.json | head -5
```

This returns the registry manifest with all existing blocks, their types, dependencies, and file paths. Use this to understand naming conventions, dependency patterns, and what already exists.

## Core Concept: Everything is a Block

BigBlocks ships only `registry:block` items. Every block bundles UI presentation with business logic (wallet actions, on-chain transactions, API queries). This is what makes BigBlocks different from a pure UI library — each block is a complete feature, not just a styled element.

The name "BigBlocks" reflects this: big, self-contained building blocks for Bitcoin apps.

## Block Structure

Every block lives in `apps/registry/registry/new-york/blocks/[name]/` with exactly three concerns:

```
blocks/[name]/
  index.tsx           — Composed export: wires hook to UI, re-exports all types
  [name]-ui.tsx       — Pure presentation: shadcn components, theme tokens, no SDK imports
  use-[name].ts       — Pure logic: wallet actions, 1sat-stack queries, state management
```

Split the UI file further when it exceeds ~250 lines or contains logically separate surfaces (e.g., trigger button + dialog form = two UI files).

### The Hook (`use-[name].ts`)

Owns all logic. Imports from `@1sat/react` and `@1sat/actions`. Never imports UI components.

```typescript
import { useCallback, useState } from "react"
import { useWallet } from "@1sat/react"

export interface UseNameReturn {
  isLoading: boolean
  error: Error | null
  execute: (params: NameParams) => Promise<NameResult>
  reset: () => void
}

export function useName({ onSuccess, onError }: UseNameOptions = {}): UseNameReturn {
  const { wallet } = useWallet()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async (params: NameParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await action.execute({ wallet }, params)
      onSuccess?.(result)
      return result
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      setError(e)
      onError?.(e)
      return { error: e.message }
    } finally {
      setIsLoading(false)
    }
  }, [wallet, onSuccess, onError])

  return { isLoading, error, execute, reset: useCallback(() => setError(null), []) }
}
```

### The UI (`[name]-ui.tsx`)

Pure presentation. Receives data and callbacks as props. Never imports from `@1sat/*` SDKs.

```typescript
"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NameUi({ isLoading, error, onSubmit, className }: NameUiProps) {
  return (
    <div className={cn("...", className)}>
      {/* shadcn components only, semantic color tokens only */}
    </div>
  )
}
```

### The Index (`index.tsx`)

Wires hook to UI. Re-exports everything consumers need from a single import.

```typescript
"use client"

import { useName } from "./use-name"
import { NameUi } from "./name-ui"

export { useName } from "./use-name"
export { NameUi } from "./name-ui"
export type { UseNameOptions, NameParams, NameResult } from "./use-name"

export function Name({ onSuccess, onError, className }: NameProps) {
  const { isLoading, error, execute } = useName({ onSuccess, onError })
  return <NameUi isLoading={isLoading} error={error} onSubmit={execute} className={className} />
}
```

## Categories

| Category | Blocks | Key SDK |
|----------|--------|---------|
| `wallet` | connect-wallet, send-bsv | `@1sat/react` useWallet, `@1sat/actions` payments |
| `social` | post-button, like-button, follow-button, friend-button | `@1sat/templates` BSocial |
| `market` | inscribe-file, deploy-token, create-listing, buy-listing | `@1sat/actions` ordinals, inscriptions |
| `identity` | bitcoin-avatar, profile-card, identity-selector | `@1sat/client` BapClient, `sigma-avatars` |

## Registry Entry

Add to `apps/registry/registry.json`:

```json
{
  "name": "block-name",
  "type": "registry:block",
  "title": "Human Title",
  "description": "What this block does in one sentence.",
  "author": "Satchmo <https://bigblocks.dev>",
  "categories": ["wallet"],
  "dependencies": ["@1sat/react", "@1sat/actions", "lucide-react"],
  "registryDependencies": ["button", "dialog", "input"],
  "files": [
    { "path": "registry/new-york/blocks/block-name/index.tsx", "type": "registry:block", "target": "" },
    { "path": "registry/new-york/blocks/block-name/block-name-ui.tsx", "type": "registry:component", "target": "" },
    { "path": "registry/new-york/blocks/block-name/use-block-name.ts", "type": "registry:hook", "target": "" }
  ]
}
```

Follow with a demo entry:

```json
{
  "name": "block-name-demo",
  "type": "registry:example",
  "registryDependencies": ["https://registry.bigblocks.dev/r/block-name.json"],
  "files": [{ "path": "registry/new-york/examples/block-name-demo.tsx", "type": "registry:example", "target": "" }]
}
```

## SDK Integration

### @1sat/react — Wallet context

```typescript
import { useWallet } from "@1sat/react"
const { wallet, status, identityKey, connect, disconnect } = useWallet()
```

### @1sat/actions — On-chain operations

Actions follow `action.execute(ctx, input)` pattern. All return `{ txid?, rawtx?, error? }`.

- **Payments**: `sendBsv` — send satoshis to addresses
- **Social**: `createPost`, `likePost`, `followUser` — BSocial protocol transactions
- **Ordinals**: `inscribe`, `listOrdinal`, `purchaseOrdinal`, `cancelListing` — 1Sat Ordinals
- **Tokens**: `deployBsv21Token`, `transferOrdTokens` — BSV21 fungible tokens
- **Identity**: `publishIdentity`, `updateProfile` — BAP identity management

### @1sat/templates — Script builders (lower-level)

```typescript
import { BSocial, MAP, Inscription, OrdLock } from "@1sat/templates"
```

Use templates directly only when `@1sat/actions` does not expose the operation needed.

### 1sat-stack API — Data queries

Base URL: `https://api.1sat.app/1sat`

| Endpoint | Use |
|----------|-----|
| `GET /owner/{address}/balance` | BSV balance |
| `GET /owner/{address}/txos` | Unspent outputs (SSE) |
| `GET /bap/profile/{bapId}` | BAP identity profile |
| `GET /bsocial/post/search?q=...` | Social post search |
| `GET /bsv21/{tokenId}` | Token details |
| `GET /content/{outpoint}` | ORDFS inscription content |

## Rules

These are non-negotiable because BigBlocks components must work with any shadcn theme and maintain type safety across the ecosystem:

- `"use client"` on every `.tsx` file
- ALL colors from shadcn semantic tokens: `bg-primary`, `text-muted-foreground`, `border-border`, etc. Never Tailwind palette colors (`bg-blue-500`)
- Zero `any`, zero `as` casts, zero `@ts-ignore`
- `cn()` from `@/lib/utils` for class merging
- `cva` from `class-variance-authority` for visual variants
- shadcn component imports from `@/components/ui/*`
- `lucide-react` for icons
- Hook imports nothing from UI layer; UI imports nothing from SDK layer
- Every block accepts `onSuccess` and `onError` callback props
- All exported interfaces have JSDoc comments

## Verification

Run after every block, before committing:

```bash
cd apps/registry && bunx tsc --noEmit
cd apps/registry && bun registry:build
grep -rn "\bany\b" apps/registry/registry/new-york/blocks/[name]/
grep -En "bg-(red|blue|green|yellow|purple|pink|gray|slate|zinc)-[0-9]+" apps/registry/registry/new-york/blocks/[name]/
```

## Reference Implementations

Study these before building:

- **send-bsv** (trigger + dialog pattern): `apps/registry/registry/new-york/blocks/send-bsv/`
- **inscribe-file** (dropzone + form pattern): `apps/registry/registry/new-york/blocks/inscribe-file/`
- **Registry manifest**: `apps/registry/registry.json`
