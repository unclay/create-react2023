const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  mode: 'none',
  module: {
    rules: [
    ],
  },
  plugins: [
    // build html
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

/**
 * build production
 */
if (process.env.NODE_ENV === 'production') {
  Object.assign(webpackConfig, {
    mode: 'production',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
    },
    plugins: [
      ...webpackConfig.plugins,
    ],
  });
}

/**
 * build devlopment
 */
if (process.env.NODE_ENV === 'development') {
  Object.assign(webpackConfig, {
    mode: 'development',
    devServer: {
      allowedHosts: 'all',
      client: {
        // wss + domain
        // webSocketURL: 'wss://domain/pathname/ws',
        // ws + (domina or ip)
        // webSocketURL: `ws://${'0.0.0.0'}:8080/ws`,
      },
    },
    plugins: [
      ...webpackConfig.plugins,
    ],
  });
}

module.exports = webpackConfig;