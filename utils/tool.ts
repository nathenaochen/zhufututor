
import {openViewParams} from 'interface/jssdkParams';
import URI from 'urijs';


//判断检查是否在app内
export async function checkIsApp(){
  let value = await Promise.race([JSSDK.ready(),new Promise((res)=>{setTimeout(()=>{res(11)},100)})]);
  return value == 'app' ? true : false;
}

//打开新页面，兼容web与app  本项目可传相对路径 其他项目需要传全路径
export function pageInit(config:openViewParams) {
  if(!config.url) return;
  //判断是否在app内
  if(isApp){
    if(config.url.indexOf('http') > -1){  //判断是否传的全路径
      JSSDK.openWebview(config);
    }else{
      if(config.type == 1){  //判断跳转类型  1为跳转到fluter路由
        JSSDK.openWebview(config);
      }else{
        config.url = location.href.split('build')[0] + 'build/' + config.url;
        JSSDK.openWebview(config);
      }
    }
  }else{
    if(config.url.indexOf('http') > -1){
      if(config.needclose == 2){
        window.history.replaceState(null, '', config.url);
      }else{
        window.location.href = config.url;
      }
    }else{
      //因为开发环境（即浏览器端没有build） 所以需要单独判断
      if(location.href.indexOf('localhost') > -1){
        if(config.needclose == 2){
          window.location.replace(location.origin + '/' + config.url);
        }else{
          window.location.href = location.origin + '/' + config.url;
        }
      }else{
        if(config.needclose == 2){
          window.location.replace(location.href.split('build')[0] + 'build/' + config.url);
        }else{
          window.location.href = location.href.split('build')[0] + 'build/' + config.url;
        }
        
      }
    }
  }
}

/**
 * 获取真实像素值 用于在通过js设置像素时来调用，做到适配
 * rawPx: 需要转化的像素值  number类型
 * relativeSize： 转化的相对单位，默认为75，即iphone6
 */
export function px(rawPx:number,relativeSize = 75):number{
  //获取当前
  let htmlFontSize = parseFloat(document.documentElement.style.fontSize);
  return ((+htmlFontSize)*rawPx)/relativeSize;

}

/**
 * 获取ur上的query
 */

 export function getUrlQuery(){
   const url = new URI(window.location.href);
   return url.query(true);
 }

 /**
  * 封装localStorage
  * set方法想localStorage存值 参数：对象
  * get方法从localStorage取值 参数： 数组
  */
 export const storage = {
   set: function(setObj:any){
    if(setObj.constructor !== Object){
      console.log('--参数有错误--storag.set');
      return null;
    };
    let keys = Object.keys(setObj);
    keys.forEach((v:string,i:number)=>{
      let strVal = setObj[v] ? JSON.stringify(setObj[v]) : '';
      localStorage.setItem(v,strVal);
    });
   },
   get: function(keys:Array<string>){
    if(keys.constructor !== Array){
      console.log('--参数有错误--storag.get');
      return null;
    };
    let valObj: any = {};
    keys.forEach((k,i)=>{
      let val = localStorage.getItem(k);
      valObj[k] = val ? JSON.parse(val) : val;
    });
    return valObj;
   }
 }

 /**
  *  时间格式化
  *  */
export function format(data:any,type = 'y3',cf = '-'){
  let time = data ? new Date(+data) : new Date();
  let year = time.getFullYear();//年
  let month:string | number = time.getMonth() + 1;//月
  let day:string | number = time.getDate();//日
  let hour:string | number = time.getHours();//时
  let min:string | number = time.getMinutes();//分
  let sec:string | number = time.getSeconds();//秒

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hour = hour < 10 ? `0${hour}` : hour;
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;

  let timeObj:any = {
    'y1': `${year}`,
    'y2': `${year}${cf}${month}`,
    'y3': `${year}${cf}${month}${cf}${day}`,
    'y4': `${year}${cf}${month}${cf}${day} ${hour}`,
    'y5': `${year}${cf}${month}${cf}${day} ${hour}:${min}`,
    'y6': `${year}${cf}${month}${cf}${day} ${hour}:${min}:${sec}`,
    'm1': `${month}`,
    'm2': `${month}${cf}${day}`,
    'h2': `${hour}:${min}`
  }
  
  return timeObj[type];

}

/**
 * 判断时间是不会是今天
 */
export function isToday(time:any = +new Date(), server_time:any = +new Date()){
  return new Date(time).toLocaleDateString() === new Date(server_time).toLocaleDateString();
}

/**
 * 时间格式转换
 */
export function timeFromat(time:any,server_time?:any){
  if(!time){
    return '--'
  }

  //传过来的时间
  let formatTime = new Date(+time);
  let year = formatTime.getFullYear();//年
  let hour = formatTime.getHours();//时
  let min = formatTime.getMinutes();//分

  //现在的时间
  let nowtTime = server_time ? new Date(+server_time) : new Date();
  let nowyear = nowtTime.getFullYear();//年
  let nowhour = nowtTime.getHours();//时
  let nowmin = nowtTime.getMinutes();//分

  if(isToday(formatTime)){
    return format(formatTime,'h2',':');
  }else{
    if(year == nowyear){
      return format(formatTime,'m2');
    }else{
      return format(formatTime,'y3');
    }
  }
}