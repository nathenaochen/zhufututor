
//判断检查是否在app内
export async function checkIsApp(){
  let value = await Promise.race([JSSDK.ready(),new Promise((res)=>{setTimeout(()=>{res(11)},100)})]);
  return value == 'app' ? true : false;
}

//打开新页面，兼容web与app
export function pageInit(url:string) {
  if(isApp){
    JSSDK.openWebview({url:url,title:''});
  }else{
    window.location.href = url;
  }
}