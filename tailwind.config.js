/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#100b0e",
        background: "#fbfafb",
        primary: "#986b82",
        secondary: "#bfc9b2",
        accent: "#94b597",
      },

      fontFamily: {
        "custom-noto": ['"Noto Sans Mono"'],
      },
    },
  },
  plugins: [],
};
