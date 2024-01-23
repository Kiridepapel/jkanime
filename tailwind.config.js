/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary": "#4DA8E2",
        "primary-alter": "#1D95CF",
        "primary-darkness": "#0069D9",
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
        // otros
        "fondo-scroll": "#F1F1F1",
        "fondo-dark-scroll": "#575D7B",
        "white-alter": "#dfdfdf"
      },
      spacing: {
        // sections
        "plr-section": "20.25%",
        "plr-section-2xl": "15.25%",
        "plr-section-xl": "10.25%",
        // top header
        "header": "76px",
        // otros
        "1.25": "5px",
      },
      height: {
        "header": "76px",
        "options-header": "calc(100vh - 76px)",
        "footer": "76px",
        "section-one": "950px",
        "150": "600px",
        "140": "560px",
        "128": "512px",
        "112": "448px",
      },
      minHeight: {
        "base": "calc(100vh - (76px + 76px))",
        "test": '400px',
      },
      minWidth: {
        "90": "360px",
      },
      fontFamily: {
        "oswald": ["Oswald", "sans-serif"],
        "mulish": ["Mulish", "sans-serif"],
      },
      fontSize: {
        "13": "13px",
      },
    },
  },
  plugins: [],
};
