//多页应用所有的页面，用于配置页面标题和chunck,
// title为该页面标题，pageName为页面项目名称

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [
    {
        'title':'首页',
        'pageName': 'index'
    }
]

var entry = {};
var htmlPage = [];

const setMAP = (projectPath) => {
    pages.map((item)=>{
      const {title,pageName} = item;
      if(item){
        // console.log(path.resolve(projectPath,`${pageName}/index.js`));
        entry[pageName] = path.resolve(projectPath,`${pageName}/index.tsx`);
        htmlPage.push(new HtmlWebpackPlugin({
          template: path.resolve(__dirname,'./index.html'),
          filename: `${pageName}.html`,
          chunks: ['manifest','baseReact','vendor',pageName],
          title: title,
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
          }
        }))
      }
    });
    return {
      'entry':entry,
      'htmlPage':htmlPage
    }
   }
module.exports = setMAP;
