const path = require(`path`);

module.exports = {
  entry: [
    `./js/utils.js`,
    `./js/modal.js`,
    `./js/backend.js`,
    `./js/comments.js`,
    `./js/picture.js`,
    `./js/gallery.js`,
    `./js/filters.js`,
    `./js/slider.js`,
    `./js/preview.js`,
    `./js/effects.js`,
    `./js/scale.js`,
    `./js/validation.js`,
    `./js/form.js`,
    `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
