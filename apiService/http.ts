import axios, {AxiosInstance,AxiosRequestConfig} from 'axios';
class Http{
  instance: AxiosInstance;
  constructor(){
    this.instance  = axios.create({timeout:5000});
    //全局默认使用json头
    this.instance.defaults.headers['Content-Type'] = 'application/json';

    // this.instance.defaults.transformResponse = [(data:any)=>{
    //   // console.log(data); 
    //   return data as resData;
    // }];

    // 添加请求拦截器
    this.instance.interceptors.request.use((config) => {
      if(config?.data?.withtoken){
        config.headers['Authorization'] = 'Bearer ' + config?.data?.withtoken;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    // 添加响应拦截器
    this.instance.interceptors.response.use((value)=>{
      return value.data;
    },(err)=>{
      return Promise.reject(err.response.data);
    })

  }
}

const http = new Http();

export default http.instance;