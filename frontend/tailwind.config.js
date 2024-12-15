/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'a':"url('/earth.jpg')"
      },
      colors:{
        bgray:"rgb(1, 4, 10)",
        secondary:"rgb(13, 17, 23)",
        bordcol:"rgb(60, 67, 77)",
        sidebar:"rgb(15, 15, 15)",
        gitsecondary:"rgb(33, 40, 48)",
      }
    },
  },
  plugins: [],
}