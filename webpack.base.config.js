const path = require('path');

const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const setMAP = require('./pageconfig/pages');

const BASE_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(BASE_PATH,'src');
const BUILD_PATH = path.resolve(BASE_PATH,'build');

const {entry,htmlPage} = setMAP(SRC_PATH);

const baseConfig = {
    entry:entry,
    output:{
        path:BUILD_PATH,
        filename: '[name]_[chunkhash:8].js',
        chunkFilename: '[name]_[chunkhash:8].js'
    },
    externals:{
        "react":'React',
        "react-dom":'ReactDOM'
      },
    module:{
        rules:[
            {
                test:/\.(ts|tsx)$/,
                use:'babel-loader',
                exclude:/node_modules/
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg|bmp)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 1024,
                      outputPath: 'images',
                      name: '[name]_[hash:8].[ext]'
                    }
                  }
                ]
            },
            {
            test: /\.(woff|woff2|eot|ttf|otf)/,
            use: 'fiel-loader'
            }  
        ]
    },
    resolve:{
        alias:{
            components:path.resolve(BASE_PATH,'./components'),
            apiService:path.resolve(BASE_PATH,'./apiService'),
            constant:path.resolve(BASE_PATH,'./constant'),
            interface:path.resolve(BASE_PATH,'./interface'),
        },
        extensions:['.js','.ts','.tsx'],
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "EVN": JSON.stringify(process.env.NODE_ENV)
          }),
    ].concat(htmlPage),
   
}

module.exports = baseConfig;