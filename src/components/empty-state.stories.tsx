import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GitPullRequest } from "lucide-react";

import { Button } from "@/components/ui";

import { EmptyState } from "./empty-state";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  args: {
    icon: GitPullRequest,
    title: "No open pull requests",
    description: "Design a component in Figma and ask Claude to build it. It'll show up here.",
  },
  decorators: [(Story) => <div className="w-120">{Story()}</div>],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = { args: { action: <Button>New component</Button> } };
