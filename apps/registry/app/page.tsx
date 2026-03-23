import { getAllRegistryItems } from "@/lib/registry-config"

const REGISTRY_URL = "https://registry.bigblocks.dev/r"

const CATEGORY_ORDER = [
  "authentication",
  "wallet",
  "social",
  "market",
  "identity",
  "developer",
  "ui-components",
]

function categoryLabel(cat: string): string {
  if (cat === "ui-components") return "UI"
  return cat.charAt(0).toUpperCase() + cat.slice(1)
}

export default function Home() {
  const items = getAllRegistryItems().filter(
    (i) => !i.name.endsWith("-demo") && i.type !== "registry:example",
  )

  // Group by category
  const grouped = new Map<string, typeof items>()
  for (const item of items) {
    const cat = item.categories?.[0] ?? "other"
    const list = grouped.get(cat) ?? []
    list.push(item)
    grouped.set(cat, list)
  }

  const sortedCategories = [...grouped.keys()].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b),
  )

  return (
    <div className="max-w-4xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">BigBlocks Registry</h1>
        <p className="text-muted-foreground">
          {items.length} production-ready Bitcoin UI blocks for shadcn projects.
        </p>
        <div className="flex gap-3 text-sm">
          <a
            href="https://bigblocks.dev"
            className="text-primary hover:underline"
          >
            Docs
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="https://www.npmjs.com/package/bigblocks"
            className="text-primary hover:underline"
          >
            npm
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="https://github.com/b-open-io/bigblocks-registry"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
        </div>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Install</h2>
        <pre className="rounded-lg border bg-muted p-4 text-sm overflow-x-auto">
          <code>npx bigblocks add connect-wallet</code>
        </pre>
        <p className="text-xs text-muted-foreground">
          Or use shadcn directly:{" "}
          <code className="text-xs">
            bunx shadcn@latest add {REGISTRY_URL}/connect-wallet.json
          </code>
        </p>
      </section>

      <main className="flex flex-col gap-6">
        {sortedCategories.map((cat) => (
          <section key={cat} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold border-b pb-1">
              {categoryLabel(cat)}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {grouped.get(cat)?.map((item) => (
                <a
                  key={item.name}
                  href={`/r/${item.name}.json`}
                  className="group flex flex-col gap-1 rounded-lg border p-4 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium group-hover:text-accent-foreground">
                      {item.title}
                    </span>
                    <code className="text-xs text-muted-foreground">
                      {item.name}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t pt-4 text-xs text-muted-foreground">
        <a href="/r" className="hover:underline">
          API: /r
        </a>
        {" | "}
        <a href="/r/index.json" className="hover:underline">
          /r/index.json
        </a>
      </footer>
    </div>
  )
}
