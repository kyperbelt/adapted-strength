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
      , colors: {
        'custom-red': '#FF4949',
        'custom-dark-red': '#B23333',
        'custom-gray': '#EDF2F4',
        'custom-dark': '#161A1D',
        primary: {
          DEFAULT: "#FFFFFF", 
          dark: "#b3b3b3",
        },
        secondary: {
          dark: '#0f0f0f',
          DEFAULT: '#161616',
          light: '#5c5c5c'
        },
        accent: {
          light: '#ff8080',
          DEFAULT: '#FF4949',
          dark: '#b33333'
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0'},
          '100%': { transform: 'translateX(0)', opacity: '1'},
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)', opacity: '0'},
          '100%': { transform: 'translateX(0)', opacity: '1'},
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideLeft: 'slideLeft 0.5s ease-in-out',
        slideRight: 'slideRight 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

