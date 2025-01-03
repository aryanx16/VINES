/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
      },
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
      animation: {
        floating: 'floating 3s ease-in-out infinite',
        scroll: 'scroll 20s linear infinite',
          shine: 'shine 5s linear infinite',
        gradient: 'gradient 8s linear infinite', // Use the keyframes defined above
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
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