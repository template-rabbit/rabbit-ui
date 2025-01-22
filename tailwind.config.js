/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,astro,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: 'hsl(210, 100%, 60%)',//"#FF5733",
        "brand-contrast": "#222",
        dark: "#111",
        light: "#eee",
      }
    }
  },
  plugins: []
};
