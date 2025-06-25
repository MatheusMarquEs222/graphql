/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#000000",
        popover: "#ffffff",
        "popover-foreground": "#000000",
      },
    },
  },
  plugins: [],
}

