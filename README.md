# Harbor: design ship flow sandbox

A test project for a designer-to-code workflow: code is the source of truth for tokens and
components, Figma is the sandbox, and new components reach `main` through reviewed pull requests.

"Harbor" is a fictional brand so nothing here is mistaken for client work.

## First-time setup on a Mac

1. Install the tools (skip any you already have):
   - [Homebrew](https://brew.sh), then `brew install node@22 git gh`
   - Claude Code: see https://docs.claude.com/en/docs/claude-code
2. In Terminal, go to the project and install dependencies:
   ```sh
   cd ~/Desktop/design-ship-flow
   npm install
   ```
3. Start it:
   ```sh
   npm run dev        # the site, at http://localhost:3000
   npm run storybook  # the component catalog, at http://localhost:6006
   ```

## Putting it on GitHub and Vercel

```sh
gh auth login                                              # once
gh repo create design-ship-flow --private --source=. --push   # repo already has its first commit
```

Then in Vercel: **Add New → Project → import `design-ship-flow`**, keep the defaults, deploy.
Every pull request will now get its own preview URL.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run the site locally |
| `npm run storybook` | Run the component catalog |
| `npm run check` | Lint, typecheck, format check, production build (what CI runs) |
| `npm run build-storybook` | Build the static catalog |
| `npm run format` | Auto-format all files |

## How it's organised

See [CLAUDE.md](./CLAUDE.md): it's the rulebook for both people and Claude.
