import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import { pageSchema, metaSchema } from "fumadocs-core/source/schema"
import rehypePrettyCode from "rehype-pretty-code"
import { transformers } from "@/lib/transformers"

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift()
      plugins.push([
        rehypePrettyCode as never,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
          transformers,
        },
      ])
      return plugins
    },
  },
})
