"use client"

import {
  ReceiveAddressUI,
} from "@/registry/bigblocks/blocks/receive-address"

const SAMPLE_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"

export default function ReceiveAddressCompactDemo() {
  return (
    <div className="flex justify-center">
      <ReceiveAddressUI
        address={SAMPLE_ADDRESS}
        variant="compact"
        qrSize={120}
        copied={false}
        isRotating={false}
        rotateError={null}
        canRotate={false}
        onCopy={() => console.log("Copied:", SAMPLE_ADDRESS)}
        onRotate={() => {}}
      />
    </div>
  )
}
