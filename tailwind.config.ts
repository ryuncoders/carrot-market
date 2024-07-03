import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        tomato: "red",
      },
      borderRadius: {
        "round-144": "144px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
export default config;
