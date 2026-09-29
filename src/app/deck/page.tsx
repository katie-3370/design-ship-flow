import type { Metadata } from "next";

import { Deck } from "./deck";

export const metadata: Metadata = {
  title: "Design ships to code · Proposal",
  description:
    "How designers ship components to production through code, with Figma as the sandbox.",
  robots: { index: false },
};

export default function DeckPage() {
  return <Deck />;
}
