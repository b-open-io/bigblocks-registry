"use client"

import {
  OpnsManagerUI,
} from "@/registry/bigblocks/blocks/opns-manager"

export default function OpnsManagerEmptyDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <OpnsManagerUI
        names={[]}
        isLoading={false}
        isOperating={false}
        error={null}
      />
    </div>
  )
}
