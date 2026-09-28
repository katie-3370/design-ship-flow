import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Primitives/Card",
  component: Card,
  argTypes: {
    variant: { control: "inline-radio", options: ["surface", "raised", "outline"] },
    padding: { control: "inline-radio", options: ["none", "md", "lg"] },
  },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <>
    <CardHeader>
      <Badge variant="outline" className="self-start">
        Starter
      </Badge>
      <CardTitle>Component library</CardTitle>
      <CardDescription>Tokens, primitives and layout, reviewed in Storybook.</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button size="sm">Open</Button>
      <Button size="sm" variant="ghost">
        Details
      </Button>
    </CardFooter>
  </>
);

export const Raised: Story = { args: { children: content } };
export const Surface: Story = { args: { variant: "surface", children: content } };
export const Outline: Story = { args: { variant: "outline", children: content } };

export const OnSurface: Story = {
  name: "Raised on a surface panel",
  render: () => (
    <Card variant="surface" padding="lg">
      <CardTitle>Project</CardTitle>
      <Card>
        <CardContent>
          <CardTitle className="text-base">Nested raised card</CardTitle>
          <CardDescription>The white card lifts off the tinted panel.</CardDescription>
        </CardContent>
      </Card>
    </Card>
  ),
};
