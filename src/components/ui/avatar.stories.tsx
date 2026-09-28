import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar } from "./avatar";

const meta = {
  title: "Primitives/Avatar",
  component: Avatar,
  args: { name: "Katie Proulx" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Katie Proulx" size="sm" />
      <Avatar name="Katie Proulx" size="md" />
      <Avatar name="Katie Proulx" size="lg" />
      <Avatar name="Katie Proulx" size="xl" />
    </div>
  ),
};

export const Stack: Story = {
  name: "Overlapping group",
  render: () => (
    <div className="flex -space-x-2">
      {["Ana Horvat", "Luka Babic", "Mia Kovac", "Sam Lee"].map((n) => (
        <Avatar key={n} name={n} size="lg" className="ring-2 ring-bg" />
      ))}
    </div>
  ),
};
