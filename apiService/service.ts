import http from './http';
import {resData, resDataFail} from 'interface/response';
import {getUserUrl, registerUrl, gettokenUrl, validatetokenUrl} from 'constant/apiUrl';

const baseUrl: string = `${window.location.origin}/apiService/forward/api`;
function joint(obj_1:object,obj_2:object){
  return Object.assign(obj_1,obj_2);
}

//注册接口
export function register(data:any):Promise<resData | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.user.register'},data));
}
//登录接口
export function login(data:any):Promise<resData | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.user.login'},data));
}



