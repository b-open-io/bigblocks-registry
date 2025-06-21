export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <header className="mb-10">
        <h1 className="text-5xl font-bold mb-4">BigBlocks</h1>
        <p className="text-xl text-muted-foreground">
          Production-ready Bitcoin UI components for React applications
        </p>
      </header>

      <main>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Component Showcase</h2>
          <p className="text-muted-foreground mb-8">
            Explore our collection of Bitcoin-focused React components. Each component is designed 
            to be accessible, customizable, and production-ready.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-6 hover:bg-accent transition-colors">
              <h3 className="text-xl font-semibold mb-2">Step Indicator</h3>
              <p className="text-muted-foreground mb-4">
                Display progress through multi-step processes
              </p>
              <a href="/docs/components/step-indicator" className="text-primary hover:underline">
                View Component →
              </a>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Getting Started</h2>
          <div className="bg-muted p-6 rounded-lg">
            <p className="mb-4 text-muted-foreground">Install components using the shadcn CLI:</p>
            <code className="block bg-background p-3 rounded border">
              bunx shadcn@latest add http://localhost:3002/r/step-indicator.json
            </code>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Categories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <h3 className="font-semibold mb-2">Authentication</h3>
              <p className="text-sm text-muted-foreground">Bitcoin wallet auth flows</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <h3 className="font-semibold mb-2">Social</h3>
              <p className="text-sm text-muted-foreground">Posts, likes, messaging</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <h3 className="font-semibold mb-2">Wallet</h3>
              <p className="text-sm text-muted-foreground">Send BSV, manage tokens</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-accent transition-colors">
              <h3 className="font-semibold mb-2">Market</h3>
              <p className="text-sm text-muted-foreground">NFT marketplace components</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}