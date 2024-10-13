/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#26534C",
        secondary: "#F2AC0D",
        tertiary: "#1C3F39",
        quaternary: "#605E54",
        accent: "#E9E6D7",
        lightGray: "#C3D0CF",
      },
    },
  },
  plugins: [],
};
