import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "./checkbox";

const meta = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  args: { "aria-label": "Accept" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

export const WithLabel: Story = {
  args: {
    label: "Email me product updates",
    description: "About one email a month. Unsubscribe any time.",
    defaultChecked: true,
  },
};

export const Group: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-medium">Notify me about</legend>
      <Checkbox label="New comments" defaultChecked />
      <Checkbox label="Pull requests ready for review" defaultChecked />
      <Checkbox label="Weekly digest" />
    </fieldset>
  ),
};
