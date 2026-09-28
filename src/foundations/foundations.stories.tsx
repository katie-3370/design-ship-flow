import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

import { readToken, tokenNames, utilityName } from "./token-utils";

/**
 * Live views of src/styles/tokens.css. Names are parsed from the file and values
 * are read from the page, so these pages update themselves when tokens change.
 * Use the Theme toolbar button to see dark mode.
 */
const meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Page({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg p-10 text-text">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-text-muted">{intro}</p>
      <div className="mt-10 flex flex-col gap-10">{children}</div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-medium tracking-wide text-text-subtle uppercase">{label}</h2>
      {children}
    </section>
  );
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-xs text-text-muted">{children}</code>;
}

const colorGroups: [string, (name: string) => boolean][] = [
  ["Backgrounds", (n) => /--color-(bg|surface|white|black)$|--color-surface/.test(n)],
  ["Text", (n) => n.startsWith("--color-text")],
  ["Borders & focus", (n) => /--color-(border|focus)/.test(n)],
  ["Primary", (n) => n.startsWith("--color-primary")],
  ["Secondary", (n) => n.startsWith("--color-secondary")],
  ["Accent", (n) => n.startsWith("--color-accent")],
  ["Status", (n) => /--color-(success|warning|danger)/.test(n)],
];

function Swatch({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-12 shrink-0 rounded-md border border-border shadow-sm"
        style={{ background: `var(${name})` }}
      />
      <div className="flex min-w-0 flex-col">
        <span className="text-sm font-medium">{utilityName(name, "color")}</span>
        <Code>{name}</Code>
        <Code>{readToken(name)}</Code>
      </div>
    </div>
  );
}

export const Colors: Story = {
  render: (_, { globals }) => (
    <Page
      key={globals.theme}
      title="Color"
      intro="Semantic colors. Use these in components as bg-*, text-* and border-* classes. Palette values are never used directly."
    >
      {colorGroups.map(([label, test]) => (
        <Group key={label} label={label}>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
            {tokenNames.color.filter(test).map((n) => (
              <Swatch key={n} name={n} />
            ))}
          </div>
        </Group>
      ))}
    </Page>
  ),
};

export const Palette: Story = {
  render: (_, { globals }) => (
    <Page
      key={globals.theme}
      title="Palette"
      intro="Raw values the semantic colors point to. Change a hue here and every semantic color built on it follows."
    >
      {["stone", "blue", "green", "amber", "red"].map((hue) => (
        <Group key={hue} label={hue}>
          <div className="flex flex-wrap gap-2">
            {tokenNames.palette
              .filter((n) => n.startsWith(`--palette-${hue}-`))
              .map((n) => (
                <div key={n} className="flex w-20 flex-col gap-1">
                  <div
                    className="h-14 rounded-md border border-border"
                    style={{ background: `var(${n})` }}
                  />
                  <Code>{n.replace(`--palette-${hue}-`, "")}</Code>
                </div>
              ))}
          </div>
        </Group>
      ))}
    </Page>
  ),
};

export const Typography: Story = {
  render: () => (
    <Page title="Typography" intro="Type scale. Each size carries its own line height.">
      <div className="flex flex-col gap-6">
        {tokenNames.text.map((n) => (
          <div key={n} className="flex items-baseline gap-6 border-b border-border pb-4">
            <div className="w-40 shrink-0">
              <div className="text-sm font-medium">text-{utilityName(n, "text")}</div>
              <Code>
                {readToken(n)} / {readToken(`${n}--line-height`)}
              </Code>
            </div>
            <div style={{ fontSize: `var(${n})`, lineHeight: `var(${n}--line-height)` }}>
              Ship the component, not the handoff
            </div>
          </div>
        ))}
      </div>
    </Page>
  ),
};

const spacingSteps = [1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24];

export const SpacingRadiusShadow: Story = {
  name: "Spacing, radius & shadow",
  render: (_, { globals }) => (
    <Page
      key={globals.theme}
      title="Spacing, radius & shadow"
      intro="Spacing is a 4px base unit: p-4 is 16px. Prefer even steps to stay on the 8px grid."
    >
      <Group label="Spacing">
        <div className="flex flex-col gap-2">
          {spacingSteps.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-12 text-sm font-medium">{s}</span>
              <Code>{s * 4}px</Code>
              <div className="h-3 rounded-sm bg-primary" style={{ width: s * 4 }} />
            </div>
          ))}
        </div>
      </Group>
      <Group label="Radius">
        <div className="flex flex-wrap gap-6">
          {tokenNames.radius.map((n) => (
            <div key={n} className="flex flex-col items-center gap-2">
              <div
                className="size-20 border-2 border-primary bg-primary-subtle"
                style={{ borderRadius: `var(${n})` }}
              />
              <span className="text-sm font-medium">rounded-{utilityName(n, "radius")}</span>
              <Code>{readToken(n)}</Code>
            </div>
          ))}
        </div>
      </Group>
      <Group label="Shadow">
        <div className="flex flex-wrap gap-8 bg-surface p-8">
          {tokenNames.shadow.map((n) => (
            <div key={n} className="flex flex-col items-center gap-3">
              <div
                className="size-24 rounded-lg bg-surface-raised"
                style={{ boxShadow: `var(${n})` }}
              />
              <span className="text-sm font-medium">shadow-{utilityName(n, "shadow")}</span>
            </div>
          ))}
        </div>
      </Group>
    </Page>
  ),
};
