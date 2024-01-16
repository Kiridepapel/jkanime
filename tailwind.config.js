/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#4DA8E2",
        "header-color-dark": "#1A1A1A",
        // main
        "section-one": "#F7F7F7",
        "section-one-dark": "#303240",
        "section-two": "#DEDEDE",
        "section-two-dark": "#474C67",
        // footer
        "footer-color-dark": "#474C67",
        // button
        "button": "#1D95CF",
        "button-hover": "#146E9A",
        "button-hover-dark": "#777EA7",
      },
    },
  },
  plugins: [],
};

