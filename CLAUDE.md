@AGENTS.md

# Harbor: design ship flow sandbox

A practice project where **code is the component source of truth** and Figma is the sandbox.
A designer (Katie) designs in Figma; Claude builds from this repo's tokens and components and
opens a pull request. Read this whole file before changing anything.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · cva · Storybook 10 · Vercel

## Where things live

| Path | What |
| --- | --- |
| `src/styles/tokens.css` | ALL design tokens. Palette + semantic layer, light and dark |
| `src/app/globals.css` | Imports Tailwind + tokens, base styles, `dark:` variant |
| `src/components/ui/` | Primitives (Button, Input, Card...). One file + one `.stories.tsx` each |
| `src/components/layout/` | Container, Stack, Grid, Section. Use these instead of ad-hoc flex/grid wrappers |
| `src/components/` | Composed components (SiteHeader, PricingCard, AppShell...) built only from primitives. Stories under `Components/` |
| `src/app/` | Pages. Built only from components |
| `src/foundations/` | Storybook pages that visualise the tokens |
| `src/lib/cn.ts` | `cn()` class merge helper |

## Rules

1. **Tokens only.** Never use hex/rgb/oklch values, `style={{}}` for visual values, or arbitrary
   Tailwind values like `p-[13px]`, `text-[#333]`, `rounded-[6px]`. Tailwind's default palette,
   radii, shadows and type sizes are deliberately removed; if a class doesn't exist, the value
   isn't in the system. The one exception is viewport layout constraints (e.g. `max-h-[85vh]`).
2. **Semantic colors only.** Use `bg-surface`, `text-text-muted`, `border-border`, `bg-primary`...
   Never reference `--palette-*` from a component.
3. **Reuse before creating.** Check `src/components/ui/` first. If a design needs something the
   library can't express (a new token, variant or primitive), STOP and list the gap before
   writing code. Don't invent one-off styles to match a frame.
4. **Follow the Button pattern** (`src/components/ui/button.tsx`): `cva` for variants, props that
   mirror the Figma component properties by name, forward native props, `cn()` for `className`.
5. **Every component ships with stories**: one per variant and meaningful state (disabled, error,
   loading, empty), under `Primitives/`, `Components/` or `Pages/`.
6. **Accessible by default**: real elements (`button`, `a`, `label`), visible focus, keyboard
   support, sufficient contrast in both themes. Check stories in light AND dark.
7. **Spacing on the 8px grid**: prefer even spacing steps (`gap-2`, `p-4`, `py-6`). Base unit is 4px.
8. **Use the primitives for type and layout.** `Heading`/`Text` for copy, `Stack`/`Grid`/`Container`/
   `Section` for layout. Import from `@/components/ui` and `@/components/layout`.
9. **The look is warm monochrome.** Ink (`primary`) for main actions, pill buttons, large soft cards
   (`rounded-xl`), hairline rings (`shadow-xs`) over heavy shadows, light display headings.
   Color only for links (`accent`), focus and status.
10. **Never push to `main`.** Work on a branch named `design/<short-name>`, open a PR.

## Figma

File: **Harbor Design System** — https://www.figma.com/design/H6SamGGGOWQN1tI2caZYiM
Pages: Cover · Foundations · Primitives · Composed · **Sandbox** (where new components are designed).

The Figma library is generated **from** this repo. Code wins every conflict: if a frame uses a value
that isn't in `tokens.css`, treat it as a proposal for a new token, not something to hard-code.

Agilno's Figma is on the Pro plan, so there is no Code Connect. Instead, every Figma component's
description says the exact code to use, and this table is the map:

| Figma component | Figma properties | Code |
| --- | --- | --- |
| Button | Variant, Size, Disabled, Label, Leading/Trailing icon | `<Button variant size disabled>` (ui) |
| Badge | Variant, Dot, Label | `<Badge variant dot>` (ui) |
| Avatar | Size, Initials | `<Avatar name size src>` (ui) |
| Rating | Value, Size, Show value | `<Rating value={3.5} size showValue>` (ui) |
| Input | State, Label, Value, Hint | `<Field label hint error><Input /></Field>` (ui) |
| Select / Select menu | State, Label, Value | `<Select>` + `<SelectTrigger>` / `<SelectContent>` (ui) |
| Checkbox | Checked, Disabled, Label, Description | `<Checkbox label description>` (ui) |
| Switch | On, Disabled, Label, Description | `<Switch label description>` (ui) |
| Tab / Tabs | State, Label | `<Tabs><TabsList><TabsTrigger>` (ui) |
| Card | Variant, Padding, Title, Description | `<Card variant padding>` + `CardHeader/Title/Description/Footer` (ui) |
| StatCard | Sentiment, Label, Value, Delta | `<StatCard label value delta sentiment>` (components) |
| FeatureCard | Icon, Title, Description | `<FeatureCard icon title description>` (components) |
| RatingCard | Elevation, Rating, Date, Quote, Name, Title | `<RatingCard elevation rating date quote name title>` (components) |
| PricingCard | Featured, Name, Price, Description | `<PricingCard ... featured>` (components) |
| Icon/* | — | `lucide-react` icon of the same name |

Variables map 1:1 to Tailwind classes: Figma `Background/surface` = `bg-surface`,
`Text/text-muted` = `text-text-muted`, `Border/border` = `border-border`, `radius/lg` = `rounded-lg`,
`space/4` = `p-4` / `gap-4` (16px). Text styles: `Heading/lg` = `<Heading size="lg">`,
`Body/sm` = `<Text size="sm">`. Shadow styles = `shadow-xs` … `shadow-lg`.

## Building from a Figma frame

1. Read the frame with the Figma MCP (`get_design_context`, `get_screenshot`, `get_variable_defs`).
   Instances tell you which component and props to use; bound variables tell you which token.
2. Map every layer to an existing component or token. Report the mapping and any gaps first.
3. Build the component + stories, and use it on a page if asked.
4. Run `npm run check` and `npm run build-storybook`; both must pass.
5. Open a PR using the template: Figma link, screenshot, components and tokens used,
   new tokens or primitives added and why, states covered.

## Commands

- `npm run dev`: app at http://localhost:3000
- `npm run storybook`: component catalog at http://localhost:6006
- `npm run check`: token guardrail + lint + typecheck + format check + production build
- `npm run check:tokens`: only the token guardrail (raw colors, arbitrary values, inline styles)
- `npm run format`: auto-format everything

## Storybook online (Chromatic)

Every PR publishes Storybook to Chromatic and compares each story with `main`.

- The PR gets two checks: **Storybook Publish** (link to this branch's Storybook) and **UI Tests**
  (stories that look different from `main`, to accept or deny in Chromatic).
- Visual changes don't fail CI; the designer reviews them. Merging to `main` accepts them as the new baseline.
- In every PR description, list the stories to review under "Previews" (e.g. `Primitives/Rating`).
