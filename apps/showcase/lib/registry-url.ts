export function getRegistryUrl(): string {
  const url = process.env.NEXT_PUBLIC_REGISTRY_URL
  if (!url) {
    // During build, use localhost as fallback
    // The actual URL will be used at runtime
    return 'http://localhost:3002'
  }
  return url
}

export function getComponentInstallCommand(componentName: string): string {
  const registryUrl = getRegistryUrl()
  return `npx shadcn@latest add ${registryUrl}/r/${componentName}.json`
}