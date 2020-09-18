import http from './http';
import {resData, resDataFail} from 'interface/response';
import {getUserUrl, registerUrl, gettokenUrl, validatetokenUrl} from 'constant/apiUrl';

const baseUrl: string = `${window.location.origin}/apiService/forward/api`;
function joint(obj_1:object,obj_2:object){
  return Object.assign(obj_1,obj_2);
}

export function getUser(data:any):Promise<resData | resDataFail>{
  return http.get(getUserUrl,{params:data});
}

export function register(data:any):Promise<resData | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.user.register'},data));
}

export function getToken(data:any):Promise<resData | resDataFail>{
  return http.post(gettokenUrl,data);
}

export function validatetoken(data:any):Promise<resData | resDataFail>{
  return http.post(validatetokenUrl,data);
}