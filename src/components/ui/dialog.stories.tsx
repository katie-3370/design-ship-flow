import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "./dialog";
import { Field } from "./field";
import { Input } from "./input";

const meta = {
  title: "Primitives/Dialog",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function InviteDialog({ open }: { open?: boolean }) {
  return (
    <Dialog defaultOpen={open}>
      <DialogTrigger asChild>
        <Button>Invite teammates</Button>
      </DialogTrigger>
      <DialogContent
        title="Invite teammates"
        description="They'll get access to this workspace and its components."
      >
        <Field label="Email">
          <Input type="email" placeholder="name@company.com" />
        </Field>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Send invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const Closed: Story = { render: () => <InviteDialog /> };
export const Open: Story = {
  render: () => <InviteDialog open />,
  parameters: { layout: "fullscreen" },
};

export const Destructive: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="danger">Delete component</Button>
      </DialogTrigger>
      <DialogContent
        title="Delete PricingCard?"
        description="It's used on 2 pages. This can't be undone."
      >
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: { layout: "fullscreen" },
};
