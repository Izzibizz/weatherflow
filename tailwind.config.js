/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "600px", 
        laptop: "1025px", 
        desktop: "1300px", 
      },
      backgroundImage: 
      {
        'iphone': "url('/iphone-frame.png')",
      },
      fontFamily: {
        body: ["Raleway", "sans-serif"],
        heading: ["Michroma", "sans-serif"],
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