import type { MetadataRoute } from "next"

const BASE_URL = "https://registry.bigblocks.dev"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      priority: 1,
    },
  ]
}
