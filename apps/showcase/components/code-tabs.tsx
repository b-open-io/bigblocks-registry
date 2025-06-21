"use client"

import * as React from "react"
import { Tabs } from "@/components/ui/tabs"

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [installationType, setInstallationType] = React.useState<"cli" | "manual">("cli")

  return (
    <Tabs
      value={installationType}
      onValueChange={(value) => setInstallationType(value as "cli" | "manual")}
      className="relative mt-6 w-full"
    >
      {children}
    </Tabs>
  )
}