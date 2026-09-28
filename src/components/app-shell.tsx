"use client";

import { Bell, GitPullRequest, LayoutGrid, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Avatar, Button } from "@/components/ui";
import { cn } from "@/lib/cn";

import { Logo } from "./logo";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard#pull-requests", label: "Pull requests", icon: GitPullRequest },
  { href: "/settings", label: "Settings", icon: Settings },
];

/**
 * AppShell: product chrome for signed-in pages. A sidebar on desktop, a scrolling
 * tab row on phones, and a top bar with notifications and the user.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = nav.map(({ href, label, icon: Icon }) => {
    const active = href === pathname;
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex h-9 shrink-0 items-center gap-3 rounded-full px-3 text-sm transition-colors",
          active
            ? "bg-surface-raised text-text shadow-xs"
            : "text-text-muted hover:bg-surface-sunken hover:text-text",
        )}
      >
        <Icon className="size-4" aria-hidden />
        {label}
      </Link>
    );
  });

  return (
    <div className="flex min-h-screen flex-col bg-bg md:flex-row">
      <aside className="hidden w-60 shrink-0 flex-col gap-8 border-r border-border bg-surface p-4 md:flex">
        <Logo className="px-3 pt-2" />
        <nav aria-label="App" className="flex flex-col gap-1">
          {links}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-border px-4 md:px-8">
          <Logo className="md:hidden" />
          <div className="hidden text-sm text-text-muted md:block">Harbor workspace</div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" aria-label="Notifications" className="w-8 px-0">
              <Bell />
            </Button>
            <Avatar name="Katie Proulx" />
          </div>
        </header>
        <nav
          aria-label="App"
          className="flex gap-1 overflow-x-auto border-b border-border bg-surface px-4 py-2 md:hidden"
        >
          {links}
        </nav>
        <main className="flex-1 px-4 py-8 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}
