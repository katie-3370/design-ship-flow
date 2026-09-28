import type { Decorator, Preview } from "@storybook/nextjs-vite";

import "../src/app/globals.css";
import { fontMono, fontSans } from "../src/fonts";

/** Applies the fonts and the light/dark theme from the toolbar to every story. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? "light";

  const html = document.documentElement;
  html.dataset.theme = theme;
  html.classList.add(fontSans.variable, fontMono.variable);

  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: { order: ["Foundations", "Primitives", "Layout", "Components", "Pages"] },
    },
    a11y: {
      // 'todo' shows violations in the test UI only; switch to 'error' to fail CI on them
      test: "todo",
    },
  },
};

export default preview;
