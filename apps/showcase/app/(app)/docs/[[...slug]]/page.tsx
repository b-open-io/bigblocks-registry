import Link from "next/link"
import { notFound } from "next/navigation"
import { mdxComponents } from "@/mdx-components"
import {
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react"
import { findNeighbour } from "fumadocs-core/server"

import { source } from "@/lib/source"
import { Button } from "@/components/ui/button"

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
  const neighbours = await findNeighbour(source.pageTree, page.url)

  return (
    <div className="flex items-stretch xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 md:px-6 lg:py-8">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
                  {doc.title}
                </h1>
                <div className="flex items-center gap-2 pt-1.5">
                  {neighbours.previous && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 shadow-none"
                      asChild
                    >
                      <Link href={neighbours.previous.url}>
                        <IconArrowLeft className="size-4" />
                        <span className="sr-only">Previous</span>
                      </Link>
                    </Button>
                  )}
                  {neighbours.next && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 shadow-none"
                      asChild
                    >
                      <Link href={neighbours.next.url}>
                        <span className="sr-only">Next</span>
                        <IconArrowRight className="size-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              {doc.description && (
                <p className="text-muted-foreground text-lg">
                  {doc.description}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex-1">
            <MDX components={mdxComponents} />
          </div>
        </div>
        <div className="mx-auto flex h-16 w-full max-w-4xl items-center gap-2 px-4 md:px-6">
          {neighbours.previous && (
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="shadow-none"
            >
              <Link href={neighbours.previous.url}>
                <IconArrowLeft className="mr-2 size-4" /> {neighbours.previous.name}
              </Link>
            </Button>
          )}
          {neighbours.next && (
            <Button
              variant="secondary"
              size="sm"
              className="ml-auto shadow-none"
              asChild
            >
              <Link href={neighbours.next.url}>
                {neighbours.next.name} <IconArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}