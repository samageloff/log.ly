const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    path.join(__dirname, './index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders: ['babel-loader'],

    }),
    new HappyPack({
      id: 'styles',
      threads: 4,
      loaders: ['css-loader?modules&localIdentName=[local]-[hash:base64:5]!postcss-loader']
    })
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
        loader: 'happypack/loader?id=jsx',
        exclude: [/node_modules/, /test/]
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader',
          'postcss-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(jpe?g|gif|png|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=/images/[name].[ext]'
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
