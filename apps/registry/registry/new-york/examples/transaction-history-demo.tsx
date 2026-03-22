"use client"

import { useState } from "react"
import {
  TransactionHistoryUI,
  type HistoryEntry,
} from "@/registry/new-york/blocks/transaction-history"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_ENTRIES: HistoryEntry[] = [
  {
    txid: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    description: "Received from 1A1zP...DivfNa",
    satoshis: 250000,
    status: "completed",
    dateCreated: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    txid: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
    description: "Sent to 1BitcoinEaterAddress",
    satoshis: -50000,
    status: "completed",
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    txid: "c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
    description: "NFT inscription",
    satoshis: -1500,
    status: "unproven",
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    txid: "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
    description: "Token transfer PEPE",
    satoshis: -100000,
    status: "sending",
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    txid: "e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6",
    description: "Ordinal purchase",
    satoshis: -500000,
    status: "failed",
    dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
]

// ---------------------------------------------------------------------------
// Demo
// ---------------------------------------------------------------------------

export default function TransactionHistoryDemo() {
  const [clicked, setClicked] = useState<string | null>(null)

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      {/* Default variant */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Default Variant
        </p>
        <TransactionHistoryUI
          entries={MOCK_ENTRIES}
          isLoading={false}
          error={null}
          hasMore={true}
          onRowClick={setClicked}
          onExternalLink={(txid) =>
            window.open(`https://whatsonchain.com/tx/${txid}`, "_blank")
          }
        />
      </div>

      {/* Clicked indicator */}
      {clicked && (
        <p className="text-sm text-muted-foreground">
          Clicked:{" "}
          <span className="font-mono text-foreground">
            {clicked.slice(0, 12)}...
          </span>
        </p>
      )}

      {/* Compact variant */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Compact Variant
        </p>
        <TransactionHistoryUI
          entries={MOCK_ENTRIES.slice(0, 3)}
          isLoading={false}
          error={null}
          variant="compact"
        />
      </div>

      {/* Loading state */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Loading State
        </p>
        <TransactionHistoryUI
          entries={[]}
          isLoading={true}
          error={null}
          skeletonCount={3}
        />
      </div>

      {/* Empty state */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Empty State
        </p>
        <TransactionHistoryUI entries={[]} isLoading={false} error={null} />
      </div>
    </div>
  )
}
