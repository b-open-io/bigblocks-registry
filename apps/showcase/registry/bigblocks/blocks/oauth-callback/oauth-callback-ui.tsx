"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { OAuthCallbackStatus, OAuthCallbackUser } from "./use-oauth-callback"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OAuthCallbackUIProps {
  /** Current callback processing status */
  status: OAuthCallbackStatus
  /** Authenticated user data (when status is "success") */
  user: OAuthCallbackUser | null
  /** Error message (when status is "error") */
  errorMessage: string | null
  /** Where the user will be redirected after success */
  redirectUrl: string
  /** Handler for the retry button */
  onRetry: () => void
  /** Additional CSS classes */
  className?: string
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function LoadingState() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
          <svg
            className="size-6 animate-spin text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <CardTitle>Completing sign in</CardTitle>
        <CardDescription>
          Please wait while we verify your authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="mx-auto h-4 w-3/4" />
        <Skeleton className="mx-auto h-4 w-1/2" />
      </CardContent>
    </Card>
  )
}

interface SuccessStateProps {
  user: OAuthCallbackUser
  redirectUrl: string
}

function SuccessState({ user, redirectUrl }: SuccessStateProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.id.slice(0, 2).toUpperCase()

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
          <svg
            className="size-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <CardTitle>Sign in successful</CardTitle>
        <CardDescription>
          You have been authenticated successfully.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <Avatar className="size-14">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name ?? "User avatar"}
              className="size-full rounded-full object-cover"
            />
          ) : (
            <AvatarFallback className="text-sm font-medium">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        {user.name && (
          <p className="text-sm font-medium">{user.name}</p>
        )}
        {user.pubkey && (
          <p className="max-w-full truncate text-xs font-mono text-muted-foreground">
            {user.pubkey}
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Redirecting to{" "}
          <span className="font-medium text-foreground">{redirectUrl}</span>
          &hellip;
        </p>
      </CardFooter>
    </Card>
  )
}

interface ErrorStateProps {
  errorMessage: string
  onRetry: () => void
}

function ErrorState({ errorMessage, onRetry }: ErrorStateProps) {
  return (
    <Card className="w-full max-w-sm border-destructive/50">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <svg
            className="size-6 text-destructive"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <CardTitle className="text-destructive">
          Authentication failed
        </CardTitle>
        <CardDescription>{errorMessage}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </CardFooter>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Main UI component
// ---------------------------------------------------------------------------

/**
 * Pure presentational component for the OAuth callback page.
 *
 * Displays loading, success, or error states based on the `status` prop.
 * All logic is managed by the companion `useOAuthCallback` hook.
 */
export function OAuthCallbackUI({
  status,
  user,
  errorMessage,
  redirectUrl,
  onRetry,
  className,
}: OAuthCallbackUIProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] items-center justify-center p-4",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      {status === "loading" && <LoadingState />}
      {status === "success" && user && (
        <SuccessState user={user} redirectUrl={redirectUrl} />
      )}
      {status === "error" && errorMessage && (
        <ErrorState errorMessage={errorMessage} onRetry={onRetry} />
      )}
    </div>
  )
}
