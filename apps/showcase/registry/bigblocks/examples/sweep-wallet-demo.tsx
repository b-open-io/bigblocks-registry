"use client"

import {
  SweepWallet,
  type ScanResult,
  type SweepResult,
} from "@/registry/bigblocks/blocks/sweep-wallet"

export default function SweepWalletDemo() {
  async function handleScan(wif: string): Promise<ScanResult> {
    // In a real application, use @1sat/actions:
    //
    // import { PrivateKey } from "@bsv/sdk"
    // import { scanAddressUtxos } from "@1sat/actions"
    //
    // const pk = PrivateKey.fromWif(wif)
    // const address = pk.toPublicKey().toAddress()
    // return await scanAddressUtxos(services, address)

    // Demo: simulate a 1.5-second scan returning sample assets
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      funding: [
        { outpoint: "abc123_0", satoshis: 50000 },
        { outpoint: "def456_1", satoshis: 25000 },
      ],
      ordinals: [{ outpoint: "ord789_0" }, { outpoint: "ord012_0" }],
      tokens: [
        { tokenId: "tok345_0", symbol: "GOLD", amount: "1000000" },
      ],
      totalSats: 75000,
    }
  }

  async function handleSweep(
    _wif: string,
    _assets: ScanResult,
  ): Promise<SweepResult> {
    // In a real application, use @1sat/actions:
    //
    // import { sweepBsv, prepareSweepInputs } from "@1sat/actions"
    //
    // const inputs = await prepareSweepInputs(ctx, assets.funding)
    // return await sweepBsv.execute(ctx, { inputs, wif })

    // Demo: simulate a 2-second sweep
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return {
      txid: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    }
  }

  return (
    <div className="flex justify-center">
      <SweepWallet
        onScan={handleScan}
        onSweep={handleSweep}
        onSuccess={(result) => console.log("Sweep success:", result)}
        onError={(error) => console.error("Sweep error:", error)}
      />
    </div>
  )
}
