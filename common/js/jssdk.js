//flutter与H5交互接口封装
function JsSdk(){
  this.callBackpoll = {}; //用来存放回调 
  
}
//定义ready事件，用来监听flutter webview桥接 native调用
JsSdk.prototype.deviceReady = function(){
  // 创建事件
  var event = document.createEvent('Event');
  // 定义事件名为'ready'.
  event.initEvent('ready', true, true);
  // 触发对象可以是任何元素或其他事件目标
  document.dispatchEvent(event);
}
//供flutter调用，用来获取数据
JsSdk.prototype.getFlutterResFun = function(res,callbackId){
  if(callbackId){//去除回调Id
    let cb = window.callBackpoll[callbackId]; //去除回调
    typeof cb == 'function' && cb(res);
    delete window.callBackpoll[callbackId];
  }else{
    console.log('getFlutterResFun--报错--找不到回调');
  }
}
//js调用flutter接口
JsSdk.prototype.exec = function(funId,params,callbackSuc,callbackFail){
  if(typeof window.JsBridgeInterface != 'object'){
    console.log('桥接失败');
    callbackFail('桥接失败');
  }
  if(callbackSuc){  //有返回值的情景
    let callbackId = Math.ceil(Math.random()*10000000); //回调函数对应的键--需要保证唯一性
    window.callBackpoll[callbackId] = callbackSuc;
    JsBridgeInterface.postMessage(JSON.stringify({funId:funId,data:params,callbackId: callbackId}));
  }else{ //无返回值的情况
    JsBridgeInterface.postMessage(JSON.stringify({funId:funId,data:params}));
  }
}

//ready  桥接函数  判断webview是否成功桥接
JsSdk.prototype.ready = function(){
  return new Promise((reslove,reject)=>{
    if(typeof window.JsBridgeInterface == 'object'){
      reslove('app');
    }else{
      document.addEventListener('ready',function(){
        reslove('app');
      },false);
    }
  });
}
//调用jssdk有返回值的情况
JsSdk.prototype.nativeIOOpration = async function(funId,params){
  return new Promise(async (reslove,reject)=>{
    await this.ready();
    this.exec(funId,params || {},(res)=>{reslove(res)},(e)=>{reject(e)});
  })
}

//调用jssdk无返回值的情况
JsSdk.prototype.nativeNoreturn = async function(funId,params){
  await this.ready();
  this.exec(funId,params);
}

//读取文件信息  params为 {key:['theme]}  key为要读取的内容的key
JsSdk.prototype.getFileData = function(params){
  return this.nativeIOOpration('1000',params);
}

//设置title params为 {title:'',navBarColor:''}  title为标题，navBarColor为title栏颜色 暂时还没有实现定制左右按钮的功能
JsSdk.prototype.setTitle = function(params){
  this.nativeNoreturn('1001',params);
}

//打开新的webview 
/**
 * 
 * params为 {url:'',title:'',fullScrenn:'', type:''}  
 * url为新打开页面的地址
 * title为新打开页面的标题，
 * fullScrenn为是否以全面屏（即没有原生titlebar）的形式打开webview 默认为false
 * type为打开webview的类型，1-表示打开fluter页面  2-表示打开webapp页面 默认为webapp页面
 * needclose---表示在打开新的webview时，是否需要移除当前的webview。  1--表示不移除   2---表示移除  默认为1
 */
JsSdk.prototype.openWebview = function(params){
  this.nativeNoreturn('1002',{type:2,needclose:1,...params});
}

//关闭当前webview
/**
 * 
 * params为 { type:''} 
 * type表示关闭类型 type-1:表示关闭当前webview  type-2 表示回退到跟路由  
 *
 * 
 */
JsSdk.prototype.close = function(params){
  this.nativeNoreturn('1003',{type:1,...params});
}

//向客户端写入持久性数据
/**
 * 
 * params为 { key:value} 
 *
 * 
 */
JsSdk.prototype.writeData = function(params){
  this.nativeNoreturn('1004',params);
}


const JSSDK = new JsSdk();
window.JSSDK = JSSDK;
window.callBackpoll = JSSDK.callBackpoll;
window.deviceReady = JSSDK.deviceReady;
window.getFlutterResFun = JSSDK.getFlutterResFun;

/**
 * 1000:读取客户端存储信息 
 */