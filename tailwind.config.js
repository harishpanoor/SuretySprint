/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        icse: {
          blue: '#1e40af',
          indigo: '#4338ca',
          emerald: '#059669',
          amber: '#d97706',
          rose: '#e11d48'
        }
      }
    },
  },
  plugins: [],
}
