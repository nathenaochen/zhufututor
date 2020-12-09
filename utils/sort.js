// const demo = ['1.0.0', '2.12.1', '1.2.3.4.5.6.7', '0.18.1'];
// function sortVersion(arr){
//   for (var i = 0; i < arr.length - 1; i++) {
//     for (var j = 0; j < arr.length - 1 - i; j++) {
//       if (arr[j] > arr[j+1]) {
//         var temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//       }
//     }
//   }
//   return arr;
// }
// console.log(sortVersion(demo));



// function NetReq(num){
//   this.num = num; //最大同时请求个数
//   this.nowNum = 0; //正在请求的个数
//   this.wait = []; //等待的请求
// }
// NetReq.prototype.setReq = async function(reqfn,paramas){
//   // console.log(this.wait,'wait',this.nowNum,paramas);
//   if(this.nowNum > 2){
//     this.wait.push({fn:reqfn,par:paramas});
//     return;
//   }
//   this.nowNum = this.nowNum + 1;
//   var res;
//   res = await reqfn(paramas);
//   this.nowNum = this.nowNum - 1;
//   if(this.wait.length > 0){console.log(1,this.wait.length);
//     res = await this.wait[0].fn(this.wait[0].par);
//     this.wait.unshift();
//   }
//   // console.log('---',res);
//   return res;
// }

// function test(num){
//   setTimeout(()=>{
//     console.log(num);
//     return num;
//   },1000)
// }
// let obj = new NetReq(3);
// obj.setReq(test,1);
// obj.setReq(test,2);
// obj.setReq(test,3);
// obj.setReq(test,4);
// obj.setReq(test,5);
// obj.setReq(test,6);
// obj.setReq(test,7);
// obj.setReq(test,8);
// obj.setReq(test,9);

// function NetReq(num){
//   this.num = num; //最大同时请求个数
//   this.nowNum = 0; //正在请求的个数
//   this.wait = []; //等待的请求
// }
// NetReq.prototype.setReq = async function(reqfn,paramas,time,cb){
//   // console.log(this.wait,'wait',this.nowNum,paramas);
//   if(this.nowNum > 2){
//     this.wait.push({fn:reqfn,par:paramas,ti:time});
//     return;
//   }
//   this.nowNum = this.nowNum + 1;
//   var res;
//   res = await reqfn(paramas,time);
//   this.nowNum = this.nowNum - 1;
//   if(this.wait.length > 0){
//     // console.log(1,this.wait.length,res);
//     // this.setReq(this.wait[0].fn,this.wait[0].par);
//     let obj = this.wait.shift();
//     this.setReq(obj.fn,obj.par,obj.ti);
//   }
//   // console.log(res,'res');
//   cb && cb(res);
//   // return res;
// }

// function test(num,time){
//   // console.log(time,'--');
//   return new Promise((reslove)=>{
//     setTimeout(()=>{
//       console.log(num);
//       reslove(num)
//     },time || 1000)
//   })
// }
// let obj = new NetReq(3);
// obj.setReq(test,1,1000,(data)=>{console.log(data,'---')});
// obj.setReq(test,2,20);
// obj.setReq(test,3,500);
// obj.setReq(test,4,500);
// obj.setReq(test,5,10);
// obj.setReq(test,6,90);
// obj.setReq(test,7);
// obj.setReq(test,8);
// async function aa(){
//   const abc = await obj.setReq(test,9);
//   console.log(abc,'--');
// }
// aa();


// function multiRequest(urls, maxNum){
//   let firstReqUrl = urls.splice(0,maxNum);
//   for(let i = 0; i < firstReqUrl.length; i++){
//     setReq(firstReqUrl[i])
//   }
  
//   async function setReq(reqinfo){
//     const res = await reqinfo.fn(reqinfo.paramas.num,reqinfo.paramas.time);
//     if(urls.length > 0){
//       let reqInfoObj = urls.shift();
//       setReq(reqInfoObj);
//     }
//     reqinfo.cb(res);
//   }

// }

// multiRequest([
//   {fn:test,paramas:{num:1,time:100},cb:(data)=>{console.log(data,'---')}},
//   {fn:test,paramas:{num:2,time:100},cb:(data)=>{console.log(data,'---')}},
//   {fn:test,paramas:{num:3,time:1000},cb:(data)=>{console.log(data,'---')}},
//   {fn:test,paramas:{num:4,time:100},cb:(data)=>{console.log(data,'---')}},
//   {fn:test,paramas:{num:5,time:50},cb:(data)=>{console.log(data,'---')}},
//   {fn:test,paramas:{num:6,time:1000},cb:(data)=>{console.log(data,'---')}},
//   {fn:test,paramas:{num:7,time:1000},cb:(data)=>{console.log(data,'---')}},],
// 3);

// function test(num,time){
//   // console.log(time,'--');
//   return new Promise((reslove)=>{
//     setTimeout(()=>{
//       // console.log(num);
//       reslove(num)
//     },time || 1000)
//   })
// }

//priomise--初级版本，只实现了reslove核心功能
//  function Mypromise(fn){
//   this.cbLoop = [];  //callback回调队列
//   const reslove = (data) => {
//     this.value = data;
//     this.cbLoop.map((fn)=>{fn()});
//   };
//   fn(reslove);
//  }
//  Mypromise.prototype.then = function(cb){
//   return new Mypromise((reslove)=>{
//     this.cbLoop.push(async ()=>{
//       const res = await cb(this.value);
//       if(res instanceof Mypromise){
//         res.then(reslove);
//       }else{
//         reslove(res)
//       }
//     });
//   });
//  } 

