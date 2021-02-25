const merge= require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const prodConfig = {
    mode: 'production',
    module: {
       rules: [
        {
            test: /\.(le|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
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
            exclude: /node_modules/
        }
       ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        })
    ],
    optimization: {
      // usedExports: true, //确定每个模块下被使用的导出。生产模式下默认开启，其他模式下不开启。
      // sideEffects: true,  //用于判断是否要支持第三方库中的package.json中的sideEffects字段
      providedExports: false,   //将 optimization.providedExports 配置为 false（方法名称不会被缩写），确定每个模块的导出，用于其他优化或代码生成。默认所有模式都开启；
      // concatenateModules: false,  //  optimization.concatenateModules 也配置为 false（多个 js 代码块不会被放到同一个方法中）
      splitChunks: {
        cacheGroups: {
          // baseReact: {
          //   test: /(react|react-dom)/,
          //   name: 'baseReact',
          //   chunks: 'all',
          //   priority: 0,
          // },
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'all',
            priority: -10,
          }
        }
      },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                      comments: false,
                    },
                    compress: {
                        // drop_console: true,
                        // drop_debugger: true,
                        // pure_funcs: ['console.log']
                    }
                  },
                  extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions:{
                    safe:true,
                    autoprefixer: {disable:true},
                    mergeLonghand: false,
                    discardComments:{removeAll:true}
                }
              }),
        ],
        runtimeChunk: {   
          name: "manifest"
        }
    }
}

module.exports = merge(baseConfig,prodConfig);