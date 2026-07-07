import type { MetadataRoute } from "next"

import { source } from "@/lib/source"

const BASE_URL = "https://showcase.bigblocks.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      priority: 1,
    },
    ...source.getPages().map((page) => ({
      url: `${BASE_URL}${page.url}`,
      priority: 0.8,
    })),
  ]
}
