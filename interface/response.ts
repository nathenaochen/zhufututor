import { getTeacherList } from "apiService/service";

export interface resData<T>{
  code: string;
  result: T;
  errorMeg?: object | string;
}
export interface resDataFail{
  code: string;
  result: Result;
  errorMeg: object | string;
}
export interface Result{
  [x:string]: any 
}

//注册,登陆接口返回数据
export interface registerRes{
  user: user;
  msg: string;
  errorMeg: any;
}
export interface user{
  username: string;
  key: string;
  account: string;
  type: string;
}

//获取教师列表返回数据
export interface getTeacherLisRes{
  account: string;
  key:string;
  name: string;
  sex: string;
  free_time: string;
  school_tag: string;
  degree: string;
  teaching_time: string;
  charge: string;
  teach_class: string;
  teach_project: string;
  header_img: string;
  teacher_level: string;
  gethonor: string;
  personal_introl: string;
  teach_feature: string;
  zuoyouming: string;
}

//获取教学生列表返回数据
export interface getStudentLisRes{
  name: string;
  sex: string;
  free_time: string;
  class: string;
  subject: string;
  header_img: string;
  charge: string;
  key:string;
  request:string;
  zuoyouming: string;
  account: string;
}
