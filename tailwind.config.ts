import type { Config } from "tailwindcss";
import { akshar, montserrat } from "./app/layout";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
        akshar: 'var(--font-akshar),',
        anuphan: 'var(--font-anuphan),'
      }
    },
  },
  plugins: [],
};
export default config;
