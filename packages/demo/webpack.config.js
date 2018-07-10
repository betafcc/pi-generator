const {join, parse} = require('path');
const camelCase = require('lodash.camelcase');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


const package = require('./package.json');
const {PORT=3000, NODE_ENV='production'} = process.env;


const base = {
  bail: true,
  entry: join(__dirname, 'src'),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: camelCase(package.name.split('/').slice(-1)[0]),
    libraryTarget: 'umd',
    path: join(__dirname, parse(package.main).dir),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: ['worker-loader', 'babel-loader'],
        include: join(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: join(__dirname, 'src'),
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      }
    }),

    new HtmlWebpackPlugin({
      template: join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      inject: 'body',
    })
  ],
};


const env = {
  development: {
    devtool: 'source-map',
    devServer: {
      hot: true,
      inline: true,
      historyApiFallback: true,
      port: PORT,
      publicPath: '/',
      contentBase: join(__dirname, 'public'),
      watchContentBase: true,
      stats: {
        colors: true,
      }
    },
    module: {
      rules: [
        ...base.module.rules,
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      ...base.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  },


  production: {
    module: {
      rules: [
        ...base.module.rules,
        {
          test: /\.css$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
              'postcss-loader',
            ]
          }),
        }
      ]
    },

    optimization: {
      minimize: true,
    },

    plugins: [
      ...base.plugins,
      new ExtractTextWebpackPlugin({
        filename: '[name].css',
        allChunks: true,
      }),

      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ]

  },
};


module.exports = Object.assign({}, base, env[NODE_ENV]);
