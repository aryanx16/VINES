/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgray:"rgb(1, 4, 10)",
        secondary:"rgb(13, 17, 23)",
        bordcol:"rgb(60, 67, 77)",
      }
    },
  },
  plugins: [],
}