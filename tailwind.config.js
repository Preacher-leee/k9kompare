/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6eaf0',
          100: '#c2cad9',
          200: '#99a6bf',
          300: '#7182a4',
          400: '#536791',
          500: '#2d3e67', // Navy blue from logo
          600: '#283860',
          700: '#223056',
          800: '#1c284d',
          900: '#12183b',
        },
        secondary: {
          50: '#fff0e0',
          100: '#ffd9b3',
          200: '#ffc080',
          300: '#ffa64d',
          400: '#ff9226',
          500: '#f68b28', // Orange from logo
          600: '#e67f00',
          700: '#cc7000',
          800: '#b36000',
          900: '#804400',
        },
        cream: '#FFF9E6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};