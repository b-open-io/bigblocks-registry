import { useCallback, useState } from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Supported OAuth providers for account restore/linking */
export type OAuthProvider = "github" | "google"

/**
 * A function that initiates Sigma OAuth sign-in.
 *
 * This matches the shape of `authClient.signIn.sigma()` from
 * `@sigma-auth/better-auth-plugin/client` so consumers can pass
 * it directly, but any function with the same signature works.
 *
 * @example
 * ```ts
 * import { authClient } from "@/lib/auth-client"
 *
 * const sigmaSignIn: SigmaSignInFn = (opts) =>
 *   authClient.signIn.sigma(opts)
 * ```
 */
export type SigmaSignInFn = (options: {
  clientId: string
  callbackURL?: string
  provider?: string
}) => Promise<unknown>

export interface UseBitcoinSigninOptions {
  /** OAuth client ID registered with Sigma Identity */
  clientId: string
  /**
   * Callback URL after OAuth redirect.
   * Defaults to `window.location.origin + "/auth/sigma/callback"`.
   */
  callbackUrl?: string
  /**
   * The `signIn.sigma` function from a Better Auth client configured
   * with the sigma plugin. This keeps the block decoupled from any
   * specific auth client instance.
   *
   * @example
   * ```ts
   * import { authClient } from "@/lib/auth-client"
   * const signIn = (opts) => authClient.signIn.sigma(opts)
   * ```
   */
  signIn: SigmaSignInFn
  /** Called when a sign-in error occurs */
  onError?: (error: Error) => void
}

export interface UseBitcoinSigninReturn {
  /** Whether a sign-in request is in progress */
  isLoading: boolean
  /** The most recent error, if any */
  error: Error | null
  /** Initiate Bitcoin (Sigma) sign-in */
  loginWithSigma: () => Promise<void>
  /** Initiate OAuth provider sign-in for account restore */
  loginWithProvider: (provider: OAuthProvider) => Promise<void>
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Hook that wraps Sigma Identity sign-in calls.
 *
 * Accepts a `signIn` function rather than importing the auth client
 * directly, keeping the block decoupled from any specific Better Auth
 * client configuration.
 */
export function useBitcoinSignin({
  clientId,
  callbackUrl,
  signIn,
  onError,
}: UseBitcoinSigninOptions): UseBitcoinSigninReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const resolveCallbackUrl = useCallback((): string => {
    if (callbackUrl) return callbackUrl
    if (typeof window !== "undefined") {
      return `${window.location.origin}/auth/sigma/callback`
    }
    return "/auth/sigma/callback"
  }, [callbackUrl])

  const loginWithSigma = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn({
        clientId,
        callbackURL: resolveCallbackUrl(),
      })
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      setError(err)
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }, [clientId, signIn, resolveCallbackUrl, onError])

  const loginWithProvider = useCallback(
    async (provider: OAuthProvider) => {
      setIsLoading(true)
      setError(null)
      try {
        await signIn({
          clientId,
          callbackURL: resolveCallbackUrl(),
          provider,
        })
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e))
        setError(err)
        onError?.(err)
      } finally {
        setIsLoading(false)
      }
    },
    [clientId, signIn, resolveCallbackUrl, onError],
  )

  return {
    isLoading,
    error,
    loginWithSigma,
    loginWithProvider,
  }
}
