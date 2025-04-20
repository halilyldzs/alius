/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        background: '#f8f9fa',
        card: '#ffffff',
        text: '#212529',
      },
    },
  },
  plugins: [],
};
