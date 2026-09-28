import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Heading, Text } from "./typography";

const meta = {
  title: "Primitives/Typography",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const headingSizes = ["display", "xl", "lg", "md", "sm", "xs"] as const;

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {headingSizes.map((size) => (
        <div key={size} className="flex items-baseline gap-6">
          <code className="w-16 shrink-0 font-mono text-xs text-text-subtle">{size}</code>
          <Heading size={size}>Bringing ideas to life</Heading>
        </div>
      ))}
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-4">
      <Text size="lg">Large body. For intros and lead paragraphs under a heading.</Text>
      <Text>Base body. The default for paragraphs and long-form content.</Text>
      <Text size="sm" tone="muted">
        Small muted. For supporting copy, card descriptions and metadata.
      </Text>
      <Text size="xs" tone="subtle">
        Extra small subtle. For captions, timestamps and fine print.
      </Text>
      <Text size="sm" tone="danger">
        Small danger. For inline error messages.
      </Text>
    </div>
  ),
};

export const HeroPairing: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <Heading level={1} size="display">
        Code is the source of truth
      </Heading>
      <Text size="lg" tone="muted">
        Figma is the sandbox. Components ship from here, reviewed in a pull request.
      </Text>
    </div>
  ),
};
