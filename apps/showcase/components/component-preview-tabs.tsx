"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OpenInV0Button } from "@/components/open-in-v0-button"

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  name,
  showV0Button = true,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: React.ReactNode
  source: React.ReactNode
  name?: string
  showV0Button?: boolean
}) {
  const [tab, setTab] = React.useState("preview")

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs
        className="relative mr-auto w-full"
        value={tab}
        onValueChange={setTab}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!hideCode && (
              <TabsList className="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
                <TabsTrigger
                  value="preview"
                  className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            )}
          </div>
          {name && showV0Button && <OpenInV0Button name={name} />}
        </div>
      </Tabs>
      <div
        data-tab={tab}
        className="data-[tab=code]:border-code relative rounded-lg border md:-mx-4"
      >
        <div
          data-slot="preview"
          data-active={tab === "preview"}
          className="invisible data-[active=true]:visible"
        >
          <div
            data-align={align}
            className={cn(
              "preview flex h-[450px] w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
            )}
          >
            {component}
          </div>
        </div>
        <div
          data-slot="code"
          data-active={tab === "code"}
          className="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:!m-0 **:[pre]:h-[450px]"
        >
          {source}
        </div>
      </div>
    </div>
  )
}
