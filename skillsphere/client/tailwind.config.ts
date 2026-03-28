/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        secondary: "#22C55E",
        accent: "#0EA5E9",
        dark: "#0F172A",
        card: "#1E293B",
      },
    },
  },
  plugins: [],
};