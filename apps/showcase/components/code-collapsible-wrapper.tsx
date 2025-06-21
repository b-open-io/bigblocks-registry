"use client"

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

export function CodeCollapsibleWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Collapsible defaultOpen className={className}>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}