/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: ENV,
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Hello React',
      template: path.resolve(__dirname, 'resources', 'index.html'),
    }),
  ],
  devServer: {
    port: 3000,
    open: false,
    hot: true,
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
}
