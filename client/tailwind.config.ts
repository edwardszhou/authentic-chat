/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayscale: {
          0: "rgb(var(--grayscale-00) / <alpha-value>)",
          20: "rgb(var(--grayscale-20) / <alpha-value>)",
          40: "rgb(var(--grayscale-40) / <alpha-value>)",
          60: "rgb(var(--grayscale-60) / <alpha-value>)",
          80: "rgb(var(--grayscale-80) / <alpha-value>)",
          100: "rgb(var(--grayscale-100) / <alpha-value>)"
        },
        primary: {
          light: "rgb(var(--primary-light) / <alpha-value>)",
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          dark: "rgb(var(--primary-dark) / <alpha-value>)"
        },
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)"
        },
        borderRadius: {
          "4xl": "2rem",
          "5xl": "3rem"
        }
      }
    }
  },
  plugins: []
};
