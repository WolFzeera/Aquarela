/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vangogh: {
          pink: '#E85D75',
          ocher: '#C99635',
          sienna: '#E05836',
          paleYellow: '#F5DE88',
          crimson: '#A81C2E',
          vermilion: '#E34234',
          sapGreen: '#4F7942',
          deepBrown: '#422D24',
          indigo: '#2B3359',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }
    },
  },
  plugins: [],
}
