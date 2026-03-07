/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "uika-green": "#005f56",
        "uika-light": "#008c7f",
      },
    },
  },
  plugins: [],
};
