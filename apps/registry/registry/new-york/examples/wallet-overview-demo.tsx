"use client"

import { useState } from "react"
import {
  WalletOverviewUI,
  type WalletBalance,
} from "@/registry/new-york/blocks/wallet-overview"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_BALANCE: WalletBalance = {
  confirmed: 2_450_000,
  unconfirmed: 50_000,
  total: 2_500_000,
}

const MOCK_PAYMENT_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
const MOCK_ORDINAL_ADDRESS = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
const MOCK_IDENTITY_KEY =
  "02b4632d08485ff1df2db55b9dafd23347d1c47a457072a1e87be26896549a8737"

// ---------------------------------------------------------------------------
// Demo
// ---------------------------------------------------------------------------

export default function WalletOverviewDemo() {
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      {/* Connected state */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Connected</p>
        <WalletOverviewUI
          balance={MOCK_BALANCE}
          paymentAddress={MOCK_PAYMENT_ADDRESS}
          ordinalAddress={MOCK_ORDINAL_ADDRESS}
          identityKey={MOCK_IDENTITY_KEY}
          isLoading={false}
          error={null}
          onSend={() => setLastAction("Send clicked")}
          onReceive={() => setLastAction("Receive clicked")}
          onRefresh={() => setLastAction("Refresh clicked")}
        />
      </div>

      {lastAction && (
        <p className="text-sm text-muted-foreground">
          Action:{" "}
          <span className="font-semibold text-foreground">{lastAction}</span>
        </p>
      )}

      {/* Loading state */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Loading</p>
        <WalletOverviewUI
          balance={null}
          paymentAddress={null}
          ordinalAddress={null}
          identityKey={null}
          isLoading={true}
          error={null}
        />
      </div>

      {/* Error state */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Error</p>
        <WalletOverviewUI
          balance={null}
          paymentAddress={MOCK_PAYMENT_ADDRESS}
          ordinalAddress={MOCK_ORDINAL_ADDRESS}
          identityKey={MOCK_IDENTITY_KEY}
          isLoading={false}
          error={new Error("Balance fetch failed: HTTP 503")}
          onRefresh={() => setLastAction("Retry clicked")}
        />
      </div>

      {/* Disconnected state */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          Disconnected
        </p>
        <WalletOverviewUI
          balance={null}
          paymentAddress={null}
          ordinalAddress={null}
          identityKey={null}
          isLoading={false}
          error={null}
        />
      </div>
    </div>
  )
}
