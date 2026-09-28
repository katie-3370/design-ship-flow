import tokensCss from "../styles/tokens.css?raw";

/** Split tokens.css into its light-theme and dark-theme blocks. */
const [lightCss, darkCss = ""] = tokensCss.split('[data-theme="dark"]');

function namesFrom(css: string, prefix: string) {
  const re = new RegExp(`(--${prefix}-[a-z0-9-]+):`, "g");
  return [...new Set([...css.matchAll(re)].map((m) => m[1]))].filter(
    (n) => !n.includes("--line-height") && !n.endsWith("-*"),
  );
}

/** Every token name of a given kind, read straight from tokens.css. */
export const tokenNames = {
  palette: namesFrom(lightCss, "palette"),
  color: namesFrom(lightCss, "color"),
  radius: namesFrom(lightCss, "radius"),
  shadow: namesFrom(lightCss, "shadow"),
  text: namesFrom(lightCss, "text"),
  darkOverrides: namesFrom(darkCss, "color"),
};

/** The resolved value of a CSS variable on the page right now. */
export function readToken(name: string) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** `--color-primary-fg` → `primary-fg`, the part used in Tailwind classes. */
export function utilityName(name: string, prefix: string) {
  return name.replace(`--${prefix}-`, "");
}
