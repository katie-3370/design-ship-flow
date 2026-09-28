import type { Metadata } from "next";
import type { ReactNode } from "react";

import { fontMono, fontSans } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harbor — design ship flow sandbox",
  description:
    "Test project for a designer-to-code workflow where code is the component source of truth.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${fontSans.variable} ${fontMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
