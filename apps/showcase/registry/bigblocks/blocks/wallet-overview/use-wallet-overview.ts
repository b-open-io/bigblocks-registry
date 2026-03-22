import { useCallback, useEffect, useRef, useState } from "react"
import { useWallet } from "@1sat/react"
import { loadConnection } from "@1sat/connect"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Balance breakdown returned by the 1sat-stack API */
export interface WalletBalance {
  /** Confirmed satoshis */
  confirmed: number
  /** Unconfirmed satoshis */
  unconfirmed: number
  /** Total satoshis (confirmed + unconfirmed) */
  total: number
}

/**
 * Wallet data source that decouples from `@1sat/react` `WalletProvider`.
 * Pass this to `useWalletOverviewDirect` or `WalletOverview` to drive the
 * block without any browser wallet provider dependency.
 *
 * Desktop apps (Electrobun, Tauri, etc.) supply addresses and an optional
 * balance fetcher. Alternatively, pass data directly to `WalletOverviewUI`
 * as props to skip hooks entirely.
 */
export interface WalletSource {
  /** BSV payment address */
  paymentAddress: string
  /** Ordinal receiving address */
  ordinalAddress: string
  /** Identity public key */
  identityKey: string | null
  /**
   * Optional function that resolves the wallet balance.
   * When provided, the hook calls this instead of fetching from the API.
   * When omitted, the hook fetches from `apiUrl` using `paymentAddress`.
   */
  getBalance?: () => Promise<WalletBalance>
}

export interface UseWalletOverviewOptions {
  /**
   * Base URL for the 1sat-stack balance API.
   * Only used when fetching balance via HTTP (i.e. no `getBalance`
   * function on the wallet source).
   * @default "https://api.1sat.app"
   */
  apiUrl?: string
}

export interface UseWalletOverviewReturn {
  /** Balance breakdown in satoshis, null while loading or disconnected */
  balance: WalletBalance | null
  /** BSV payment address, null when disconnected */
  paymentAddress: string | null
  /** Ordinal receiving address, null when disconnected */
  ordinalAddress: string | null
  /** Identity public key, null when disconnected */
  identityKey: string | null
  /** Whether balance is being fetched */
  isLoading: boolean
  /** Error from the last balance fetch */
  error: Error | null
  /** Manually refetch the balance */
  refetch: () => void
}

