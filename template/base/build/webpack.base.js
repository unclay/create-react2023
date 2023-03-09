const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackConfig = {
  mode: "none",
  entry: {
    main: "./src/index.jsx",
  },
  module: {
    rules: [],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    // build html
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};

module.exports = webpackConfig;
