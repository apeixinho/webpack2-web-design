const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./index.js', './ejs/index.ejs'],
  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  context: resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                return [
                  require('precss'),
                  require('autoprefixer'),
                  require('postcss-size')
                ];
              }
            }
          }
        ],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?mimetype=image/jpg'
      }
    ],
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack2 example',
      template: path.join(__dirname, './src/ejs/index.ejs')
    }),
    new HtmlWebpackPlugin({
      title: 'webpack2 example',
      template: path.join(__dirname, './src/ejs/detail.ejs'),
      filename: 'detail.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
};
