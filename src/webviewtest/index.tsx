import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './wt.less'
import Vconsole from 'vconsole';

function WebViewTest(){

  useEffect(()=>{
    new Vconsole();
    console.log('init');
  },[]);

  async function flutterCallJs(){
    console.log('flutter 调用我啦');
    return 'lalalal'
  }

  // async function CallFlutter_1(msg,cb){
  //   console.log(Toaster);
  //   const res = await Toaster.postMessage(msg);
  //   // console.log(res,'flutter');
  // }

  //测试jssdk
  async function testJssdk(){
    console.log('read file');
    const data = await JSSDK.getFileData({key:["theme"]});
    console.log(data,'1111');
  }

  

  return (
    <div className={styles.box}>
      <p>我是H5页面</p>
      {/* <button onClick={}>Flutter 调用 js</button> */}
      <button onClick={()=>{testJssdk()}}>js 调用 Flutter</button>
      <button onClick={()=>{JSSDK.setTitle({title:'js设置的标题',navBarColor:'#FFB6C1'});}}>设置title</button>
      <button onClick={()=>{JSSDK.openWebview({url:'https://www.baidu.com/',title:'new webview'})}}>打开新的webview</button>
    </div>
  )

}
ReactDOM.render(
  <WebViewTest/>,
  document.getElementById('root')
);