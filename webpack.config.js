var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    schema: [
      './src/schema_entry.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json'
    }]
  },
  resolveLoader: {
    fallback: path.join(__dirname, "node_modules")
  },
  plugins: [
  ]
}
