const merge= require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  watch:true,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000, 
    aggregateTimeout: 300 
  },
  module:{
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '_[name]_[local]-[hash:base64:5]'
              },
            }
          },
          'postcss-loader',
          'less-loader'
        ],
        exclude:/node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        baseReact: {
          test: /(react|react-dom)/,
          name: 'baseReact',
          chunks: 'all',
          priority: 0,
        },
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          priority: -1,
        }
      }
    },
    runtimeChunk: {   
        name: "manifest"
      }
  },
  // devtool:'source-map'
  devServer: {
    compress: true,
    open: true,
    proxy: {
      '/apiService': {
        // target: 'http://39.99.174.23:3000',
        target: 'http://localhost:3000',
        pathRewrite: {'/apiService':''}
      }
    
    }
  }
}
module.exports = merge(baseConfig,devConfig);