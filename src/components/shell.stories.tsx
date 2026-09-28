import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AppShell } from "./app-shell";
import { EmptyState } from "./empty-state";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { LayoutGrid } from "lucide-react";

const meta = {
  title: "Components/Shells",
  parameters: { layout: "fullscreen", nextjs: { appDirectory: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MarketingHeader: Story = { render: () => <SiteHeader /> };
export const MarketingFooter: Story = { render: () => <SiteFooter /> };
export const ProductShell: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: "/dashboard" } } },
  render: () => (
    <AppShell>
      <EmptyState icon={LayoutGrid} title="Page content" description="Pages render in here." />
    </AppShell>
  ),
};
