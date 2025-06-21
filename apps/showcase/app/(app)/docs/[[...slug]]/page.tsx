import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"
import { source } from "@/lib/source"

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const page = source.getPage(slug)
  
  if (!page) {
    notFound()
  }

  const doc = page.data
  // @ts-expect-error - revisit fumadocs types.
  const MDX = doc.body

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <MDX components={mdxComponents} />
    </div>
  )
}