/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      bangla: ["Hind Siliguri", "sans-serif"],
      henry: ["Henny Penny", "cursive"],
    },
  },
  extend: {},
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
