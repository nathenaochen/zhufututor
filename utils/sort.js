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
//   // var res = context.self(argu.join(','));
//   delete context.self;
//   return res;
// }
// let obj = {a:8};
// function fn(a,b,c) {
//   console.log(this.a);
//   console.log(a);
//   console.log(b);
//   console.log(c);
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


// if(!Array.from){
//   Array.from = function(arraylike){
//     return Array.prototype.slice.call(arraylike);
//   }
// }

// var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// console.log(Array.from(arrayLike));

// const list = [1, 2, 3]
// const square = num => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(num * num)
//     }, 1000)
//   })
// }

// async function test() {
//   // list.forEach(async x=> {
//     // const res = await square(x)
//     // console.log(res)
//   // })
//   for(var i = 0; i < list.length; i++){
//     const res = await square(list[i])
//     console.log(res)
//   }
// }
// test()

// Promise.resty = function(fn,times){
//   let count = 1;
//   return new Promise(async (res,rej)=>{
//     while(count <= times){
//       try{
//         const result = await fn();
//         res(result);
//         break;
//       }catch(err){
//         console.log('开始第'+ count +'重试');
//         count = count + 1;
//         if(count > times){rej('报错')}
//       }
//     }
//   })
// }

// function getProm() {
//   const n = Math.random();
//   return new Promise((resolve, reject) => {
//       setTimeout(() =>  n > 0.5 ? resolve(n) : reject(n), 1000);
//   });
// }

// Promise.resty(getProm,3).then((res)=>{
//   console.log('111',res);
// }).catch((e)=>{
//   console.log('222',e);
// });

// Promise.resty(getProm,3).then((res)=>{
//   console.log('111',res);
// },(e)=>{
//   console.log('222',e);
// });

// if(!('a' in window)){
//   var a = 1;
// }
// console.log(a);

// console.log(a);
// var a = 1;
// var b = function a(){}
// console.log(a);

/**
 * 考察this
 */
// var value = 1;
// var foo = {
//   value: 2,
//   bar: function () {
//     var value = 3;
//     return this.value;
//   }
// }
// 说一说我的理解吧，四个输出结果中，前两个是一样的，第二个输出语句中给表达式加了括号，
// 而括号的作用是改变表达式的运算顺序，而在这里加与不加括号并无影响；第三,第四个和第五个其实道理是一样的，
//  涉及三个运算符号，即“=”（赋值运算符），“||”（或运算符）和“,”（叫什么运算符忘了）。“=”运算符的返回值是等号右边的表达式，
//  “，”运算符的返回值是最后面一个。
//  那为什么最后this.a指向的是全局的10呢？我的理解是这两个运算符的返回值仅仅是一个函数bar，并不包括foo对象，
//  这样this就是指向全局的window，所以a的值是10。
// console.log(foo.bar());//2
// console.log((foo.bar)());//2
// console.log((foo.bar = foo.bar)()); //1 同下
// console.log((false || foo.bar)()); //1 (false || foo.bar）的返回值是foo.bar这个函数体，然后一个函数单独执行，相当于fn()这么直接调用，并不是通过foo.bar来调用
// console.log((foo.bar, foo.bar)());//1 同上

/**
 * 用setTimeout实现setInterval 和 clearInterval
 */
// function _setInterVal(fn,time){
//   let id = {};
//   function setFn(){
//     id.target && clearTimeout(id.target);
//     fn();
//     id.tartget = setTimeout(setFn,time);
//   }
//   id.target = setTimeout(setFn,time);
//   return id;
// }
// let returnId = _setInterVal(()=>{console.log('111')},1000);

// function _clearInterval(id){
//   clearTimeout(id);
// }

// setTimeout(()=>{_clearInterval(returnId.tartget)},10100);

/**
 * 用链表来实现队列
 */
// class Node {
//   constructor(value){
//     this.value = value;
//     this.next = null;
//   }
// }

// class QueueBasedOnLinkedList {
//   constructor(){
//     this.head = null;
//     this.tail = null;
//   }

//   enqueue(value){
//     if(this.head == null){
//       let node = new Node(value);
//       this.head = node;
//       this.tail = this.head;
//       return value;
//     }else{
//       let node = new Node(value);
//       this.tail.next = node;
//       this.tail = this.tail.next;
//       return value
//     }
//   }

