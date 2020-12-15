import http from './http';
import {resData, resDataFail, registerRes, getTeacherLisRes, Result,getStudentLisRes} from 'interface/response';

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

//完善教师信息接口
export function completeTeacherMessage(data:any):Promise<resData<boolean> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.teacher.complete'},data));
}

//查询最近联系好友列表
export function getRecentList(data:any):Promise<resData<Result> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.chat.recentlist'},data));
}

//查询历史聊天记录
export function getHistoryChat(data:any):Promise<resData<Result> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.chat.chatdetail'},data));
}

//查询学生列表接口
export function getStudentList(data:any):Promise<resData<getStudentLisRes[]> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.student.studentList'},data));
}

//查询学生详情接口
export function getStudentDetail(data:any):Promise<resData<getStudentLisRes> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.student.studentDetail'},data));
}

//完善学生信息接口
export function completeStudentMessage(data:any):Promise<resData<boolean> | resDataFail>{
  return http.post(baseUrl,joint({snType:'sas',serviceName:'serviceName.student.complete'},data));
}
