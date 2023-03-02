const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    allowedHosts: 'all',
    client: {
      // wss + domain
      // webSocketURL: 'wss://domain/pathname/ws',
      // ws + (domina or ip)
      // webSocketURL: `ws://${'0.0.0.0'}:8080/ws`,
    },
  },
};