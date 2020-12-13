const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Montserrat", "ui-sans-serif", "system-ui"],
      body: ["Montserrat"]
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1201px",
      "2xl": "1535px"
    },
    colors: {
      gray: colors.warmGray,
      red: colors.red,
      yellow: colors.amber,
      teal: colors.teal,
      green: colors.green,
      blue: colors.blue,
      violet: colors.violet,
      white: colors.white,
      blueg: colors.blueGray
    },
    fontSize: {
      "2xs": ".60rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem"
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT: "0 0 2px #A8A29E",
      md:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
      focus: "0 0 0 3px rgba(66, 153, 225, 0.5)",
      err: "0 0 4px #EF4444",
      none: "none"
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
