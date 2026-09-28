import Link from "next/link";

import { cn } from "@/lib/cn";

/** Harbor wordmark: a simple ink mark + name. Fictional brand for the sandbox. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2 text-lg font-medium tracking-tight", className)}
    >
      <span aria-hidden className="flex size-6 items-center justify-center rounded-full bg-primary">
        <span className="size-2 rounded-full bg-primary-fg" />
      </span>
      Harbor
    </Link>
  );
}
