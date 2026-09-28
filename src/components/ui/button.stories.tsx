import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "outline", "ghost", "danger"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete" } };
export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          <Button size={size}>Primary</Button>
          <Button size={size} variant="secondary">
            Secondary
          </Button>
          <Button size={size} variant="outline">
            Outline
          </Button>
          <Button size={size} variant="ghost">
            Ghost
          </Button>
          <Button size={size} variant="danger">
            Danger
          </Button>
        </div>
      ))}
    </div>
  ),
};
