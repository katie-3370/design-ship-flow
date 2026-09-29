import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Rating } from "./rating";

const meta = {
  title: "Primitives/Rating",
  component: Rating,
  args: { value: 3.5, size: "sm", showValue: true },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 5, step: 0.5 } },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {};
export const Medium: Story = { args: { size: "md" } };
export const HalfStar: Story = { args: { value: 4.5, size: "md" } };
export const Zero: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 5 } };
export const WithoutValue: Story = { args: { showValue: false } };

const values = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export const AllValues: Story = {
  render: () => (
    <div className="flex gap-12">
      {(["sm", "md"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-4">
          {values.map((v) => (
            <Rating key={v} value={v} size={size} />
          ))}
        </div>
      ))}
    </div>
  ),
};
