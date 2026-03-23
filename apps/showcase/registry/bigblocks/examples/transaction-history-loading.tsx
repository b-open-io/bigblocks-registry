"use client"

import {
  TransactionHistoryUI,
} from "@/registry/bigblocks/blocks/transaction-history"

export default function TransactionHistoryLoadingDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <TransactionHistoryUI
        entries={[]}
        isLoading={true}
        error={null}
        skeletonCount={3}
      />
    </div>
  )
}
