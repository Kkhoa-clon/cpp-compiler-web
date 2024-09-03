/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './static/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1e1e1e',
        text: '#f1f1f1',
        'header-footer': '#212529',
        primary: '#007bff',
        secondary: '#0056b3',
        sidebar: '#222',
        'section-background-dark': '#333',
        'section-background-light': '#444',
        highlight: 'rgba(0, 123, 255, 0.2)',
      },
      boxShadow: {
        'header': '0 4px 8px rgba(0, 0, 0, 0.4)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.4)',
        'button': '0 4px 8px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
      animation: {
        'gradient-animation': 'gradientAnimation 10s ease infinite',
      },
      keyframes: {
        gradientAnimation: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 0%' },
        },
      },
    },
  },
  plugins: [],
};
