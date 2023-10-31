/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // ADD NEW IMAGES HERE
      backgroundImage: {
        'header-background1': "url('/src/assets/header_bg.png')",
      }
    },
  },
  plugins: [],
}

