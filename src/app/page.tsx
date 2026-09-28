import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-24">
      <p className="text-sm font-medium text-primary">Harbor · design ship flow sandbox</p>
      <h1 className="text-4xl font-semibold tracking-tight text-text">
        Code is the source of truth. Figma is the sandbox.
      </h1>
      <p className="text-lg text-text-muted">
        This project holds a token-based component library, a few test pages, and the workflow for
        taking a component from a Figma frame to a merged pull request.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button size="lg">Primary action</Button>
        <Button size="lg" variant="outline">
          Secondary action
        </Button>
      </div>
    </main>
  );
}
