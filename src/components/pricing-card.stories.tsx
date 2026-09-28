import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PricingCard } from "./pricing-card";
import { PricingTable } from "./pricing-table";

const meta = {
  title: "Components/PricingCard",
  component: PricingCard,
  args: {
    name: "Studio",
    price: "$24",
    description: "For designers shipping to production every week.",
    features: ["Unlimited projects", "Figma to pull request workflow", "Preview deploy per PR"],
    cta: "Start 14-day trial",
  },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
} satisfies Meta<typeof PricingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Featured: Story = { args: { featured: true } };
export const Table: Story = {
  name: "PricingTable (with billing toggle)",
  render: () => <PricingTable />,
  decorators: [(Story) => <div className="w-5xl">{Story()}</div>],
  parameters: { layout: "padded" },
};
