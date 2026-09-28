// Lets Storybook stories import files as raw text, e.g. `import css from "./tokens.css?raw"`
declare module "*?raw" {
  const content: string;
  export default content;
}
