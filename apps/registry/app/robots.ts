import type { MetadataRoute } from "next"

const BASE_URL = "https://registry.bigblocks.dev"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/r/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
