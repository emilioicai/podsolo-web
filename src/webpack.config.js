const path = require('path');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'api': path.resolve(__dirname, '../functions/api'),
    },
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, "./node_modules")],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
