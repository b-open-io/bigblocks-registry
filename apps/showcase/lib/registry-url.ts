export function getRegistryUrl(): string {
  return process.env.NEXT_PUBLIC_REGISTRY_URL || "http://localhost:3002"
}

export function getComponentInstallCommand(componentName: string): string {
  const registryUrl = getRegistryUrl()
  return `npx shadcn@latest add ${registryUrl}/r/${componentName}.json`
}