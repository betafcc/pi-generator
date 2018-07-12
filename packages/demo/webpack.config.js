const {join, parse} = require('path');
const camelCase = require('lodash.camelcase');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');


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
    globalObject: 'this',
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
    output: {
      ...base.output,
      publicPath: '/',
    },
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
      new InterpolateHtmlPlugin({'PUBLIC_URL': ''}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  },


  production: {
    output: {
      ...base.output,
      publicPath: package.homepage ? '/' + package.homepage.split('/').slice(-1)[0] + '/' : '/',
    },
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
      new InterpolateHtmlPlugin({'PUBLIC_URL': package.homepage || ''}),
      new ExtractTextWebpackPlugin({
        filename: '[name].css',
        allChunks: true,
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ]

  },
};


module.exports = Object.assign({}, base, env[NODE_ENV]);
