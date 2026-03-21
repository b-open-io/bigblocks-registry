/**
 * Registry configuration — reads from registry.json as single source of truth.
 *
 * The dynamic API routes use these functions to serve blocks.
 * registry.json is maintained by the build process and agents.
 */

import { readFileSync } from "node:fs"
import { join } from "node:path"

interface RegistryJsonFile {
  path: string
  type: string
  target: string
}

interface RegistryJsonItem {
  name: string
  type: string
  title: string
  description: string
  author: string
  categories?: string[]
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: RegistryJsonFile[]
}

interface RegistryJson {
  $schema: string
  name: string
  homepage: string
  items: RegistryJsonItem[]
}

let cachedRegistry: RegistryJson | null = null

/** Read and cache registry.json */
function getRegistry(): RegistryJson {
  if (cachedRegistry) return cachedRegistry

  const registryPath = join(process.cwd(), "registry.json")
  const content = readFileSync(registryPath, "utf-8")
  cachedRegistry = JSON.parse(content) as RegistryJson
  return cachedRegistry
}

/** Lookup a registry item by name */
export function getRegistryItem(name: string): RegistryJsonItem | undefined {
  return getRegistry().items.find((item) => item.name === name)
}

/** Get all registry items (excludes examples) */
export function getAllRegistryItems(): RegistryJsonItem[] {
  return getRegistry().items.filter(
    (item) => item.type !== "registry:example",
  )
}

/** Get all registry items including examples */
export function getAllRegistryItemsWithExamples(): RegistryJsonItem[] {
  return getRegistry().items
}

/** Get registry items by category */
export function getRegistryItemsByCategory(
  category: string,
): RegistryJsonItem[] {
  return getRegistry().items.filter((item) =>
    item.categories?.includes(category),
  )
}

/** Get registry metadata */
export function getRegistryMeta(): { name: string; homepage: string } {
  const reg = getRegistry()
  return { name: reg.name, homepage: reg.homepage }
}
