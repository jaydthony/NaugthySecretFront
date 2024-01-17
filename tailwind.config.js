/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./parts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        2000: "2000",
      },
      colors: {
        pink: "#f9096c",
        blue: "#008DFF",
        grey: "#E1E3EA",
        lblue: "#04c8c8",
      },
    },
  },
  plugins: [],
};
