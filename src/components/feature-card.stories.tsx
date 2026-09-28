import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PenTool } from "lucide-react";

import { FeatureCard } from "./feature-card";

const meta = {
  title: "Components/FeatureCard",
  component: FeatureCard,
  args: {
    icon: PenTool,
    title: "Design in Figma",
    description: "Lay out components with library parts. Figma stays the sandbox.",
  },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
} satisfies Meta<typeof FeatureCard>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
