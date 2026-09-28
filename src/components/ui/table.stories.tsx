import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./badge";
import { Card } from "./card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

const meta = {
  title: "Primitives/Table",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  ["PricingCard", "Katie", "In review", "warning"],
  ["Testimonial", "Katie", "Merged", "success"],
  ["Button: loading state", "Claude", "Checks failed", "danger"],
] as const;

export const InCard: Story = {
  render: () => (
    <Card padding="none" className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Component</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([name, author, status, tone]) => (
            <TableRow key={name}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="text-text-muted">{author}</TableCell>
              <TableCell>
                <Badge variant={tone} dot>
                  {status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ),
};
