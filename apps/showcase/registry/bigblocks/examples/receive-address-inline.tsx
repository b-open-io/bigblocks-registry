"use client"

import {
  ReceiveAddressUI,
} from "@/registry/bigblocks/blocks/receive-address"

const SAMPLE_ADDRESS = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"

export default function ReceiveAddressInlineDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <ReceiveAddressUI
        address={SAMPLE_ADDRESS}
        variant="inline"
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
