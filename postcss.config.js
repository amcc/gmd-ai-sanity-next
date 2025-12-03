// this needs to be a .js file in 2024, currently .ts doesn't work
const path = require("path");

module.exports = {
  plugins: {
    "postcss-mixins": {
      // look here for how to set up the options
      // https://github.com/postcss/postcss-mixins?tab=readme-ov-file#options
      mixinsDir: path.join(__dirname, "src/styles/mixins"),
      // this doesn't work since v11
      // mixinsFiles: [path.join(__dirname, "src/styles/{mixins/,mixins/**}")],
    },
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
      features: {
        "custom-properties": false,
      },
    },
    "postcss-nesting": {},
  },
};
