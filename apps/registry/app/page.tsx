import * as React from "react"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">BigBlocks Registry</h1>
        <p className="text-muted-foreground">
          Production-ready Bitcoin UI components for React applications.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Available Components</h2>
          
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Step Indicator</h3>
            <p className="text-muted-foreground mb-4">
              Display progress through multi-step processes with horizontal and vertical variants
            </p>
            <div className="flex flex-col gap-4">
              <a 
                href="/r/step-indicator.json" 
                className="text-blue-600 hover:underline"
              >
                View Registry JSON
              </a>
              <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  bunx shadcn@latest add http://localhost:3002/r/step-indicator.json
                </code>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Installation</h2>
          <p className="text-muted-foreground">
            Use the shadcn CLI to add components to your project:
          </p>
          <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              # Install a specific component
              <br />
              bunx shadcn@latest add http://localhost:3002/r/step-indicator.json
              <br />
              <br />
              # Or use the bigblocks CLI wrapper
              <br />
              npx bigblocks@latest add step-indicator --registry http://localhost:3002/r
            </code>
          </div>
        </div>
      </main>
    </div>
  )
}