"use client"

import { ConnectWallet } from "@/registry/new-york/blocks/connect-wallet"
import { WalletProvider, ConnectDialogProvider } from "@1sat/react"

export default function ConnectWalletDemo() {
  return (
    <WalletProvider>
      <ConnectDialogProvider>
        <div className="flex flex-col items-start gap-6">
          {/* Default variant */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Default</p>
            <ConnectWallet variant="default" />
          </div>

          {/* Compact variant */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Compact</p>
            <ConnectWallet variant="compact" />
          </div>

          {/* Outline variant */}
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Outline</p>
            <ConnectWallet variant="outline" />
          </div>
        </div>
      </ConnectDialogProvider>
    </WalletProvider>
  )
}
