/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B3C5D",    // Azul JJGACADEMY
        secondary: "#328CC1",
        accent: "#F4D35E",
      },
    },
  },
  plugins: [],
};
