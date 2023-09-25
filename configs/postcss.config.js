const Autoprefixer = require('autoprefixer');
const Cssnano = require('cssnano');

module.exports = () => {
  const plugins = [
    Cssnano(),
    Autoprefixer(),
  ];

  return {
    plugins,
  };
};
