#!/usr/bin/env node
/**
 * Token guardrail: fails when components or pages use values that bypass the design system.
 *
 *   - raw colors (#hex, rgb(), hsl(), oklch()) outside src/styles/tokens.css
 *   - arbitrary Tailwind values like p-[13px], text-[#333], rounded-[6px]
 *   - inline style={{ ... }} in components and pages
 *
 * Runs as part of `npm run check`, so it runs in CI on every pull request.
 * To allow a genuine exception, add `// tokens-ok: <reason>` on the same line.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");

// Files that are allowed to contain raw values
const SKIP = [
  "src/styles/tokens.css", // the source of truth itself
  "src/foundations/", // Storybook pages that visualise raw token values
];

// Arbitrary values we accept on purpose (viewport constraints, CSS variable references)
const ALLOWED_ARBITRARY = [
  /max-h-\[\d+(vh|dvh)\]/,
  /^(data|aria|group|peer|supports|has)-\[/, // state selectors, not values
];

const rules = [
  { name: "raw color", re: /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|oklch)\(/ },
  { name: "arbitrary Tailwind value", re: /\b[a-z-]+-\[[^\]]+\]/ },
  { name: "inline style", re: /style=\{\{/ },
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const problems = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file);
  if (!/\.(tsx?|css)$/.test(file) || SKIP.some((s) => rel.startsWith(s))) continue;
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes("tokens-ok:") || /^\s*(\/\/|\*|\/\*)/.test(line)) return;
      for (const { name, re } of rules) {
        const m = line.match(re);
        if (!m) continue;
        if (name === "arbitrary Tailwind value" && ALLOWED_ARBITRARY.some((a) => a.test(m[0])))
          continue;
        if (name === "raw color" && /&#\d+;/.test(line)) continue;
        problems.push(`${rel}:${i + 1}  ${name}: ${m[0]}`);
      }
    });
}

if (problems.length) {
  console.error(`\n✖ ${problems.length} value(s) bypass the design tokens:\n`);
  for (const p of problems) console.error("  " + p);
  console.error(
    "\nUse a token class instead (bg-surface, p-4, rounded-md...). If the system is missing a value," +
      "\nadd it to src/styles/tokens.css in this PR and explain why in the description.\n",
  );
  process.exit(1);
}
console.log("✓ No off-system values found.");
