import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

import { Container } from "./container";
import { Grid } from "./grid";
import { Section } from "./section";
import { Stack } from "./stack";

const meta = {
  title: "Layout/Layout",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Block({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-16 min-w-16 items-center justify-center rounded-sm bg-primary-subtle px-4 text-sm text-text-muted">
      {children}
    </div>
  );
}

export const StackVertical: Story = {
  name: "Stack (vertical)",
  render: () => (
    <div className="p-8">
      <Stack gap={4}>
        <Block>1</Block>
        <Block>2</Block>
        <Block>3</Block>
      </Stack>
    </div>
  ),
};

export const StackHorizontal: Story = {
  name: "Stack (horizontal, space between)",
  render: () => (
    <div className="p-8">
      <Stack direction="horizontal" gap={3} justify="between" align="center">
        <Block>Logo</Block>
        <Stack direction="horizontal" gap={2}>
          <Block>Log in</Block>
          <Block>Sign up</Block>
        </Stack>
      </Stack>
    </div>
  ),
};

export const GapScale: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      {([1, 2, 4, 6, 8, 12] as const).map((gap) => (
        <div key={gap} className="flex items-center gap-4">
          <code className="w-16 font-mono text-xs text-text-subtle">gap={gap}</code>
          <Stack direction="horizontal" gap={gap}>
            <Block />
            <Block />
            <Block />
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const ResponsiveGrid: Story = {
  name: "Grid (resize to see columns change)",
  render: () => (
    <Container className="py-8">
      <Grid cols={3}>
        {Array.from({ length: 6 }, (_, i) => (
          <Block key={i}>{i + 1}</Block>
        ))}
      </Grid>
    </Container>
  ),
};

export const Sections: Story = {
  render: () => (
    <>
      <Section tone="default" spacing="sm">
        <Container>
          <Block>Section tone=default</Block>
        </Container>
      </Section>
      <Section tone="surface" spacing="sm">
        <Container>
          <Block>Section tone=surface</Block>
        </Container>
      </Section>
      <Section tone="inverse" spacing="sm">
        <Container>
          <p className="text-sm">Section tone=inverse</p>
        </Container>
      </Section>
    </>
  ),
};
