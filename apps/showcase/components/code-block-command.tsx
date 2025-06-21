"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon, TerminalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getRegistryUrl } from "@/lib/registry-url"

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [packageManager, setPackageManager] = React.useState<"npm" | "yarn" | "pnpm" | "bun">("npm")
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const tabs = React.useMemo(() => {
    const registryUrl = getRegistryUrl()
    
    // Replace localhost URLs with dynamic registry URL
    const replaceUrl = (command?: string) => {
      return command?.replace("http://localhost:3002", registryUrl)
    }
    
    return {
      npm: replaceUrl(__npm__),
      yarn: replaceUrl(__yarn__),
      pnpm: replaceUrl(__pnpm__),
      bun: replaceUrl(__bun__),
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyCommand = React.useCallback(async () => {
    const command = tabs[packageManager]

    if (!command) {
      return
    }

    await navigator.clipboard.writeText(command)
    setHasCopied(true)
  }, [packageManager, tabs])

  return (
    <div className="relative">
      <Tabs
        value={packageManager}
        className="relative"
        onValueChange={(value) => {
          setPackageManager(value as "npm" | "yarn" | "pnpm" | "bun")
        }}
      >
        <div className="flex items-center gap-2 border-b px-3 py-1">
          <div className="flex size-4 items-center justify-center rounded bg-foreground/10">
            <TerminalIcon className="size-3" />
          </div>
          <TabsList className="h-auto rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key, value]) => {
              if (!value) return null
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-none border-b-2 border-transparent px-2 py-1 text-xs font-medium data-[state=active]:border-foreground"
                >
                  {key}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className="overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            if (!value) return null
            return (
              <TabsContent key={key} value={key} className="mt-0 border-0 px-4 py-3">
                <pre className="text-sm">
                  <code>{value}</code>
                </pre>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-2 top-2 h-7 w-7"
            onClick={copyCommand}
          >
            <span className="sr-only">Copy</span>
            {hasCopied ? (
              <CheckIcon className="h-3 w-3" />
            ) : (
              <ClipboardIcon className="h-3 w-3" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hasCopied ? "Copied" : "Copy to clipboard"}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}