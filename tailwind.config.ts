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
        espresso: "#1C1410",
        walnut: "#241A13",
        gold: "#C9963A",
        goldHover: "#E8B86D",
        cream: "#F5EDD9",
        parchment: "#B8A89A",
        warmDark: "#2E2018",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
