import type { Config } from "tailwindcss";

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
        topheader: "#60AAF9",
        header: "#F2F2F2",
        headerfont: "#005AE0",
        navfont: "#3C95EC",
      },
      fontFamily: {
        montserrat: "var(--font-montserrat)",
        akshar: "var(--font-akshar)",
        anuphan: "var(--font-anuphan)",
      },
      spacing: {
        32: "8rem", // Custom ระยะห่าง 8rem
      },
    },
  },
  plugins: [],
};

export default config;
