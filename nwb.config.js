const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');
const DirectoryNameAsMain = require('webpack-directory-name-as-main');

const cssConfig = {
  query: {
    modules: true,
    localIdentName: '[local]-[hash:base64:10]'
  }
}

module.exports = {
  type: 'react-app',

  webpack: {
    extra: {
      // entry: path.resolve('./src/index.js'),
      resolve: {
        root: [path.resolve('./src')],
        extensions: ["", ".webpack.js", ".web.js", ".js", ".scss"]
      },
      // plugins: [
      //   new webpack.ResolverPlugin([
      //     new DirectoryNameAsMain()
      //   ])
      // ],
      output: {
        publicPath: ''
      }
    },
    loaders: {
      'css': cssConfig,
      'sass-css': cssConfig
    },
    plugins: {
      html: {
        template: path.resolve('./src/index.html'),
        title: package.name
      }
    }
  },

  babel: {
    stage: 0
  }
}
