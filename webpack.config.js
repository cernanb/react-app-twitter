var webpack = require('webpack');
var dotenv = require('dotenv');
dotenv.config();

var config = {
  entry: __dirname + '/app/App.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
        "process.env": {
          AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
          AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID)
        }
      })
  ]
}

module.exports = config;
