"use client"

import { getComponentInstallCommand } from "@/lib/registry-url"

export function RegistryInstallCommand({ component }: { component: string }) {
  const command = getComponentInstallCommand(component)
  
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {command}
    </code>
  )
}