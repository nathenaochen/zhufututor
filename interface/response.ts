export interface resData{
  code: string;
  result: Result;
}
export interface resDataFail{
  code: string;
  result: Result;
  errorMeg: object | string;
}
interface Result{
  [x:string]: any 
}