import http from './http';
import {resData, resDataFail, registerRes, getTeacherLisRes} from 'interface/response';

const baseUrl: string = `${window.location.origin}/apiService/forward/api`;
function joint(obj_1:object,obj_2:object){
  return Object.assign(obj_1,obj_2);
}

//注册接口
export function register(data:any):Promise<resData<registerRes> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.user.register'},data));
}
//登录接口
export function login(data:any):Promise<resData<registerRes> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.user.login'},data));
}

//查询教师列表接口
export function getTeacherList(data:any):Promise<resData<getTeacherLisRes[]> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.teacher.teacherList'},data));
}

//查询教师详情接口
export function getTeacherDetail(data:any):Promise<resData<getTeacherLisRes> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.teacher.teacherDetail'},data));
}


