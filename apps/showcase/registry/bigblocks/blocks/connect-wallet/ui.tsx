"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  WalletSelector,
  type WalletSelectorProviderInfo,
} from "@1sat/react"
import {
  Wallet,
  Loader2,
  ChevronDown,
  Copy,
  Check,
  LogOut,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Variant definitions
// ---------------------------------------------------------------------------

export const connectWalletVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 text-sm",
        compact:
          "rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 size-9 p-0",
        outline:
          "rounded-md border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ConnectWalletUIProps
  extends VariantProps<typeof connectWalletVariants> {
  /** Additional CSS classes */
  className?: string
  /** Label shown on the connect button (default: "Connect Wallet") */
  connectLabel?: string
  /** Current wallet connection status */
  status: string
  /** Identity key when connected */
  identityKey: string | null
  /** Whether the provider selection dialog is open */
  dialogOpen: boolean
  /** Set the dialog open state */
  setDialogOpen: (open: boolean) => void
  /** Deterministic gradient CSS string for the identity key */
  gradient: string
  /** Truncated identity key for display */
  truncatedKey: string
  /** Handle trigger button click */
  onTriggerClick: () => void
  /** Handle disconnect */
  onDisconnect: () => void
  /** Copy identity key to clipboard */
  onCopy: () => void
  /** Whether the identity key was recently copied */
  copied: boolean
  /** Error from the wallet provider */
  error: Error | null
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface ProviderListProps {
  providers: WalletSelectorProviderInfo[]
  error: Error | null
}

function ProviderList({ providers, error }: ProviderListProps) {
  return (
    <div className="flex flex-col gap-2">
      {providers.map((provider) => (
        <Button
          key={provider.type}
          variant="outline"
          className="w-full justify-start gap-3"
          disabled={provider.isConnecting}
          onClick={() => void provider.connect()}
        >
          {provider.icon ? (
            <img
              src={provider.icon}
              alt=""
              className="size-5 rounded-sm"
              aria-hidden="true"
            />
          ) : (
            <Wallet className="size-5" aria-hidden="true" />
          )}
          <span className="flex-1 text-left">{provider.name}</span>
          {provider.isConnecting && (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          )}
          {provider.detected && !provider.isConnecting && (
            <Badge variant="secondary" className="text-[10px]">
              Detected
            </Badge>
          )}
        </Button>
      ))}
      {error && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {error.message}
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Connected dropdown
// ---------------------------------------------------------------------------

interface ConnectedDropdownProps {
  variant: "default" | "compact" | "outline" | null | undefined
  className: string | undefined
  identityKey: string
  gradient: string
  truncatedKey: string
  onDisconnect: () => void
  onCopy: () => void
  copied: boolean
}

function ConnectedDropdown({
  variant,
  className,
  identityKey,
  gradient,
  truncatedKey,
  onDisconnect,
  onCopy,
  copied,
}: ConnectedDropdownProps) {
  const isCompact = variant === "compact"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            connectWalletVariants({ variant }),
            "cursor-pointer",
            className,
          )}
          aria-label="Wallet menu"
        >
          <Avatar className="size-5">
            <AvatarFallback
              className="text-[0px]"
              style={{ background: gradient }}
            >
              {identityKey.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {!isCompact && (
            <>
              <span>{truncatedKey}</span>
              <ChevronDown className="size-3.5 opacity-50" aria-hidden="true" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">Connected</p>
          <p className="mt-0.5 break-all font-mono text-xs">{identityKey}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onCopy} className="cursor-pointer gap-2">
          {copied ? (
            <Check className="size-4 text-primary" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
          {copied ? "Copied!" : "Copy Identity Key"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDisconnect}
          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ---------------------------------------------------------------------------
// Main UI component
// ---------------------------------------------------------------------------

export function ConnectWalletUI({
  variant = "default",
  className,
  connectLabel = "Connect Wallet",
  status,
  identityKey,
  dialogOpen,
  setDialogOpen,
  gradient,
  truncatedKey,
  onTriggerClick,
  onDisconnect,
  onCopy,
  copied,
  error,
}: ConnectWalletUIProps) {
  const isCompact = variant === "compact"

  // ---- Connecting state ----
  if (status === "connecting" || status === "detecting") {
    return (
      <button
        type="button"
        disabled
        className={cn(connectWalletVariants({ variant }), className)}
        aria-busy="true"
        aria-label="Connecting wallet"
      >
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        {!isCompact && <span>Connecting&hellip;</span>}
      </button>
    )
  }

  // ---- Connected state ----
  if (status === "connected" && identityKey) {
    return (
      <ConnectedDropdown
        variant={variant}
        className={className}
        identityKey={identityKey}
        gradient={gradient}
        truncatedKey={truncatedKey}
        onDisconnect={onDisconnect}
        onCopy={onCopy}
        copied={copied}
      />
    )
  }

  // ---- Selecting state (providers dialog) ----
  if (status === "selecting") {
    return (
      <>
        <button
          type="button"
          className={cn(connectWalletVariants({ variant }), className)}
          onClick={() => setDialogOpen(true)}
          aria-label={connectLabel}
        >
          <Wallet className="size-4" aria-hidden="true" />
          {!isCompact && <span>{connectLabel}</span>}
        </button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>
                Choose a wallet provider to connect.
              </DialogDescription>
            </DialogHeader>
            <WalletSelector onClose={() => setDialogOpen(false)}>
              {(renderProps) => (
                <ProviderList
                  providers={renderProps.providers}
                  error={renderProps.error}
                />
              )}
            </WalletSelector>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // ---- Disconnected state (default) ----
  return (
    <button
      type="button"
      className={cn(connectWalletVariants({ variant }), className)}
      onClick={onTriggerClick}
      aria-label={connectLabel}
    >
      <Wallet className="size-4" aria-hidden="true" />
      {!isCompact && <span>{connectLabel}</span>}
    </button>
  )
}
