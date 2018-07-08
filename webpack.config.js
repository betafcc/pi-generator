const camelCase = require('lodash.camelcase');


const package = require('./package.json');


const base = {
  output: {
    filename: '[name].js',
    library: camelCase(package.name.split('/').slice(-1)[0]),
    libraryTarget: 'umd',
  }
};


const envs = {
  development: {
    devtool: 'source-map',
  },

  production: {
    externals: {
      'big-integer': {
        commonjs: 'big-integer',
        commonjs2: 'big-integer',
        amd: 'big-integer',
        root: 'bigInt',
      },
    },
  },
}


module.exports = (env, argv) => Object.assing({}, base, envs[argv.mode]);
