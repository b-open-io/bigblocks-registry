export function getRegistryUrl(): string {
  const url = process.env.NEXT_PUBLIC_REGISTRY_URL
  if (!url) {
    throw new Error('NEXT_PUBLIC_REGISTRY_URL environment variable is required')
  }
  return url
}

export function getComponentInstallCommand(componentName: string): string {
  const registryUrl = getRegistryUrl()
  return `npx shadcn@latest add ${registryUrl}/r/${componentName}.json`
}