/** Shape returned from the 1sat-stack balance endpoint */
interface BalanceApiResponse {
  confirmed: number
  unconfirmed: number
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_API_URL = "https://api.1sat.app"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fetchBalance(
  address: string,
  signal: AbortSignal,
  apiUrl: string
): Promise<WalletBalance> {
  const res = await fetch(
    `${apiUrl}/1sat/owner/${address}/balance`,
    { signal }
  )
  if (!res.ok) {
    throw new Error(`Balance fetch failed: HTTP ${res.status}`)
  }
  const data: BalanceApiResponse = await res.json()
  return {
    confirmed: data.confirmed,
    unconfirmed: data.unconfirmed,
    total: data.confirmed + data.unconfirmed,
  }
}

// ---------------------------------------------------------------------------
// Hook: useWalletOverviewDirect (no @1sat/react dependency)
// ---------------------------------------------------------------------------

/**
 * Manages balance fetching for a wallet whose addresses are known upfront.
 * Does **not** depend on `@1sat/react` or `@1sat/connect` — suitable for
 * desktop apps, custom wallet integrations, or any context where wallet
 * data is provided externally.
 *
 * @example Desktop app with custom balance resolver
 * ```ts
 * const overview = useWalletOverviewDirect({
 *   paymentAddress: "1A1zP1...",
 *   ordinalAddress: "1BvBM...",
 *   identityKey: "02abc...",
 *   getBalance: async () => ({
 *     confirmed: 50000,
 *     unconfirmed: 0,
 *     total: 50000,
 *   }),
 * })
 * ```
 *
 * @example Desktop app fetching from a custom API
 * ```ts
 * const overview = useWalletOverviewDirect(
 *   { paymentAddress: "1A1zP1...", ordinalAddress: "1BvBM...", identityKey: null },
 *   { apiUrl: "https://my-api.example.com" }
 * )
 * ```
 */
export function useWalletOverviewDirect(
  wallet: WalletSource,
  options?: UseWalletOverviewOptions
): UseWalletOverviewReturn {
  const apiUrl = options?.apiUrl ?? DEFAULT_API_URL
  const [balance, setBalance] = useState<WalletBalance | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const doFetch = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsLoading(true)
    setError(null)

    try {
      const result = wallet.getBalance
        ? await wallet.getBalance()
        : await fetchBalance(wallet.paymentAddress, controller.signal, apiUrl)
      if (!controller.signal.aborted) {
        setBalance(result)
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      const fetchError =
        err instanceof Error ? err : new Error("Failed to fetch balance")
      if (!controller.signal.aborted) {
        setError(fetchError)
        setBalance(null)
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [wallet.paymentAddress, wallet.getBalance, apiUrl])

  useEffect(() => {
    void doFetch()
    return () => {
      abortRef.current?.abort()
    }
  }, [doFetch])

  return {
    balance,
    paymentAddress: wallet.paymentAddress,
    ordinalAddress: wallet.ordinalAddress,
    identityKey: wallet.identityKey,
    isLoading,
    error,
    refetch: doFetch,
  }
}

// ---------------------------------------------------------------------------
// Hook: useWalletOverview (@1sat/react provider — original web behavior)
// ---------------------------------------------------------------------------

/**
 * Fetches wallet addresses from `@1sat/connect` stored connection and
 * balance from the 1sat-stack API. Must be rendered inside `WalletProvider`
 * from `@1sat/react`.
 *
 * For desktop or custom wallet integrations that don't use `@1sat/react`,
 * use `useWalletOverviewDirect` instead, or pass data directly to
 * `WalletOverviewUI` as props.
 *
 * @example Default API
 * ```ts
 * const { balance, paymentAddress, ordinalAddress, identityKey, isLoading } =
 *   useWalletOverview()
 * ```
 *
 * @example Custom API URL
 * ```ts
 * const overview = useWalletOverview({ apiUrl: "https://my-api.example.com" })
 * ```
 */
export function useWalletOverview(
  options?: UseWalletOverviewOptions
): UseWalletOverviewReturn {
  const apiUrl = options?.apiUrl ?? DEFAULT_API_URL
  const { status, identityKey } = useWallet()
  const [balance, setBalance] = useState<WalletBalance | null>(null)
  const [paymentAddress, setPaymentAddress] = useState<string | null>(null)
  const [ordinalAddress, setOrdinalAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Resolve addresses from the stored connection when connected
  useEffect(() => {
    if (status === "connected") {
      const stored = loadConnection()
      setPaymentAddress(stored?.paymentAddress ?? null)
      setOrdinalAddress(stored?.ordinalAddress ?? null)
    } else {
      setPaymentAddress(null)
      setOrdinalAddress(null)
      setBalance(null)
      setError(null)
    }
  }, [status])

  const doFetch = useCallback(async () => {
    if (!paymentAddress) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchBalance(
        paymentAddress,
        controller.signal,
        apiUrl
      )
      setBalance(result)
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      const fetchError =
        err instanceof Error ? err : new Error("Failed to fetch balance")
      setError(fetchError)
      setBalance(null)
    } finally {
      setIsLoading(false)
    }
  }, [paymentAddress, apiUrl])

  // Auto-fetch balance when payment address becomes available
  useEffect(() => {
    if (paymentAddress) {
      void doFetch()
    }
    return () => {
      abortRef.current?.abort()
    }
  }, [paymentAddress, doFetch])

  return {
    balance,
    paymentAddress,
    ordinalAddress,
    identityKey,
    isLoading,
    error,
    refetch: doFetch,
  }
}
