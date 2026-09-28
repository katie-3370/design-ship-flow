import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatCard } from "./stat-card";

const meta = {
  title: "Components/StatCard",
  component: StatCard,
  args: { label: "PRs merged this month", value: "18", delta: "+12%" },
  decorators: [(Story) => <div className="w-72">{Story()}</div>],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GoodIncrease: Story = {};
export const GoodDecrease: Story = {
  name: "Good decrease (review time went down)",
  args: { label: "Avg. review time", value: "3.2h", delta: "-8%" },
};
export const BadIncrease: Story = {
  args: { label: "Failed checks", value: "2", delta: "+1", sentiment: "bad" },
};
export const NoDelta: Story = { args: { delta: undefined } };
