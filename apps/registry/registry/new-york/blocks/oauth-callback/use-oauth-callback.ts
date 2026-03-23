"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** User data returned from a successful OAuth callback */
export interface OAuthCallbackUser {
  /** Unique user identifier */
  id: string
  /** Display name */
  name?: string
  /** Profile image URL */
  image?: string
  /** Bitcoin public key */
  pubkey?: string
  /** BAP identity ID */
  bapId?: string
}

/** Result of a successful OAuth callback exchange */
export interface OAuthCallbackResult {
  /** Authenticated user data */
  user: OAuthCallbackUser
  /** Access token for API requests */
  accessToken?: string
}

/** Current status of the OAuth callback flow */
export type OAuthCallbackStatus = "loading" | "success" | "error"

/** Return value from the useOAuthCallback hook */
export interface UseOAuthCallbackReturn {
  /** Current callback processing status */
  status: OAuthCallbackStatus
  /** Authenticated user data (available when status is "success") */
  user: OAuthCallbackUser | null
  /** Error message (available when status is "error") */
  errorMessage: string | null
  /** Retry the callback processing */
  retry: () => void
}

/** Options for configuring the useOAuthCallback hook */
export interface UseOAuthCallbackOptions {
  /**
   * The handler function that processes the OAuth callback.
   * Receives the authorization code and state, returns user data.
   */
  onCallback: (params: { code: string; state: string }) => Promise<OAuthCallbackResult>
  /** Called after successful callback processing */
  onSuccess?: (result: OAuthCallbackResult) => void
  /** Called when callback processing fails */
  onError?: (error: Error) => void
  /** URL to redirect to after successful authentication (default: "/") */
  redirectUrl?: string
  /** Delay in ms before redirecting after success (default: 2000) */
  redirectDelay?: number
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse URL search params from the current window location.
 * Returns null if running on the server.
 */
function getSearchParams(): URLSearchParams | null {
  if (typeof window === "undefined") return null
  return new URLSearchParams(window.location.search)
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Hook that handles an OAuth callback page flow.
 *
 * Reads `code`, `state`, and `error` from URL search params,
 * calls the provided `onCallback` handler to exchange the code for tokens,
 * and manages loading/success/error states.
 *
 * @example
 * ```tsx
 * const { status, user, errorMessage, retry } = useOAuthCallback({
 *   onCallback: async ({ code, state }) => {
 *     const result = await authClient.sigma.handleCallback(
 *       new URLSearchParams({ code, state })
 *     )
 *     return {
 *       user: { id: result.user.sub, name: result.user.name },
 *       accessToken: result.access_token,
 *     }
 *   },
 *   onSuccess: () => router.push("/dashboard"),
 * })
 * ```
 */
export function useOAuthCallback({
  onCallback,
  onSuccess,
  onError,
  redirectUrl = "/",
  redirectDelay = 2000,
}: UseOAuthCallbackOptions): UseOAuthCallbackReturn {
  const [status, setStatus] = useState<OAuthCallbackStatus>("loading")
  const [user, setUser] = useState<OAuthCallbackUser | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Guard against double-invocation in React Strict Mode
  const processedRef = useRef(false)

  const processCallback = useCallback(async () => {
    const searchParams = getSearchParams()
    if (!searchParams) {
      setStatus("error")
      setErrorMessage("Unable to read URL parameters. Please try again.")
      return
    }

    // Check for OAuth error in URL params
    const urlError = searchParams.get("error")
    if (urlError) {
      const errorDescription =
        searchParams.get("error_description") ?? urlError
      const err = new Error(errorDescription)
      setStatus("error")
      setErrorMessage(errorDescription)
      onError?.(err)
      return
    }

    // Extract code and state
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code) {
      const err = new Error(
        "Missing authorization code. The authentication server did not return a valid response."
      )
      setStatus("error")
      setErrorMessage(err.message)
      onError?.(err)
      return
    }

    if (!state) {
      const err = new Error(
        "Missing state parameter. This may indicate a security issue. Please try signing in again."
      )
      setStatus("error")
      setErrorMessage(err.message)
      onError?.(err)
      return
    }

    try {
      setStatus("loading")
      const result = await onCallback({ code, state })
      setUser(result.user)
      setStatus("success")
      onSuccess?.(result)

      // Auto-redirect after delay
      if (typeof window !== "undefined" && redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl
        }, redirectDelay)
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setStatus("error")
      setErrorMessage(error.message)
      onError?.(error)
    }
  }, [onCallback, onSuccess, onError, redirectUrl, redirectDelay])

  useEffect(() => {
    if (processedRef.current) return
    processedRef.current = true
    void processCallback()
  }, [processCallback])

  const retry = useCallback(() => {
    processedRef.current = false
    setStatus("loading")
    setErrorMessage(null)
    setUser(null)
    processedRef.current = true
    void processCallback()
  }, [processCallback])

  return {
    status,
    user,
    errorMessage,
    retry,
  }
}
