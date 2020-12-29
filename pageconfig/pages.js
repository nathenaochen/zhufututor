//多页应用所有的页面，用于配置页面标题和chunck,
// title为该页面标题，pageName为页面项目名称

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [
    {
        'title':'首页',
        'pageName': 'index'
    },
    {
      'title':'消息列表',
      'pageName': 'message'
    },
    {
      'title':'我的',
      'pageName': 'me'
    },
    {
      'title':'教师详情页',
      'pageName': 'teacher-detial'
    },
    {
      'title':'设置',
      'pageName': 'setting'
    },
    {
      'title':'登陆',
      'pageName': 'login-page'
    },
    {
      'title':'注册',
      'pageName': 'register'
    },
    {
      'title':'聊天',
      'pageName': 'test-chat'
    },
    {
      'title':'学生详情页',
      'pageName': 'student-detail'
    },
    {
      'title':'信息完善',
      'pageName': 'complete-message'
    },
    {
      'title':'test',
      'pageName': 'test'
    },
    {
      'title':'Jssdk Test',
      'pageName': 'webviewtest'
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
