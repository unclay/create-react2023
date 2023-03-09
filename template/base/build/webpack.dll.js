const path = require("path");
const webpack = require("webpack");

const config = require("./build.config");
const devConfig = config.dll.dev;
const prodConfig = config.dll.prod;

module.exports = [
  {
    name: "dll:dev",
    mode: "development",
    entry: devConfig.entry,
    output: {
      path: path.resolve(__dirname, "..", devConfig.cache),
      filename: "[name].dll.js",
      library: "[name]_[fullhash]",
    },
    plugins: [
      new webpack.DllPlugin({
        name: "[name]_[fullhash]",
        path: path.resolve(
          __dirname,
          "..",
          devConfig.cache,
          "[name]-manifest.json"
        ),
      }),
    ],
  },
  {
    name: "dll:prod",
    mode: "production",
    entry: prodConfig.entry,
    output: {
      path: path.resolve(__dirname, "..", prodConfig.cache),
      filename: "[name].dll.js",
      library: "[name]_[fullhash]",
    },
    plugins: [
      new webpack.DllPlugin({
        name: "[name]_[fullhash]",
        path: path.resolve(
          __dirname,
          "..",
          prodConfig.cache,
          "[name]-manifest.json"
        ),
      }),
    ],
  },
];
