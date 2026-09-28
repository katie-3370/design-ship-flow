"use client";

import type { ReactNode } from "react";

import { Grid, Stack } from "@/components/layout";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Field,
  Heading,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
} from "@/components/ui";

const team = [
  { name: "Katie Proulx", email: "katie@harbor.studio", role: "Owner" },
  { name: "Ana Horvat", email: "ana@harbor.studio", role: "Designer" },
  { name: "Luka Babic", email: "luka@harbor.studio", role: "Developer" },
];

function SettingsCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Card padding="none">
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {children}
      </div>
      {footer && (
        <div className="flex justify-end gap-2 border-t border-border px-6 py-4 md:px-8">
          {footer}
        </div>
      )}
    </Card>
  );
}

export function SettingsTabs() {
  return (
    <Stack gap={8} className="mx-auto max-w-3xl">
      <Heading level={1} size="lg">
        Settings
      </Heading>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Stack gap={6}>
            <SettingsCard
              title="Profile"
              description="How you appear on pull requests and comments."
              footer={<Button>Save changes</Button>}
            >
              <Stack direction="horizontal" gap={4} align="center">
                <Avatar name="Katie Proulx" size="xl" />
                <Button variant="secondary" size="sm">
                  Change photo
                </Button>
              </Stack>
              <Grid cols={2} gap={4}>
                <Field label="Name">
                  <Input defaultValue="Katie Proulx" />
                </Field>
                <Field label="Email" hint="Used for GitHub and Vercel notifications.">
                  <Input type="email" defaultValue="katie@harbor.studio" />
                </Field>
              </Grid>
              <Select defaultValue="designer">
                <Field label="Role">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </Field>
                <SelectContent>
                  <SelectItem value="designer">Product designer</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="pm">Product manager</SelectItem>
                </SelectContent>
              </Select>
              <Field label="Bio" hint="A sentence or two for your teammates.">
                <Textarea defaultValue="Product designer. Ships components from Figma to main." />
              </Field>
            </SettingsCard>

            <Card variant="outline" padding="lg" className="border-danger/40">
              <Stack direction="horizontal" justify="between" align="center" gap={4} wrap>
                <Stack gap={1}>
                  <Heading level={3} size="xs">
                    Delete account
                  </Heading>
                  <Text size="sm" tone="muted">
                    Removes your access to every workspace. This can&apos;t be undone.
                  </Text>
                </Stack>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="danger">Delete account</Button>
                  </DialogTrigger>
                  <DialogContent
                    title="Delete your account?"
                    description="You'll lose access to Harbor and all its projects."
                  >
                    <Field label='Type "delete" to confirm'>
                      <Input />
                    </Field>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button variant="danger">Delete account</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Stack>
            </Card>
          </Stack>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <SettingsCard
            title="Notifications"
            description="Choose what reaches your inbox."
            footer={<Button>Save preferences</Button>}
          >
            <Stack gap={6}>
              <Switch
                label="Pull request reviews"
                description="When someone asks you to review a PR."
                defaultChecked
              />
              <Switch
                label="Failed checks"
                description="When CI fails on a branch you opened."
                defaultChecked
              />
              <Switch label="Deploys" description="When a preview or production deploy finishes." />
            </Stack>
            <fieldset className="flex flex-col gap-3 border-t border-border pt-6">
              <legend className="mb-3 text-sm font-medium">Weekly digest includes</legend>
              <Checkbox label="Components added or changed" defaultChecked />
              <Checkbox label="Token changes" defaultChecked />
              <Checkbox label="Accessibility warnings" />
            </fieldset>
          </SettingsCard>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <SettingsCard
            title="Team"
            description="People who can open and review pull requests."
            footer={<Button>Invite teammate</Button>}
          >
            <Stack gap={4}>
              {team.map((m) => (
                <Stack
                  key={m.email}
                  direction="horizontal"
                  justify="between"
                  align="center"
                  gap={4}
                >
                  <Stack direction="horizontal" gap={3} align="center" className="min-w-0">
                    <Avatar name={m.name} size="lg" />
                    <Stack gap={0} className="min-w-0">
                      <Text size="sm" weight="medium">
                        {m.name}
                      </Text>
                      <Text size="sm" tone="subtle" className="truncate">
                        {m.email}
                      </Text>
                    </Stack>
                  </Stack>
                  <Badge variant={m.role === "Owner" ? "solid" : "neutral"}>{m.role}</Badge>
                </Stack>
              ))}
            </Stack>
          </SettingsCard>
        </TabsContent>
      </Tabs>
    </Stack>
  );
}
