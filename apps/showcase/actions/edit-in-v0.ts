"use server"

import { capitalCase } from "change-case"

async function getRegistryItem(name: string) {
  const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://bigblocks-registry.vercel.app"
  const response = await fetch(`${registryUrl}/r/${name}.json`)
  
  if (!response.ok) {
    return null
  }
  
  return await response.json()
}

export async function editInV0({
  name,
  url,
}: {
  name: string
  url: string
}) {
  try {
    const registryItem = await getRegistryItem(name)

    if (!registryItem) {
      return { error: "Component not found. Please try again later." }
    }

    // If V0_EDIT_SECRET is not set, fall back to simple URL approach
    if (!process.env.V0_EDIT_SECRET) {
      const registryUrl = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://bigblocks-registry.vercel.app"
      return {
        url: `https://v0.dev/chat/api/open?url=${registryUrl}/r/${name}.json`
      }
    }

    // Generate a human-friendly project name
    const projectName = registryItem.title || capitalCase(name.replace(/^step-indicator-/, "").replace(/-/g, " "))
    
    // Replace import paths in files
    if (registryItem.files) {
      registryItem.files = registryItem.files.map((file: any) => {
        if (file.content?.includes("@/components/ui/")) {
          // The content already uses the correct imports, no need to change
        }
        return file
      })
    }

    const payload = {
      version: 2,
      payload: registryItem,
      source: {
        title: "BigBlocks",
        url,
      },
      meta: {
        project: projectName,
        file: `${name}.tsx`,
      },
    }

    const response = await fetch(`${process.env.V0_URL}/chat/api/open-in-v0`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "x-v0-edit-secret": process.env.V0_EDIT_SECRET!,
        "x-vercel-protection-bypass":
          process.env.DEPLOYMENT_PROTECTION_BYPASS || "not-set",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Unauthorized - check V0_EDIT_SECRET")
      }

      console.error("v0 API error:", response.status, response.statusText)

      throw new Error("Failed to open in v0. Please try again later.")
    }

    const result = await response.json()

    return {
      ...result,
      url: `${process.env.V0_URL}/chat/api/open-in-v0/${result.id}`,
    }
  } catch (error) {
    console.error("editInV0 error:", error)
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: "Something went wrong. Please try again later." }
  }
}