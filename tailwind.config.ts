import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        content: "65ch",
        container: "min(1200px, 100vw - 2rem)",
      },
      spacing: {
        nav: "3.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
