"use client"

import {
  TransactionHistoryUI,
  type HistoryEntry,
} from "@/registry/bigblocks/blocks/transaction-history"

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
]

export default function TransactionHistoryCompactDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <TransactionHistoryUI
        entries={MOCK_ENTRIES}
        isLoading={false}
        error={null}
        variant="compact"
      />
    </div>
  )
}
