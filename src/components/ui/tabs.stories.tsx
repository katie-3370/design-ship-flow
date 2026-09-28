import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Primitives/Tabs",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="design" className="w-96">
      <TabsList>
        <TabsTrigger value="design">Design</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="review">Review</TabsTrigger>
      </TabsList>
      <TabsContent value="design" className="text-sm text-text-muted">
        Lay out the component in Figma using library parts.
      </TabsContent>
      <TabsContent value="code" className="text-sm text-text-muted">
        Claude builds it from the existing primitives and tokens.
      </TabsContent>
      <TabsContent value="review" className="text-sm text-text-muted">
        Review the preview, leave comments, merge.
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="agents" className="w-160">
      <TabsList className="flex w-full">
        <TabsTrigger value="creative">Creative</TabsTrigger>
        <TabsTrigger value="agents">Agents</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="monthly">
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
        <TabsTrigger value="lifetime" disabled>
          Lifetime
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};
