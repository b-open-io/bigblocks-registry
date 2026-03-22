"use client"

import { useState } from "react"
import {
  ReceiveAddressUI,
} from "@/registry/new-york/blocks/receive-address"

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
    <div className="flex flex-col gap-8">
      {/* Default variant */}
      <div className="mx-auto w-full max-w-sm">
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Default
        </p>
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

      {/* Compact variant */}
      <div className="mx-auto">
        <p className="mb-2 text-center text-sm font-medium text-muted-foreground">
          Compact
        </p>
        <ReceiveAddressUI
          address={address}
          variant="compact"
          qrSize={120}
          copied={false}
          isRotating={false}
          rotateError={null}
          canRotate={false}
          onCopy={() => console.log("Copied:", address)}
          onRotate={() => {}}
        />
      </div>

      {/* Inline variant */}
      <div className="mx-auto w-full max-w-sm">
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Inline
        </p>
        <ReceiveAddressUI
          address={address}
          variant="inline"
          copied={false}
          isRotating={false}
          rotateError={null}
          canRotate={false}
          onCopy={() => console.log("Copied:", address)}
          onRotate={() => {}}
        />
      </div>
    </div>
  )
}
