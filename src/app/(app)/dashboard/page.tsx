import { Plus, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { EmptyState, StatCard } from "@/components";
import { Grid, Stack } from "@/components/layout";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/components/ui";

export const metadata: Metadata = { title: "Dashboard · Harbor" };

const stats = [
  { label: "Components", value: "17", delta: "+3", sentiment: "good" },
  { label: "PRs merged this month", value: "12", delta: "+20%", sentiment: "good" },
  { label: "Avg. time to merge", value: "3.2h", delta: "-18%", sentiment: "good" },
  { label: "Failed checks", value: "2", delta: "+1", sentiment: "bad" },
] as const;

const pullRequests = [
  {
    id: 14,
    title: "Add PricingCard component",
    author: "Katie Proulx",
    status: "In review",
    tone: "warning",
    updated: "12 min ago",
  },
  {
    id: 13,
    title: "Button: add loading state",
    author: "Claude",
    status: "Checks failed",
    tone: "danger",
    updated: "1 h ago",
  },
  {
    id: 12,
    title: "Warm monochrome theme",
    author: "Katie Proulx",
    status: "Merged",
    tone: "success",
    updated: "Yesterday",
  },
  {
    id: 11,
    title: "Add Table and Switch primitives",
    author: "Claude",
    status: "Merged",
    tone: "success",
    updated: "2 days ago",
  },
  {
    id: 10,
    title: "Tokens: add radius-xs",
    author: "Katie Proulx",
    status: "Draft",
    tone: "neutral",
    updated: "3 days ago",
  },
] as const;

export default function DashboardPage() {
  return (
    <Stack gap={10} className="mx-auto max-w-6xl">
      <Stack direction="horizontal" justify="between" align="end" gap={4} wrap>
        <Stack gap={1}>
          <Text size="sm" tone="muted">
            Welcome back, Katie
          </Text>
          <Heading level={1} size="lg">
            Overview
          </Heading>
        </Stack>
        <Button>
          <Plus /> New component
        </Button>
      </Stack>

      <Grid cols={4} gap={4}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </Grid>

      <Card padding="none" className="overflow-hidden" id="pull-requests">
        <CardHeader className="p-6 pb-2">
          <CardTitle>Pull requests</CardTitle>
          <CardDescription>Everything moving from Figma to main.</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-6 text-right">Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pullRequests.map((pr) => (
              <TableRow key={pr.id}>
                <TableCell className="min-w-56 pl-6">
                  <span className="font-medium">{pr.title}</span>
                  <span className="ml-2 text-text-subtle">#{pr.id}</span>
                </TableCell>
                <TableCell>
                  <Stack
                    direction="horizontal"
                    gap={2}
                    align="center"
                    className="whitespace-nowrap"
                  >
                    <Avatar name={pr.author} size="sm" />
                    <span className="text-text-muted">{pr.author}</span>
                  </Stack>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant={pr.tone} dot={pr.tone !== "neutral"}>
                    {pr.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 text-right whitespace-nowrap text-text-subtle">
                  {pr.updated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Grid cols={2} gap={4}>
        <Card variant="surface" padding="lg">
          <CardHeader>
            <CardTitle>Next up</CardTitle>
            <CardDescription>
              Design one composed component in Figma using only library parts, then run the ship
              loop end to end.
            </CardDescription>
          </CardHeader>
          <Button variant="secondary" className="self-start">
            Read the playbook
          </Button>
        </Card>
        <EmptyState
          icon={Sparkles}
          title="No components waiting for design"
          description="When a component needs a Figma pass, it shows up here."
        />
      </Grid>
    </Stack>
  );
}
