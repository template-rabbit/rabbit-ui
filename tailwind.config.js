/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,astro,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        brand: 'hsl(210, 100%, 60%)',//"#FF5733",
        "brand-contrast": "#222",
        dark: "#444",
        darker: "#222",
        darkest: "#111",
        light: "#bbb",
        lighter: "#ddd",
        lightest: "#eee",
      }
    }
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('light', '.light &', '.light&', '.light:&')
    }
  ],
};
