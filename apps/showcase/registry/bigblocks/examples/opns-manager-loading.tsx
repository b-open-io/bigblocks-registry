"use client"

import {
  OpnsManagerUI,
} from "@/registry/bigblocks/blocks/opns-manager"

export default function OpnsManagerLoadingDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <OpnsManagerUI
        names={[]}
        isLoading={true}
        isOperating={false}
        error={null}
      />
    </div>
  )
}