//  let mypromise = new Mypromise((reslove)=>{
//     setTimeout(()=>{
//       reslove(100);
//     },2000);
//  });
//  mypromise.then((data)=>{
//   console.log(data);
//   return new Mypromise((reslove)=>{
//     setTimeout(()=>{
//       reslove(1);
//     },2000);
//   });
//  }).then((data)=>{
//   console.log(data)
//  });




//  function Mypromise(fn){
//   this.cbLoop = [];  //reslove--callback回调队列
//   this.rejectCbLoop = [];  //reject--callback回调队列
//   const reslove = (data) => {
//     setTimeout(()=>{
//       this.value = data;
//       this.cbLoop.map((fn)=>{fn()});
//     });
//   };
//   const reject = (data) => {
//     this.Rejctvalue = data;
//     this.rejectCbLoop.map((fn)=>{fn()});
//   };
//   fn(reslove,reject);
//  }
//  Mypromise.prototype.then = function(cbScu,cbFail){
//   return new Mypromise((reslove)=>{
//     this.cbLoop.push(()=>{
//       const res = cbScu(this.value);
//       if(res instanceof Mypromise){
//         res.then(reslove);
//       }else{
//         reslove(res)
//       }
//     });
//     // this.cbLoop.push(async ()=>{
//     //   const res = await cbScu(this.value);
//     //   reslove(res);
//     // });
//     this.rejectCbLoop.push(async ()=>{
//       const res = await cbFail(this.Rejctvalue);
//       if(res instanceof Mypromise){
//         res.then(reslove);
//       }else{
//         reslove(res)
//       }
//     });
//   });
//  } 

//  let mypromise = new Mypromise((reslove,rej)=>{
//     // setTimeout(()=>{
//     //   reslove(100);
//     //   // rej('我就是要reject')
//     // },2000);
//     reslove(100);
//  });
//  mypromise.then((data)=>{
//   console.log(data);
//   return new Mypromise((reslove)=>{
//     setTimeout(()=>{
//       reslove(1);
//     },5000);
//   });
//  },(err)=>{
//   console.log(err);
// }).then((data)=>{
//   console.log(data)
//  });
//  console.log(99);

//手动实现call方法
// var a = 2;
// Function.prototype.call_1 = function(context){
//   context = context || window;
//   let argu = [];
//   for(var i = 1; i < arguments.length; i++){
//     argu.push(arguments[i]);
//   }
//   context.self = this;
//   var res = eval('context.self('+argu+')');
//   delete context.self;
//   return res;
// }
// let obj = {a:8};
// function fn(a,b,c) {
//   console.log(this.a);
//   console.log(a);
//   console.log(b);
//   return 9999;
// }
// console.log(fn.call_1(obj,1,2,3));

//手动实现apply方法
// var a = 2;
// Function.prototype.apply_1 = function(context,arrArgu){
//   context = context || window;
//   arrArgu = arrArgu || [];
//   context.self = this;
//   var res = eval('context.self('+arrArgu+')');
//   delete context.self;
//   return res;
// }
// let obj = {a:8};
// function fn(a,b,c) {
//   console.log(this.a);
//   console.log(a);
//   console.log(b);
//   return 9999;
// }
// console.log(fn.apply_1(obj,[1,2]));


//手动实现bind方法
// var a = 5566;
// Function.prototype.bind_1 = function(context){
//   if (typeof this !== "function") {
//     throw new Error("what is trying to be bound is not function");
//   }
//   context = context || window;  //不传默认指向window
//   var self = this;
//   //获取剩余参数
//   var argus = Array.prototype.slice.call(arguments,1);
//   var bindFun = function() {
//     return self.apply(this instanceof bindFun ? this : context,argus.concat(Array.prototype.slice.call(arguments)));
//   }
//   return bindFun;
// }
// let obj = {a:8};
//  function fn(a,b,c) {
//   console.log(this.name = 'kk');
//   console.log(a);
//   console.log(b);
//   console.log(c);
//   // return 9999;
// }
// let fn1 = fn.bind_1(obj,1,2);
// console.log(fn1(3));



// new Promise((reslove,reject)=>{
//   console.log('promise 1',1);
//   reslove();
// }).then(()=>{ 
//   console.log('then11',2);
//   new Promise((reslove,reject)=>{
//     console.log('promise 2',3);
//     reslove();
//   })
//   .then(()=>{
//     console.log('then21',4);
//     new Promise((reslove,reject)=>{
//       console.log('promise 3',5);
//       // setTimeout(()=>{ reslove();},500)
//       reslove();
//       console.log(3121);
//     })
//     .then(()=>{console.log('then31',7)})
//     .then(()=>{console.log('then32',9)})
// }).then(()=>{
//   console.log('then22',8)
//   })
//   console.log(3111);
// }).then(()=>{
//   console.log('then12',6);
// })


//手动实现new  cons为构造函数
// function createObjFun(cons){
//   var obj = {};
//   obj.__proto__ = cons.prototype;
//   var res = cons.apply(obj,Array.prototype.slice.call(arguments,1)); 
//   return (typeof res == 'object' || typeof res == 'function') ? res || obj : obj
// }

// function Person(name,age){
//   this.name = name;
//   this.age = age;
  
//   return 1
// }
// Person.prototype.sayHi = function (){
//   console.log('Hi my name is ' + this.name);
// }
// let obj = createObjFun(Person,'jack',13)

// console.log(obj);
// obj.sayHi();
// console.log(obj.__proto__ === Person.prototype);
// console.log(obj.__proto__ === Object.prototype);
// console.log(obj instanceof Person);
// console.log(obj instanceof Object);


// Array.from = undefined;


if(!Array.from){
  Array.from = function(arraylike){
    return Array.prototype.slice.call(arraylike);
  }
}

var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
console.log(Array.from(arrayLike));