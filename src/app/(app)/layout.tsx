import type { ReactNode } from "react";

import { AppShell } from "@/components";

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
