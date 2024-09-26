/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        phone: "390px",
        tablet: "600px", 
        laptop: "1025px", 
        desktop: "1300px", 
      },
      backgroundImage: 
      {
        'iphone': "url('/iphone-frame.png')",
      },
      colors: {
        lightBlue: "#B8D3E9",
        blue: "#9AA7CC",
        darkBlue: "#0B487A",
        black: "#222222",
        white: "#FFFDFA",
        orange: "#FFAE00"
      },
      fontFamily: {
        body: ["Manrope", "sans-serif"],
        heading: ["Anton", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInOut: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-out',
        fadeInOut: 'fadeInOut 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}