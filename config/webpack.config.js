const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const serverSide = (env, argv) => {
  // console.log('webpack production config: ', env, argv);
  return{
    entry: ['./src/index.js'],
    target: "node", // in order to ignore built-in modules like path, fs, etc.
    output: {
      filename: 'meeseeks.js',
      path: path.resolve(__dirname, '../lib'),
      library: 'meeseeks-js',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: [nodeExternals()], // ignore all modules in node_modules folder
    module: {
      rules: [
        {
          test: /\.js?$/,
          enforce: 'pre',
          loader: 'prettier-loader',
          options: {
            parser: 'babel',
          }
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['eslint-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production'
      }),
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '..'),
      })
    ]
  }
};

module.exports = [ serverSide ]