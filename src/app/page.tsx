import { Container, Stack } from "@/components/layout";
import { Button, Heading, Text } from "@/components/ui";

export default function Home() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container size="md">
        <Stack gap={8}>
          <Text size="sm" tone="muted">
            Harbor · design ship flow sandbox
          </Text>
          <Heading level={1} size="display">
            Code is the source of truth. Figma is the sandbox.
          </Heading>
          <Text size="lg" tone="muted" className="max-w-2xl">
            This project holds a token-based component library, a few test pages, and the workflow
            for taking a component from a Figma frame to a merged pull request.
          </Text>
          <Stack direction="horizontal" gap={2} wrap>
            <Button size="lg">Primary action</Button>
            <Button size="lg" variant="secondary">
              Secondary action
            </Button>
          </Stack>
        </Stack>
      </Container>
    </main>
  );
}
