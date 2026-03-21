import { readFile } from "node:fs/promises"
import { join, isAbsolute } from "node:path"
import { getRegistryMeta } from "./registry-config"

const REGISTRY_ROOT = process.cwd()

/**
 * Read a source file from either a local relative path or an absolute path.
 */
async function readSourceFile(source: string): Promise<string> {
  const filePath = isAbsolute(source) ? source : join(REGISTRY_ROOT, source)
  return readFile(filePath, "utf-8")
}

interface RegistryJsonItem {
  name: string
  type: string
  title: string
  description: string
  author: string
  categories?: string[]
  dependencies?: string[]
  registryDependencies?: string[]
  files: { path: string; type: string; target: string }[]
}

/**
 * Hydrate a registry item from registry.json by reading all source files
 * and embedding their content inline — producing shadcn-compatible JSON.
 */
export async function hydrateRegistryItem(
  item: RegistryJsonItem,
): Promise<Record<string, unknown>> {
  const files = await Promise.all(
    item.files.map(async (file) => {
      const content = await readSourceFile(file.path)
      return {
        path: file.path,
        content,
        type: file.type,
        target: file.target ?? "",
      }
    }),
  )

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    author: item.author,
    ...(item.categories && { categories: item.categories }),
    ...(item.dependencies && { dependencies: item.dependencies }),
    ...(item.registryDependencies && {
      registryDependencies: item.registryDependencies,
    }),
    files,
  }
}

/**
 * Build the registry index — list of all available items with URLs.
 */
export function buildRegistryIndex(
  items: RegistryJsonItem[],
  baseUrl: string,
): Record<string, unknown> {
  const meta = getRegistryMeta()

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: meta.name,
    homepage: meta.homepage,
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      ...(item.categories && { categories: item.categories }),
      url: `${baseUrl}/r/${item.name}.json`,
    })),
  }
}
