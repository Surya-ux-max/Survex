/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
          light: '#4CAF50'
        },
        secondary: {
          DEFAULT: '#81C784',
          light: '#A5D6A7'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
