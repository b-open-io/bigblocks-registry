"use client"

import { OAuthCallbackUI } from "./oauth-callback-ui"
import {
  useOAuthCallback,
  type OAuthCallbackResult,
  type OAuthCallbackUser,
  type OAuthCallbackStatus,
  type UseOAuthCallbackOptions,
  type UseOAuthCallbackReturn,
} from "./use-oauth-callback"

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export {
  OAuthCallbackUI,
  type OAuthCallbackUIProps,
} from "./oauth-callback-ui"
export {
  useOAuthCallback,
  type OAuthCallbackResult,
  type OAuthCallbackUser,
  type OAuthCallbackStatus,
  type UseOAuthCallbackOptions,
  type UseOAuthCallbackReturn,
} from "./use-oauth-callback"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OAuthCallbackProps {
  /**
   * The handler function that processes the OAuth callback.
   * Receives the authorization code and state from URL params,
   * and should exchange them for user data and tokens.
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
  /** Additional CSS classes */
  className?: string
}

// ---------------------------------------------------------------------------
// Composed component
// ---------------------------------------------------------------------------

/**
 * OAuth callback page block that handles the redirect after authentication.
 *
 * Reads `code`, `state`, and `error` from the current URL search params,
 * calls the provided `onCallback` to exchange the code for tokens, and
 * displays loading, success, or error states.
 *
 * This block is auth-system agnostic. Pass your own `onCallback` function
 * that returns an `OAuthCallbackResult`.
 *
 * @example
 * ```tsx
 * // In your callback page (e.g. app/auth/callback/page.tsx):
 * import { OAuthCallback } from "@/components/blocks/oauth-callback"
 * import { authClient } from "@/lib/auth-client"
 *
 * export default function CallbackPage() {
 *   return (
 *     <OAuthCallback
 *       onCallback={async ({ code, state }) => {
 *         const result = await authClient.sigma.handleCallback(
 *           new URLSearchParams({ code, state })
 *         )
 *         return {
 *           user: {
 *             id: result.user.sub,
 *             name: result.user.name,
 *             image: result.user.picture ?? undefined,
 *             pubkey: result.user.pubkey,
 *             bapId: result.user.bap_id,
 *           },
 *           accessToken: result.access_token,
 *         }
 *       }}
 *       redirectUrl="/dashboard"
 *       onSuccess={(result) => console.log("Authenticated:", result.user.id)}
 *     />
 *   )
 * }
 * ```
 */
export function OAuthCallback({
  onCallback,
  onSuccess,
  onError,
  redirectUrl = "/",
  redirectDelay = 2000,
  className,
}: OAuthCallbackProps) {
  const { status, user, errorMessage, retry } = useOAuthCallback({
    onCallback,
    onSuccess,
    onError,
    redirectUrl,
    redirectDelay,
  })

  return (
    <OAuthCallbackUI
      status={status}
      user={user}
      errorMessage={errorMessage}
      redirectUrl={redirectUrl}
      onRetry={retry}
      className={className}
    />
  )
}
