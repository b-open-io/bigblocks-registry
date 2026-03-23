"use client"

import { useState } from "react"
import {
  ReceiveAddressUI,
} from "@/registry/bigblocks/blocks/receive-address"

const SAMPLE_ADDRESSES = [
  "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
  "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
  "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
]

export default function ReceiveAddressDemo() {
  const [addressIndex, setAddressIndex] = useState(0)
  const address = SAMPLE_ADDRESSES[addressIndex]

  return (
    <div className="mx-auto w-full max-w-sm">
      <ReceiveAddressUI
        address={address}
        variant="default"
        qrSize={200}
        copied={false}
        isRotating={false}
        rotateError={null}
        canRotate={true}
        onCopy={() => console.log("Copied:", address)}
        onRotate={() => {
          setAddressIndex((i) => (i + 1) % SAMPLE_ADDRESSES.length)
        }}
      />
    </div>
  )
}
