import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Switch } from "./switch";

const meta = {
  title: "Primitives/Switch",
  component: Switch,
  args: { "aria-label": "Toggle" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const SettingsRow: Story = {
  args: {
    label: "Preview deploys",
    description: "Build every pull request to its own URL.",
    defaultChecked: true,
  },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
};
