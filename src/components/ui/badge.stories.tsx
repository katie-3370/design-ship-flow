import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  args: { children: "Badge" },
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "solid", "outline", "accent", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const WithDot: Story = { args: { variant: "success", dot: true, children: "Live" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Neutral</Badge>
      <Badge variant="solid">New</Badge>
      <Badge variant="outline">Beta</Badge>
      <Badge variant="accent">Docs</Badge>
      <Badge variant="success" dot>
        Merged
      </Badge>
      <Badge variant="warning" dot>
        In review
      </Badge>
      <Badge variant="danger" dot>
        Checks failed
      </Badge>
    </div>
  ),
};
