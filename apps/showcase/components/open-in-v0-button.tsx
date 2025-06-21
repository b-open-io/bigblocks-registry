"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RegistryItem {
  title?: string
  description?: string
  name: string
  type: string
}

export function OpenInV0Button({
  name,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  name: string
}) {
  const [registryItem, setRegistryItem] = useState<RegistryItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL
  
  if (!registryUrl) {
    console.error('NEXT_PUBLIC_REGISTRY_URL environment variable is required')
    return null
  }

  useEffect(() => {
    const fetchRegistryItem = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${registryUrl}/r/${name}.json`)
        if (!response.ok) throw new Error('Failed to fetch registry item')
        const item: RegistryItem = await response.json()
        setRegistryItem(item)
      } catch (error) {
        console.error('Failed to fetch registry item metadata:', error)
        // Fallback to basic metadata
        setRegistryItem({
          name,
          title: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: `${name} component from BigBlocks registry`,
          type: 'registry:ui'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRegistryItem()
  }, [name, registryUrl])

  if (isLoading || !registryItem) {
    return (
      <Button
        aria-label="Open in v0"
        size="sm"
        disabled
        className={cn(
          "shadow-none bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:text-black opacity-50",
          className
        )}
      >
        Loading...
      </Button>
    )
  }

  const title = encodeURIComponent(registryItem.title || registryItem.name)
  const prompt = encodeURIComponent(registryItem.description || `${registryItem.name} component`)
  const url = encodeURIComponent(`${registryUrl}/r/${name}.json`)
  
  const v0Url = `https://v0.dev/chat/api/open?title=${title}&prompt=${prompt}&url=${url}`

  return (
    <Button
      aria-label="Open in v0"
      size="sm"
      className={cn(
        "shadow-none bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:text-black",
        className
      )}
      asChild
    >
      <a
        href={v0Url}
        target="_blank"
        rel="noreferrer"
      >
        Open in{" "}
        <svg
          viewBox="0 0 40 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-current"
        >
          <path
            d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
            fill="currentColor"
          ></path>
          <path
            d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
            fill="currentColor"
          ></path>
        </svg>
      </a>
    </Button>
  )
}
