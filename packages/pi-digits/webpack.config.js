const camelCase = require('lodash.camelcase');


const package = require('./package.json');
const {NODE_ENV='production'} = process.env;


const base = {
  output: {
    filename: 'index.js',
    library: camelCase(package.name.split('/').slice(-1)[0]),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
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


module.exports = Object.assign({}, base, envs[NODE_ENV]);
