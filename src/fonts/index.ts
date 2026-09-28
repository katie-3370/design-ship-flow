import localFont from "next/font/local";

/** Geist, self-hosted so builds never depend on Google Fonts being reachable. */
export const fontSans = localFont({
  src: "./Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const fontMono = localFont({
  src: "./GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});
