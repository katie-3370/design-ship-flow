import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RatingCard } from "./rating-card";

const meta = {
  title: "Components/RatingCard",
  component: RatingCard,
  args: {
    elevation: "surface",
    rating: 3.5,
    date: "2026-01-01",
    quote: "Great work. Would die without this new workflow. Thanks Claude!",
    name: "Katie Proulx",
    title: "Senior Product Designer",
  },
  argTypes: {
    elevation: { control: "inline-radio", options: ["surface", "raised"] },
    rating: { control: { type: "range", min: 0, max: 5, step: 0.5 } },
  },
  decorators: [(Story) => <div className="w-104">{Story()}</div>],
} satisfies Meta<typeof RatingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = {};
export const Raised: Story = { args: { elevation: "raised" } };
export const FiveStars: Story = { args: { rating: 5 } };
export const LongQuote: Story = {
  args: {
    quote:
      "We used to lose a week between the final frame and a merged PR. Now the designer opens the pull request herself, reviews the stories in Chromatic, and the tokens keep everyone honest.",
  },
};
