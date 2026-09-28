import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Field } from "./field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const meta = {
  title: "Primitives/Select",
  decorators: [(Story) => <div className="w-80">{Story()}</div>],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const languages = [
  ["en", "English"],
  ["fr", "French"],
  ["hr", "Croatian"],
  ["de", "German"],
  ["ja", "Japanese"],
] as const;

function LanguageSelect(props: { defaultValue?: string; disabled?: boolean; open?: boolean }) {
  return (
    <Select {...props}>
      <SelectTrigger aria-label="Language">
        <SelectValue placeholder="Choose a language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map(([value, label]) => (
          <SelectItem key={value} value={value} disabled={value === "ja"}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const Placeholder: Story = { render: () => <LanguageSelect /> };
export const Selected: Story = { render: () => <LanguageSelect defaultValue="hr" /> };
export const Disabled: Story = { render: () => <LanguageSelect disabled /> };
export const Open: Story = {
  render: () => (
    <div className="h-72">
      <LanguageSelect defaultValue="en" open />
    </div>
  ),
};

export const InField: Story = {
  name: "In a Field",
  render: () => (
    <Field label="Output language" hint="You can change this per project.">
      <SelectTrigger>
        <SelectValue placeholder="Choose a language" />
      </SelectTrigger>
    </Field>
  ),
  decorators: [
    (Story) => (
      <Select defaultValue="en">
        {Story()}
        <SelectContent>
          {languages.map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  ],
};
