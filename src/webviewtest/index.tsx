import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import styles from './wt.less'
import Vconsole from 'vconsole';

function WebViewTest(){

  const [testUrl,setTestUrl] = useState('http://39.99.174.23/zhifututor/build/login-page.html');

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
  async function testJssdk(keyD:string){
    console.log('read file');
    const data = await JSSDK.getFileData({key:[keyD]});
    console.log(data,'1111');
  }

  

  return (
    <div className={styles.box}>
      <p onClick={()=>{testJssdk('themes')}}>js 调用 Flutter</p>
      <p onClick={()=>{JSSDK.setTitle({title:'js设置的标题',navBarColor:'#FFB6C1'});}}>设置title</p>
      <p className={styles['third']}>
        <input type="text" onChange={(e)=>{setTestUrl(e.target.value)}} placeholder='http://39.99.174.23/zhifututor/build/login-page.html'/>
        <p onClick={()=>{console.log(testUrl);JSSDK.openWebview({url:testUrl,title:'new webview',hasInput:true})}}>打开新的webview</p>
      </p>
      <p onClick={()=>{JSSDK.close({type:1});}}>关闭当前webview</p>
      <p onClick={()=>{JSSDK.writeData({account:'74125455'})}}>向客户端写入数据</p>
      <p onClick={()=>{testJssdk('account')}}>读取客户端数据</p>
      
    </div>
  )

}
ReactDOM.render(
  <WebViewTest/>,
  document.getElementById('root')
);