import Link from "next/link";

import { Container } from "@/components/layout";
import { Button } from "@/components/ui";

import { Logo } from "./logo";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

/** Marketing header: logo, section links (hidden on phones), and the two auth actions. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container size="xl" className="flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href="/dashboard">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/#pricing">Sign up</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
