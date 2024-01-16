/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary": "#4DA8E2",
        "primary-alter": "#1D95CF",
        "secondary": "#FB9800",
        "secondary-alter": "#DC821B",
        // header
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
      spacing: {
        // sections
        "plr-section": "20.25%",
        "plr-section-2xl": "15.25%",
        "plr-section-xl": "10.25%",
        // top header
        "header": "76px",
      },
      height: {
        "header": "76px",
        "options-header": "calc(100vh - 76px)",
        "footer": "112px",
      },
      minHeight: {
        "base": "calc(100vh - 76px)",
        "test": '400px'
      },
    },
  },
  plugins: [],
};
