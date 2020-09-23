
import {openViewParams} from 'interface/jssdkParams';


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
      window.location.href = config.url;
    }else{
      //因为开发环境（即浏览器端没有build） 所以需要单独判断
      if(location.href.indexOf('localhost') > -1){
        window.location.href = location.origin + '/' + config.url;
      }else{
        window.location.href = location.href.split('build')[0] + 'build/' + config.url;
      }
    }
  }
}