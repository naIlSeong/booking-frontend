const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        coolGray: colors.coolGray,
        indigi: colors.indigo,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
