"use client"

import { useCallback, useEffect, useRef } from "react"
import {
  AlertCircle,
  CheckCircle2,
  CloudUpload,
  KeyRound,
  Loader2,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { UseCloudBackupReturn } from "./use-cloud-backup"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CloudBackupPromptUiProps {
  /** Whether the dialog is open */
  open: boolean
  /** Called when the dialog open state changes */
  onOpenChange: (open: boolean) => void
  /** Hook return values */
  hook: UseCloudBackupReturn
  /** Called when "Remind Me Later" is clicked */
  onRemindLater?: () => void
  /** Minimum password length for helper text */
  minPasswordLength: number
  /** Optional CSS class for the dialog content */
  className?: string
}

// ---------------------------------------------------------------------------
// Strength bar
// ---------------------------------------------------------------------------

const STRENGTH_COLORS: Record<number, string> = {
  0: "bg-muted",
  1: "bg-destructive",
  2: "bg-destructive/60",
  3: "bg-primary/60",
  4: "bg-primary",
}

interface StrengthBarProps {
  strength: number
  label: string
}

function StrengthBar({ strength, label }: StrengthBarProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {([1, 2, 3, 4] as const).map((level) => (
          <div
            key={level}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-200",
              strength >= level
                ? STRENGTH_COLORS[strength]
                : "bg-muted",
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      {label && (
        <p className="text-xs text-muted-foreground">{label}</p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main UI
// ---------------------------------------------------------------------------

export function CloudBackupPromptUi({
  open,
  onOpenChange,
  hook,
  onRemindLater,
  minPasswordLength,
  className,
}: CloudBackupPromptUiProps) {
  const passwordRef = useRef<HTMLInputElement>(null)

  // Auto-focus password field when dialog opens
  useEffect(() => {
    if (open && hook.status === "idle") {
      // Small delay to let the dialog animate in
      const timer = setTimeout(() => {
        passwordRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [open, hook.status])

  const handleRemindLater = useCallback(() => {
    onRemindLater?.()
    onOpenChange(false)
  }, [onRemindLater, onOpenChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && hook.validation.isValid) {
        e.preventDefault()
        void hook.save()
      }
    },
    [hook],
  )

  const isBusy = hook.status === "saving"

  // ---- Success state ----
  if (hook.status === "success") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("sm:max-w-md", className)}>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2
                className="size-8 text-primary"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-lg font-semibold">Backup Enabled</p>
              <p className="text-sm text-muted-foreground">
                Your wallet is now protected with encrypted cloud backup.
                You can restore it from any device.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // ---- Idle / saving / error state ----
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <CloudUpload className="size-6 text-primary" aria-hidden="true" />
            </div>
            <DialogTitle className="text-xl">
              Secure Your Wallet
            </DialogTitle>
          </div>
          <DialogDescription className="text-left">
            Create an encryption password to protect your wallet backup
            in the cloud. You will need this password to restore your
            wallet on another device.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Features */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <ShieldCheck
                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium">End-to-end encrypted</p>
                <p className="text-xs text-muted-foreground">
                  Your backup is encrypted locally. We never see your
                  private keys.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <KeyRound
                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium">Password-protected</p>
                <p className="text-xs text-muted-foreground">
                  Only you can decrypt your backup with your chosen
                  password.
                </p>
              </div>
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <Label htmlFor="cloud-backup-password">Password</Label>
            <Input
              ref={passwordRef}
              id="cloud-backup-password"
              type="password"
              placeholder={`At least ${minPasswordLength} characters`}
              value={hook.password}
              onChange={(e) => hook.setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isBusy}
              autoComplete="new-password"
            />
            {hook.password.length > 0 && (
              <StrengthBar
                strength={hook.validation.strength}
                label={hook.validation.strengthLabel}
              />
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <Label htmlFor="cloud-backup-confirm">Confirm Password</Label>
            <Input
              id="cloud-backup-confirm"
              type="password"
              placeholder="Re-enter your password"
              value={hook.confirmPassword}
              onChange={(e) => hook.setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isBusy}
              autoComplete="new-password"
            />
            {hook.confirmPassword.length > 0 &&
              !hook.validation.matchesConfirmation && (
                <p className="text-xs text-destructive">
                  Passwords do not match
                </p>
              )}
          </div>

          {/* Error */}
          {hook.error && (
            <div className="flex items-start gap-3 rounded-md border border-destructive/20 bg-destructive/5 p-3">
              <AlertCircle className="mt-0.5 size-4 flex-shrink-0 text-destructive" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Backup failed</p>
                <p className="text-xs text-muted-foreground">
                  {hook.error.message}
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
          <Button
            variant="outline"
            disabled={isBusy}
            onClick={handleRemindLater}
          >
            Remind Me Later
          </Button>
          <Button
            disabled={isBusy || !hook.validation.isValid}
            onClick={() => {
              void hook.save()
            }}
            aria-busy={isBusy}
          >
            {isBusy ? (
              <>
                <Loader2
                  className="animate-spin"
                  data-icon="inline-start"
                  aria-hidden="true"
                />
                Encrypting...
              </>
            ) : (
              "Enable Backup"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
