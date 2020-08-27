import http from './http';
import {resData, resDataFail} from 'interface/response';
import {getUserUrl, registerUrl, gettokenUrl, validatetokenUrl} from 'constant/apiUrl';

export function getUser(data:any):Promise<resData | resDataFail>{
  return http.get(getUserUrl,{params:data});
}

export function register(data:any):Promise<resData | resDataFail>{
  return http.post(registerUrl,data);
}

export function getToken(data:any):Promise<resData | resDataFail>{
  return http.post(gettokenUrl,data);
}

export function validatetoken(data:any):Promise<resData | resDataFail>{
  return http.post(validatetokenUrl,data);
}