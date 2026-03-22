"use client"

import { TokenListUI } from "./token-list-ui"
import {
  useTokenList,
  type UseTokenListOptions,
  type TokenHolding,
} from "./use-token-list"

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export { TokenListUI, type TokenListUIProps } from "./token-list-ui"
export {
  useTokenList,
  type UseTokenListOptions,
  type UseTokenListReturn,
  type TokenHolding,
  type TokenType,
} from "./use-token-list"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TokenListProps {
  /** BSV payment address to fetch token holdings for */
  address: string | null
  /** Token IDs to fetch balances for */
  tokenIds?: string[]
  /** Custom API base URL (default: https://api.1sat.app) */
  apiUrl?: string
  /** Whether to auto-fetch on mount (default: true) */
  autoFetch?: boolean
  /** Callback when a token row is selected */
  onSelect?: (token: TokenHolding) => void
  /** Number of skeleton rows to show while loading (default: 3) */
  skeletonCount?: number
  /** Optional CSS class name */
  className?: string
}

// ---------------------------------------------------------------------------
// Composed component
// ---------------------------------------------------------------------------

/**
 * Displays a list of BSV20/BSV21 fungible token holdings with balances,
 * icons, and token details. Composes the `useTokenList` hook with the
 * `TokenListUI` presentation component.
 *
 * Requires a BSV address and a list of token IDs. Token details and balances
 * are fetched from the 1Sat API.
 *
 * @example
 * ```tsx
 * import { TokenList } from "@/components/blocks/token-list"
 *
 * function WalletTokens() {
 *   return (
 *     <TokenList
 *       address="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
 *       tokenIds={["abc123_0", "def456_0"]}
 *       onSelect={(token) => console.log("Selected:", token.symbol)}
 *     />
 *   )
 * }
 * ```
 */
export function TokenList({
  address,
  tokenIds,
  apiUrl,
  autoFetch,
  onSelect,
  skeletonCount,
  className,
}: TokenListProps) {
  const { tokens, isLoading, error } = useTokenList({
    address,
    tokenIds,
    apiUrl,
    autoFetch,
  })

  return (
    <TokenListUI
      tokens={tokens}
      isLoading={isLoading}
      error={error}
      onSelect={onSelect}
      skeletonCount={skeletonCount}
      className={className}
    />
  )
}
