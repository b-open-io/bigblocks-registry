import { NextResponse } from "next/server"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { getRegistryItem } from "@/lib/registry-config"
import { hydrateRegistryItem } from "@/lib/registry-gateway"

/**
 * Dynamic route serving individual registry items as shadcn-compatible JSON.
 *
 * GET /r/connect-wallet.json → hydrated registry-item JSON with embedded source
 *
 * Resolution:
 * 1. Look up item in registry.json via registry-config
 * 2. Hydrate by reading source files and embedding content
 * 3. Fall back to pre-built static JSON in /public/r/
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name: rawName } = await params
  const name = rawName.replace(/\.json$/, "")

  // 1. Try dynamic hydration from registry.json
  const item = getRegistryItem(name)

  if (item) {
    try {
      const hydrated = await hydrateRegistryItem(item)
      return NextResponse.json(hydrated, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to hydrate registry item"
      return NextResponse.json({ error: message, name }, { status: 500 })
    }
  }

  // 2. Fall back to static JSON in /public/r/
  try {
    const staticPath = join(process.cwd(), "public", "r", `${name}.json`)
    const content = await readFile(staticPath, "utf-8")
    const json = JSON.parse(content)
    return NextResponse.json(json, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Block not found", name },
      { status: 404 },
    )
  }
}