//   dequeue(){
//     if(this.head == null){
//       return -1;
//     }
//     let value = this.head.value;
//     this.head = this.head.next;
//     return value;
//   }
// }

// // Test
// const newQueue = new QueueBasedOnLinkedList()
// // 插入元素
// newQueue.enqueue(1)
// newQueue.enqueue(2)
// newQueue.enqueue(3)
// // 获取元素
// let res = 0
// console.log('-------获取dequeue元素------',(3+1)%8)
// while (res !== -1) {
//     res = newQueue.dequeue()
//     console.log(res)
// }

/**
 * 用数组实现循环队列  队空判断条件为 this.head == this.tail  队满判断条件为 (this.tail + 1) % (this.len) == this.head
 */
// class LoopArray {
//   constructor(len){
//     this.len = len;  //循环队列长度
//     this.items = new Array(len);  //循环队列
//     this.head = 0;//队首
//     this.tail = 0;//队尾
//   }

//   enqueue(value){
//     // console.log(this.tail,'111');
//     if(((this.tail + 1) % (this.len)) == this.head){
//       return false;
//     }
//     this.items[this.tail] = value;
//     this.tail = (this.tail + 1) % (this.len);
//     // console.log(this.tail);
//     return true;

//   }

//   dequeue(){
//     // console.log(this.items);
//     if(this.head == this.tail){return -1}
//     const value = this.items[this.head];
//     this.head = (this.head + 1) % (this.len );
//     return value;
//   }
// }

// // Test
// const newQueue = new LoopArray(5)
// // 插入元素
// newQueue.enqueue(1)
// newQueue.enqueue(2)
// newQueue.enqueue(3)
// newQueue.enqueue(4)
// newQueue.enqueue(5)
// console.log('-------获取dequeue元素------',newQueue)
// newQueue.dequeue()
// newQueue.dequeue()
// newQueue.dequeue()
// console.log('-------获取dequeue元素------',newQueue)
// newQueue.enqueue(6)
// newQueue.enqueue(7)
// newQueue.enqueue(8)
// newQueue.enqueue(9)
// console.log('-------获取dequeue元素------',newQueue)
// console.log(newQueue.dequeue());

// newQueue.enqueue(9)
// console.log('-------获取dequeue元素------',newQueue)
// newQueue.enqueue(6)
// 获取元素
// let res = 0
// console.log('-------获取dequeue元素------',newQueue)
// while (res !== -1) {
//     res = newQueue.dequeue()
//     console.log(res)
// }

/**
 * 手动模拟new  1.创建一个obj对象 2.将obj的__proto__属性指向函数的prototype 3.将函数的this指向obj 4.返回obj
 */
// function newObj(fn){
//   //获取剩余参数
//   var argus = Array.prototype.slice.call(arguments,1);
//   let obj = {};
//   obj.__proto__ = fn.prototype;
//   let res = fn.apply(obj,argus);
//   return typeof res === 'undefined' ? obj : res;
// }

// function deDance(fn,time = 300){
//   let id;
//   return function(...argus){
//     id && clearTimeout(id);
//     id = setTimeout(()=>{
//       fn.apply(this,argus);
//     },time);
//   }
// }

/**
 * 手动模拟继承 sons-父类构造函数的私有属性 supe--父类构造函数
 */
// function createClass(sons, supe){

//   function fn(age){
//     supe.apply(this,sons);
//     this.age = age; //子类私有属性
//   }

//   fn.prototype = Object.create(supe.prototype);
//   fn.prototype.constructor = fn;

//   return fn;
// } 

// function Parent() {
//   this.name = 'fedaily'
// }

/**
 * 实现对象的深拷贝
 */
// function copyObj(params){
//   if(typeof params !== 'object'){
//     return params;
//   }
//   let cur = Array.isArray(params) ? [] : {};
//   for(let key in params){
//     cur[key] = copyObj(params[key])
//   }
//   return cur;
// }

/**
 * 实现函数的柯里化
 */
function curry(fn){
  return function curried(){
    let argus = Array.prototype.slice.call(arguments);
    if(argus.length >= fn.length){
      return fn.apply(this,argus);
    }else{
      return function(){
        let argus_2 = Array.prototype.slice.call(arguments);
        return curried.apply(this,argus.concat(argus_2));
      }
    }
  }
}