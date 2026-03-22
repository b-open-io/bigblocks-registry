"use client"

import {
  WalletOverviewUI,
  type WalletBalance,
} from "@/registry/new-york/blocks/wallet-overview"

const MOCK_BALANCE: WalletBalance = {
  confirmed: 2_450_000,
  unconfirmed: 50_000,
  total: 2_500_000,
}

export default function WalletOverviewDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <WalletOverviewUI
        balance={MOCK_BALANCE}
        paymentAddress="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        ordinalAddress="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
        identityKey="02b4632d08485ff1df2db55b9dafd23347d1c47a457072a1e87be26896549a8737"
        isLoading={false}
        error={null}
        onSend={() => console.log("Send")}
        onReceive={() => console.log("Receive")}
        onRefresh={() => console.log("Refresh")}
      />
    </div>
  )
}
