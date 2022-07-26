const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      /* favicon: './src/client/assets/favicon.ico', */
    }),
    new SourceMapDevToolPlugin({ filename: '[file].map' }), // plugin eliminates the error of "ERR_UNKNOWN_URL_SCHEME"
  ],
  module: {
    rules: [
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'/* , 'postcss-loader' */],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/build',
    },
    port: 8080, // host client side files on 8080
    compress: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true, // fall back to entry path every time it loads for react router
    proxy: {
      '/api/**': 'http://localhost:3000/', // listening for all requests that come in at port 3000
    },
  },
};
