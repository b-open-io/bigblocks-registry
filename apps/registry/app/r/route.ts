import { NextResponse } from "next/server"
import { getAllRegistryItems } from "@/lib/registry-config"
import { buildRegistryIndex } from "@/lib/registry-gateway"

/**
 * Registry index endpoint.
 *
 * GET /r → list of all available blocks with install URLs.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  const items = getAllRegistryItems()
  const index = buildRegistryIndex(items, baseUrl)

  return NextResponse.json(index, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  })
}
