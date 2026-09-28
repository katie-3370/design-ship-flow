import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Field } from "./field";
import { Input, Textarea } from "./input";

const meta = {
  title: "Primitives/Input",
  component: Input,
  args: { placeholder: "you@company.com" },
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: "katie@harbor.studio" } };
export const Disabled: Story = { args: { disabled: true } };
export const Invalid: Story = { args: { "aria-invalid": true, defaultValue: "katie@" } };

export const WithField: Story = {
  name: "In a Field (label + hint)",
  render: () => (
    <Field label="Work email" hint="We'll send the invite here.">
      <Input type="email" placeholder="you@company.com" />
    </Field>
  ),
};

export const FieldError: Story = {
  name: "In a Field (error)",
  render: () => (
    <Field label="Work email" error="Enter a valid email address.">
      <Input type="email" defaultValue="katie@" />
    </Field>
  ),
};

export const TextareaField: Story = {
  name: "Textarea",
  render: () => (
    <Field label="Message" hint="Up to 500 characters.">
      <Textarea placeholder="Tell us about your project" />
    </Field>
  ),
};
