"use client"

import {
  BitcoinSigninUI,
} from "./bitcoin-signin-ui"
import {
  type OAuthProvider,
  type SigmaSignInFn,
  useBitcoinSignin,
} from "./use-bitcoin-signin"

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export {
  BitcoinSigninUI,
  type BitcoinSigninUIProps,
} from "./bitcoin-signin-ui"
export {
  type OAuthProvider,
  type SigmaSignInFn,
  type UseBitcoinSigninOptions,
  type UseBitcoinSigninReturn,
  useBitcoinSignin,
} from "./use-bitcoin-signin"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BitcoinSigninProps {
  /** OAuth client ID registered with Sigma Identity (required) */
  clientId: string
  /**
   * Callback URL after OAuth redirect.
   * Defaults to `window.location.origin + "/auth/sigma/callback"`.
   */
  callbackUrl?: string
  /**
   * The `signIn.sigma` function from a Better Auth client configured
   * with the sigma plugin.
   *
   * @example
   * ```ts
   * import { authClient } from "@/lib/auth-client"
   * <BitcoinSignin signIn={(opts) => authClient.signIn.sigma(opts)} />
   * ```
   */
  signIn: SigmaSignInFn
  /** Show OAuth provider buttons for account restore (default: false) */
  showProviders?: boolean
  /** Which OAuth providers to show (default: ["github", "google"]) */
  providers?: OAuthProvider[]
  /** Visual style variant */
  variant?: "default" | "outline" | "ghost"
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Additional CSS classes */
  className?: string
  /** Called when a sign-in error occurs */
  onError?: (error: Error) => void
}

// ---------------------------------------------------------------------------
// Composed component
// ---------------------------------------------------------------------------

/**
 * A sign-in button that initiates OAuth flow via Sigma Identity
 * (Bitcoin-based authentication using Better Auth).
 *
 * Requires a `signIn` function — typically `authClient.signIn.sigma`
 * from a Better Auth client configured with `sigmaClient()`.
 *
 * @example
 * ```tsx
 * import { authClient } from "@/lib/auth-client"
 * import { BitcoinSignin } from "@/components/blocks/bitcoin-signin"
 *
 * function LoginPage() {
 *   return (
 *     <BitcoinSignin
 *       clientId="my-app"
 *       signIn={(opts) => authClient.signIn.sigma(opts)}
 *       showProviders
 *     />
 *   )
 * }
 * ```
 */
export function BitcoinSignin({
  clientId,
  callbackUrl,
  signIn,
  showProviders = false,
  providers = ["github", "google"],
  variant = "default",
  size = "md",
  className,
  onError,
}: BitcoinSigninProps) {
  const hook = useBitcoinSignin({
    clientId,
    callbackUrl,
    signIn,
    onError,
  })

  return (
    <BitcoinSigninUI
      className={className}
      variant={variant}
      size={size}
      isLoading={hook.isLoading}
      error={hook.error}
      showProviders={showProviders}
      providers={providers}
      onSignIn={hook.loginWithSigma}
      onProviderSignIn={hook.loginWithProvider}
    />
  )
}
