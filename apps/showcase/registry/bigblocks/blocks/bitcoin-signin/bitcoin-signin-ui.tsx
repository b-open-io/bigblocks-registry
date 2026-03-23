"use client"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Github, Loader2 } from "lucide-react"
import type { OAuthProvider } from "./use-bitcoin-signin"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BitcoinSigninUIProps {
  /** Additional CSS classes */
  className?: string
  /** Visual style variant */
  variant?: "default" | "outline" | "ghost"
  /** Size variant */
  size?: "sm" | "md" | "lg"
  /** Whether a sign-in request is in progress */
  isLoading: boolean
  /** Error to display */
  error: Error | null
  /** Show OAuth provider buttons for account restore */
  showProviders: boolean
  /** Which OAuth providers to show */
  providers: OAuthProvider[]
  /** Handle Bitcoin sign-in click */
  onSignIn: () => void
  /** Handle OAuth provider sign-in click */
  onProviderSignIn: (provider: OAuthProvider) => void
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
} as const

/** Bitcoin sigma symbol used as the brand icon */
function SigmaIcon({ className }: { className?: string }) {
  return (
    <span className={cn("font-semibold leading-none", className)} aria-hidden="true">
      σ
    </span>
  )
}

/** Google "G" icon */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
        fill="#EA4335"
      />
    </svg>
  )
}

/** Map provider to icon and label */
function providerConfig(provider: OAuthProvider): {
  icon: React.ReactNode
  label: string
} {
  switch (provider) {
    case "github":
      return {
        icon: <Github className="size-4" />,
        label: "Continue with GitHub",
      }
    case "google":
      return {
        icon: <GoogleIcon className="size-4" />,
        label: "Continue with Google",
      }
  }
}

// ---------------------------------------------------------------------------
// UI Component
// ---------------------------------------------------------------------------

/**
 * Pure UI component for Bitcoin sign-in via Sigma Identity.
 *
 * Renders a primary "Sign in with Bitcoin" button and optionally
 * OAuth provider buttons for account restore/linking.
 */
export function BitcoinSigninUI({
  className,
  variant = "default",
  size = "md",
  isLoading,
  error,
  showProviders,
  providers,
  onSignIn,
  onProviderSignIn,
}: BitcoinSigninUIProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Primary Bitcoin sign-in button */}
      <Button
        variant={variant}
        className={cn(sizeClasses[size], "gap-2")}
        disabled={isLoading}
        onClick={onSignIn}
        aria-busy={isLoading}
        aria-label="Sign in with Bitcoin"
      >
        {isLoading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <SigmaIcon className="text-base" />
        )}
        {isLoading ? "Signing in\u2026" : "Sign in with Bitcoin"}
      </Button>

      {/* OAuth provider buttons for account restore */}
      {showProviders && providers.length > 0 && (
        <>
          <div className="relative flex items-center gap-2">
            <div className="flex-1 border-t border-border" />
            <span className="text-xs text-muted-foreground">or restore with</span>
            <div className="flex-1 border-t border-border" />
          </div>
          <div className="flex flex-col gap-2">
            {providers.map((provider) => {
              const config = providerConfig(provider)
              return (
                <Button
                  key={provider}
                  variant="outline"
                  className={cn(sizeClasses[size], "gap-2")}
                  disabled={isLoading}
                  onClick={() => onProviderSignIn(provider)}
                  aria-label={config.label}
                >
                  {config.icon}
                  {config.label}
                </Button>
              )
            })}
          </div>
        </>
      )}

      {/* Error display */}
      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertCircle className="size-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
