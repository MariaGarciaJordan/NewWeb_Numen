/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,svelte,vue,md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          beige: "#F9EBDC",
          coralRed: "#F35059",
          darkRed: "#D33440",
          panther: "#212123",
          mediterranean: "#A6DAD5",
        },
        supportDetails: {
          mediterranean: "#A6DAD5",
          depthSea: "#018EA1",
          gold: "#EFA517",
        },
        opacity: {
          panther75: "#59595A",
          panther50: "#909091",
          panther25: "#C7C7C8",
          darkRed75: "#DE6770",
          darkRed50: "#E99AA0",
          darkRed25: "#F4CCCF",
        },
        basics: {
          black: "#000000",
          darkGray: "#4D4D4D",
          mediumGray: "#BEBEBE",
          lightGray: "#D9D9D9",
          extraLightGray: "#EEEEEE",
          almostWhite: "#FAFAFA",
          white: "#FFFFFF",
        },
        light: {
          background: "#F9F3E8",
          text: "#212123",
          accent: "#F35059",
          muted: "#59595A",
        },
        dark: {
          background: "#212123",
          text: "#F9EBDC",
          accent: "#F35059",
          muted: "#909091",
        },
      },
      fontFamily: {
        geist: ["Geist", "serif"],
        geistMono: ["GeistMono", "serif"],
        IBMPlexMono: ["IBMPlexMono", "monospace"],
      },
      fontSize: {
        h1L: ["5rem", { lineHeight: "120%" }],
        h1M: ["4rem", { lineHeight: "120%" }],
        h2: ["3rem", { lineHeight: "120%" }],
        h3: ["2.5rem", { lineHeight: "120%" }],
        h4: ["2rem", { lineHeight: "120%" }],
        h5: ["1.5rem", { lineHeight: "120%" }],
        h6: ["1rem", { lineHeight: "120%" }],

        "text-lg": ["1.5rem", { lineHeight: "150%" }],
        "text-md": ["1.25rem", { lineHeight: "150%" }],
        "text-base": ["1rem", { lineHeight: "150%" }],
        "text-sm": ["0.875rem", { lineHeight: "150%" }],
        "text-xs": ["0.75rem", { lineHeight: "150%" }],

        "mobile-h1L": ["3rem", { lineHeight: "120%" }],
        "mobile-h1M": ["2.5rem", { lineHeight: "120%" }],
        "mobile-h2": ["2rem", { lineHeight: "120%" }],
        "mobile-h3": ["1.5rem", { lineHeight: "120%" }],
        "mobile-h4": ["1.25rem", { lineHeight: "120%" }],
        "mobile-h5": ["1rem", { lineHeight: "120%" }],
        "mobile-h6": ["0.875rem", { lineHeight: "120%" }],

        "mobile-text-lg": ["1.25rem", { lineHeight: "150%" }],
        "mobile-text-md": ["1.125rem", { lineHeight: "150%" }],
        "mobile-text-base": ["1rem", { lineHeight: "150%" }],
        "mobile-text-sm": ["0.875rem", { lineHeight: "150%" }],
        "mobile-text-xs": ["0.875rem", { lineHeight: "150%" }],
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
};
