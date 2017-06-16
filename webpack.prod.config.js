const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, './index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].min.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.md', '.txt', '.scss', '.css', '.json'],
    alias: {
      'app': path.resolve(__dirname, 'src/app'),
      'base': path.resolve(__dirname, 'src/app/Base'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'helpers': path.resolve(__dirname, 'src/app/helpers')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '/')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  module: {
    postLoaders: [
      {
        test: /\.js?$/,
        loader: 'transform?envify',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&localIdentName=[local]-[hash:base64:5]!postcss-loader!sass-loader'
        )
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(jpe?g|gif|png|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ico|png)$/,
        loader: 'static-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      }
    ]
  }
}

module.exports = config
