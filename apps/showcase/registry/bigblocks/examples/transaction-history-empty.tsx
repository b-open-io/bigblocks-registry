"use client"

import {
  TransactionHistoryUI,
} from "@/registry/bigblocks/blocks/transaction-history"

export default function TransactionHistoryEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <TransactionHistoryUI entries={[]} isLoading={false} error={null} />
    </div>
  )
}
