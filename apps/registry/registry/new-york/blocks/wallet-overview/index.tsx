"use client"

import { WalletOverviewUI } from "./wallet-overview-ui"
import {
  useWalletOverview,
  useWalletOverviewDirect,
  type UseWalletOverviewOptions,
  type UseWalletOverviewReturn,
  type WalletBalance,
  type WalletSource,
} from "./use-wallet-overview"

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export {
  WalletOverviewUI,
  type WalletOverviewUIProps,
} from "./wallet-overview-ui"
export {
  useWalletOverview,
  useWalletOverviewDirect,
  type UseWalletOverviewOptions,
  type UseWalletOverviewReturn,
  type WalletBalance,
  type WalletSource,
} from "./use-wallet-overview"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WalletOverviewBaseProps {
  /** Callback fired when the Send button is clicked */
  onSend?: () => void
  /** Callback fired when the Receive button is clicked */
  onReceive?: () => void
  /** Additional CSS classes */
  className?: string
  /**
   * Base URL for the 1sat-stack balance API.
   * Only used when fetching balance via HTTP.
   * @default "https://api.1sat.app"
   */
  apiUrl?: string
}

/**
 * Web mode: rendered inside `WalletProvider` from `@1sat/react`.
 * No `wallet` prop needed — addresses and identity are read from context.
 */
interface WalletOverviewProviderProps extends WalletOverviewBaseProps {
  wallet?: undefined
}

/**
 * Direct mode: provide wallet data explicitly, no `@1sat/react` required.
 * Used by desktop apps (Electrobun, Tauri, etc.) or any context that
 * manages wallet state independently.
 */
interface WalletOverviewDirectProps extends WalletOverviewBaseProps {
  /**
   * External wallet data source. When provided, bypasses `@1sat/react`
   * context entirely. See `WalletSource` for the shape.
   */
  wallet: WalletSource
}

export type WalletOverviewProps =
  | WalletOverviewProviderProps
  | WalletOverviewDirectProps

// ---------------------------------------------------------------------------
// Composed components
// ---------------------------------------------------------------------------

/**
 * Internal: renders with `useWalletOverview` (requires `WalletProvider`).
 */
function WalletOverviewWithProvider({
  onSend,
  onReceive,
  className,
  apiUrl,
}: WalletOverviewProviderProps) {
  const {
    balance,
    paymentAddress,
    ordinalAddress,
    identityKey,
    isLoading,
    error,
    refetch,
  } = useWalletOverview({ apiUrl })

  return (
    <WalletOverviewUI
      balance={balance}
      paymentAddress={paymentAddress}
      ordinalAddress={ordinalAddress}
      identityKey={identityKey}
      isLoading={isLoading}
      error={error}
      onSend={onSend}
      onReceive={onReceive}
      onRefresh={refetch}
      className={className}
    />
  )
}

/**
 * Internal: renders with `useWalletOverviewDirect` (no provider needed).
 */
function WalletOverviewWithDirect({
  wallet,
  onSend,
  onReceive,
  className,
  apiUrl,
}: WalletOverviewDirectProps) {
  const {
    balance,
    paymentAddress,
    ordinalAddress,
    identityKey,
    isLoading,
    error,
    refetch,
  } = useWalletOverviewDirect(wallet, { apiUrl })

  return (
    <WalletOverviewUI
      balance={balance}
      paymentAddress={paymentAddress}
      ordinalAddress={ordinalAddress}
      identityKey={identityKey}
      isLoading={isLoading}
      error={error}
      onSend={onSend}
      onReceive={onReceive}
      onRefresh={refetch}
      className={className}
    />
  )
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

/**
 * Wallet overview block displaying BSV balance, addresses, and action buttons.
 *
 * Supports two modes:
 *
 * 1. **Web (default):** Composes `useWalletOverview` with `WalletOverviewUI`.
 *    Must be rendered inside `WalletProvider` from `@1sat/react`.
 *
 * 2. **Direct:** Pass a `wallet` prop with addresses and an optional
 *    `getBalance` function. No `@1sat/react` provider required. Ideal for
 *    desktop apps or custom wallet integrations.
 *
 * For full control, use `WalletOverviewUI` directly with props.
 *
 * @example Web mode (inside WalletProvider)
 * ```tsx
 * import { WalletProvider } from "@1sat/react"
 * import { WalletOverview } from "@/components/blocks/wallet-overview"
 *
 * function App() {
 *   return (
 *     <WalletProvider>
 *       <WalletOverview
 *         onSend={() => console.log("Open send dialog")}
 *         onReceive={() => console.log("Open receive dialog")}
 *       />
 *     </WalletProvider>
 *   )
 * }
 * ```
 *
 * @example Web mode with custom API
 * ```tsx
 * <WalletProvider>
 *   <WalletOverview apiUrl="https://my-api.example.com" />
 * </WalletProvider>
 * ```
 *
 * @example Direct mode (desktop / custom wallet)
 * ```tsx
 * <WalletOverview
 *   wallet={{
 *     paymentAddress: "1A1zP1...",
 *     ordinalAddress: "1BvBM...",
 *     identityKey: "02abc...",
 *     getBalance: async () => ({
 *       confirmed: 50000,
 *       unconfirmed: 0,
 *       total: 50000,
 *     }),
 *   }}
 *   onSend={() => rpc.request.openSendDialog()}
 *   onReceive={() => rpc.request.openReceiveDialog()}
 * />
 * ```
 */
export function WalletOverview(props: WalletOverviewProps) {
  if (props.wallet) {
    return <WalletOverviewWithDirect {...props} wallet={props.wallet} />
  }
  return <WalletOverviewWithProvider {...props} />
}
