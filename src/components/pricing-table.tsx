"use client";

import { useState } from "react";

import { Grid, Stack } from "@/components/layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";

import { PricingCard, type PricingCardProps } from "./pricing-card";

type Billing = "monthly" | "yearly";

const plans: (Omit<PricingCardProps, "price"> & { price: Record<Billing, string> })[] = [
  {
    name: "Starter",
    price: { monthly: "$0", yearly: "$0" },
    description: "For trying the workflow on a side project.",
    features: ["1 project", "Component library + Storybook", "Community support"],
    cta: "Start free",
  },
  {
    name: "Studio",
    price: { monthly: "$24", yearly: "$19" },
    description: "For designers shipping to production every week.",
    features: [
      "Unlimited projects",
      "Figma to pull request workflow",
      "Preview deploy per PR",
      "Visual regression checks",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Agency",
    price: { monthly: "$79", yearly: "$64" },
    description: "For teams running several client design systems.",
    features: ["Everything in Studio", "Shared token libraries", "SSO and audit log"],
    cta: "Contact sales",
  },
];

/** PricingTable: billing toggle + three PricingCards. */
export function PricingTable() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <Stack gap={10} align="center">
      <Tabs value={billing} onValueChange={(v) => setBilling(v as Billing)}>
        <TabsList aria-label="Billing period">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly · save 20%</TabsTrigger>
        </TabsList>
      </Tabs>
      <Grid cols={3} gap={4} className="w-full">
        {plans.map((p) => (
          <PricingCard key={p.name} {...p} price={p.price[billing]} />
        ))}
      </Grid>
    </Stack>
  );
}
