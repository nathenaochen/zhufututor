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

const { isBreakStatement } = require("typescript");



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
// function curry(fn){
//   return function curried(){
//     let argus = Array.prototype.slice.call(arguments);
//     if(argus.length >= fn.length){
//       return fn.apply(this,argus);
//     }else{
//       return function(){
//         let argus_2 = Array.prototype.slice.call(arguments);
//         return curried.apply(this,argus.concat(argus_2));
//       }
//     }
//   }
// }

// function copyObj(params){
//   if(typeof params != 'object'){
//     return params;
//   }
//   let cur = Array.isArray(params) ? [] : {};
//   for(let key in params){
//     if(params[key] instanceof Date){
//       cur[key] = new Date(params[key]);
//     }else if(params[key] instanceof RegExp){
//       cur[key] = new RegExp(params[key]);
//     }else if(typeof params[key] == 'object'){
//       cur[key] = copyObj(params[key]);
//     }else{
//       cur[key] = params[key];
//     }
//   }
//   return cur;
// }

// function fn1(next){
//   console.log(1);
//   next();
//   console.log(2);
// }
// function fn2(next){
//   console.log(3);
//   next();
//   console.log(4);
// }
// let fn3 = compose([fn1,fn2])()



// function compose(arg){
//   return function(){
//     let fn1 = arg[0];
//     let fn2 = arg[1].bind(null,function(){})
//     fn1(fn2);
//   }
// }

const arr = [
  {id:1, parentId: null, name: 'a'},
  {id:2, parentId: null, name: 'b'},
  {id:3, parentId: 1, name: 'c'},
  {id:4, parentId: 2, name: 'd'},
  {id:5, parentId: 1, name: 'e'},
  {id:6, parentId: 3, name: 'f'},
  {id:7, parentId: 4, name: 'g'},
  {id:8, parentId: 7, name: 'h'},
  {id:9, parentId: 1, name: 'h'},
  {id:10, parentId: 5, name: 'h'},
]
function arrToTree(arr){
  if(!(arr instanceof Array)) return;
  let map = {}, res = [];
  arr.forEach((item,idx)=>{
    map[item.id] = item;
  })
  for(let key in map){
    let item = map[key];
    if(item.parentId){
      if(map[item.parentId].children){
        map[item.parentId].children.push(item);
      }else{
        map[item.parentId].children = [];
        map[item.parentId].children.push(item)
      }
    }else{
      res.push(item);
    }
  }
  return res;
}


// function arrToTree(arr,pid){
//   // if(!(arr instanceof Array)) return;
//   let res = [];
//   for(let item of arr){
//     if(item.parentId === pid){
//       let itemChildren = arrToTree(arr,item.id);
//       if(itemChildren.length) item.children = itemChildren;
//       res.push(item)
//     }
//   }
//   return res;
// }

// console.log(arrToTree(arr,null));


//树的深度优先遍历
function dfs(tree){
  let res = [];
  let statck = Array.isArray(tree) ? [...tree] : [tree];
  while(statck.length != 0){
    let node = statck.shift();
    console.log(node, '---');
    res.push(node);
    if(node.children && node.children.length){
      let len = node.children.length;
      for(let i = len - 1; i >= 0; i--){
        statck.unshift(node.children[i]);
      }
    }
    console.log(statck,'====')
  }
  return res;
}

//树的广度优先遍历
// function bfs(tree){
//   let res = [];
//   let statck = Array.isArray(tree) ? [...tree] : [tree];
//   while(statck.length != 0){
//     let node = statck.pop();
//     res.push(node);
//     if(node.children && node.children.length){
//       let len = node.children.length;
//       for(let i = 0; i < len; i++){
//         statck.push(node.children[i]);
//       }
//     }
//   }
//   return res;
// }

// console.log(bfs(arrToTree(arr)))

// function moneyFormat(number, decimals = '2', dec_point = '.', thousands_sep = ',') {
//   //对参数的合法性做校验
//   if(number === null || number === undefined || number === '') return '';
//   number = (number + '').replace(/[^0-9+-Ee.]/g, '');
//   let n = !isFinite(+number) ? 0 : +number;
//       prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
//       dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
//       sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
//       str = '',
//       toFixedNum = function(num,prec) {
//         let k = Math.pow(10,prec);
//         return '' + Math.round(num * k) / k;
//       };
//       str = (prec ? toFixedNum(n,prec) : '' + Math.round(n)).split('.');
//       //处理千分位
//       let re = /(-?\d+)(\d{3})/;
//       while(re.test(str[0])){
//         str[0] = str[0].replace(re,"$1" + sep + "$2");
//       }
//       if((str[1] || '').length < +prec){
//         str[1] = str[1] || ''
//         str[1] += new Array(prec - str[1].length + 1).join('0');
//       }
//       return str.join(dec);
// }


// function toFiexdMoneyFormat(money) {
//   var len = money ? money.length : 0;

//   if (len > 20 || len < 0 || +money <= 0) {
//     return console.log('请输入有效的金额数');
//   }

//   let ends = '.00', str = '';
//   let dotIdx = money.indexOf('.');

//   if (dotIdx !== -1) {
//     len = len - 3;
//     ends = money.slice(dotIdx)
//   }

//   for (let i = len - 1; i >= 0; i--) {
//     let j = len - i - 1;

//     str += money[j];
//     if (i % 3 === 0 && i !== 0) {
//       str += ',';
//     }
//   }
//   return str + ends;
// } 

// function money(number,des = 2,sap = ','){
//   //匹配出0-9和.以外的其他字符，限定输入的number只能包含数字和点，否则判定为不合法
//   let reg = /[^0-9.]/
//   //对参数的合法性做校验
//   if(number === null || number === undefined || number === '' || isNaN(number) || reg.test(number)) return '--';
//   let str = '';
//   function toFixedNum(num,des){
//     let k = Math.pow(10,prec);
//     return '' + Math.round(num * k) / k;
//   }

// }
// console.log(moneyFormat('99459.65523'),'---',toFiexdMoneyFormat('99459.65523'))
// /(\d)(?=(\d{3})+$)/g

/*
function mainInstanceof(left,right){
  let pro = left.__proto__;
  while(true){
    if(pro === right.prototype){
      return true;
    }else if(pro === null){
      return false;
    }
    pro = pro.__proto__;
  }
}
let a = [1,2];
let b = {a:1}
console.log(mainInstanceof(b,Array),b instanceof Array);
*/

/*
function de(fn,time=500){
  let id = null;
  return function (){
    if(id == null){
      fn.apply(this,arguments);
      id = '';
      return ;
    }
    id && clearTimeout(id);
    id = setTimeout(()=>{
      fn.apply(this,arguments);
    },time);
  }
}
*/
/* peomiseall实现
function promiseAll(arr){
  if(!Array.isArray(arr)) return;
  return new Promise((res,rej)=>{
    let result = [], count = 0, len = arr.length;
    arr.forEach((item,idx)=>{
      if(item instanceof Promise){
        item.then((data)=>{
          count++;
          result[idx] = data
          if(count == len){
            res(result);
          }
        }).catch(e => rej(e))
      }
    });
  });
}

function pro1(){
  return new Promise((res,rej)=>{
    // res(100);
    // throw new Error('test')
    setTimeout(()=>{
      res(100);
      // throw new Error('test')
      try{throw new Error('test')}catch(err){console.log(1)}
      // setTimeout(function () { try{throw new Error('test')}catch(err){console.log(1)} }, 0)
    },100);
  })
}
function pro2(){
  return new Promise((res,rej)=>{
      setTimeout(()=>{
        try{
          res(200+a);
          throw new Error('啊哈哈哈');
        }catch(err){
          rej(err)
        }
      },200);
  }).catch(e=>e.message)
}
function pro3(){
  return new Promise((res,rej)=>{
      setTimeout(()=>{
        try{
          res(300);
        }catch(err){
          rej(err);
        }
      },10);
  })
}

    
async function test(){
  try{
    const res = await promiseAll([pro1(),pro2(),pro3()]);
    // const res = await pro1();
    console.log(res,565665);
  }catch(err){
    console.log(34343);
    throw new Error(err);
  }
}
test().catch(err => {console.log(err.message)});


// const promise = new Promise(function (resolve, reject) {
//   resolve('ok');
//   setTimeout(function () { try{throw new Error('test')}catch(err){console.log(1)} }, 0)
// });
// promise.then(function (value) { console.log(value) });


// resolve 的值是 undefined
// Promise.resolve(2).then(() => {}, () => {}).then(data => console.log(data))

// // resolve 的值是 2
// Promise.resolve(2).finally(() => {}).then(data => console.log(data))

// // reject 的值是 undefined
// Promise.reject(3).then(() => {}, () => {}).catch(data => console.log(data))

// // reject 的值是 3
// Promise.reject(3).finally(() => {}).catch(data => console.log(data))
*/



// function a(){
//   console.log(this,1)
// }
// function test(){
//   // const a = () => {
//   //   console.log(this,1)
//   // }
//   function a(){
//     console.log(this,1)
//   }
//   return a;
// }
// const obj1 = {};
// const obj2 = {};
// obj1.test = test;
// obj2.fun = obj1.test();
// obj2.fun();

/* promise.race 实现
function promiseRace(arr){
  if(!Array.isArray(arr)) return ;
  return new Promise((reslove,reject)=>{
    arr.forEach((item)=>{
      if(!(item instanceof Promise)) item = Promise.resolve(item);
      item.then((data)=>{
        reslove(data)
      }).catch(err => reject(err));
    });
  });

}

function pro1(){
  return new Promise((res,rej)=>{
    setTimeout(()=>{
      rej(100);
      // setTimeout(function () { try{throw new Error('test')}catch(err){console.log(1)} }, 0)
    },100);
  })
}
function pro2(){
  return new Promise((res,rej)=>{
      setTimeout(()=>{
        try{
          res(200+a);
          throw new Error('啊哈哈哈');
        }catch(err){
          rej(err)
        }
      },200);
  }).catch(e=>e.message)
}
function pro3(){
  return new Promise((res,rej)=>{
      setTimeout(()=>{
        try{
          res(300);
        }catch(err){
          rej(err);
        }
      },100);
  })
}
async function test(){
  try{
    const res = await promiseRace([pro1(),pro2(),pro3()]);
    // const res = await pro1();
    console.log(res,565665);
  }catch(err){
    // console.log(34343);
    throw new Error(err);
  }
}
test().catch(err => {console.log('err',err.message)});
*/

/*
function promiseAllSettlled(arr){
  if(!Array.isArray(arr)) return;
  let count = 0, len = arr.length, result = [];
  return new Promise((reslove,reject)=>{
    arr.forEach((item,idx)=>{
      if(!(item instanceof Promise)) item = Promise.resolve(item);
      item.then((data)=>{
        count++;
        result[idx] = {status:'fulfilled',value:data};
        if(len == result.length){
          reslove(result);
        }
      }).catch((err)=>{
        count++;
        result[idx] = {status:'reject',reason: err}
        if(len == result.length){
          reslove(result);
        }
      })
    });
  });
}

const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);
const allSettledPromise = promiseAllSettlled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
*/

/* promise.any 实现
function PromiseAny(arr){
  if(!Array.isArray(arr)) return;
  let count = 0, len = arr.length, result = [];
  return new Promise((reslove,reject)=>{
    arr.forEach((item,idx)=>{
      if(!(item instanceof Promise)) item = Promise.reslove(item);
      item.then(data => {
        reslove(data);
      }).catch(err => {
        count++;
        result[idx] = err;
        if(len == result.length){
          reject(result);
        }
      })
    })
  });
}
var resolved = Promise.resolve(42);
var rejected = Promise.reject(-1);
var alsoRejected = Promise.reject(Infinity);

// PromiseAny([resolved, rejected, alsoRejected]).then(function (result) {
//   console.log(result); // 42
// });

PromiseAny([rejected, alsoRejected]).catch(function (results) {
  console.log(results); // [-1, Infinity]
});
*/

/*实现Promise.reslove
function promiseReslove(params){
  if(params instanceof Promise){
    return params;
  }else if(typeof params == 'object' && params.then){
    return new Promise((reslove,reject)=>{
      params.then(reslove);
    });
  }else if(typeof params != undefined){
    return new Promise((reslove,reject)=>{
      reslove(params);
    });
  }else{
    return new Promise((reslove,reject)=>{
      reslove();
    });
  }
}

let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(new Promise((res)=>{res(100)}));
// let p1 = Promise.resolve(thenable);
// const p1 = Promise.resolve('Hello');
// const p1 = Promise.resolve();
p1.then(function (value) {
  console.log(value);  // 42
});

let p2 = Promise.resolve(new Promise((res)=>{res(100)}));
// let p2 = promiseReslove(thenable);
// const p2 = Promise.resolve('Hello');
// const p2 = Promise.resolve();
p2.then(function (value) {
  console.log(value);  // 42
});
*/

// const f = () =>{ return new Promise((res)=>{
//   console.log('now');setTimeout(()=>{res(100)},0)
// }).then(()=> 99);};
// (
//   () => new Promise(
//     resolve => resolve(f())
//   )
// )().then(data => console.log(data,11));
// console.log('next');

// function mainInstanceof(left,right){
//   let pro = left.__proto__;
//   while(true){
//     if(pro === right.prototype){
//       return true;
//     }else if(pro === null){
//       return false;
//     }
//     pro = pro.__proto__;
//   }
// }

// let a = [1,2];
// let b = {a:1}
// console.log(mainInstanceof(a,Object),a instanceof Object);

// function strTem(str,obj){
//   let reg = /\$\{(\w*?)\}/g
//   let str1 = str.replace(reg,function(item,$1){
//     return obj[$1];
//   });
//   return str1;
// }
// var str = 'hi, my name is ${name},my age is ${age}';
// var obj = {name:'JACK', age: '13'}
// console.log(strTem(str,obj));

/*
function _setInterVal(callback,time=0,...argus){
  let target = {id: null};
  function fn(){
    target.id = setTimeout(()=>{
      callback.apply(this,argus);
      fn();
    },time);
  }
  fn();
  return target;
}
function _clearInterval(id){
  clearTimeout(id)
}

var id = _setInterVal((a)=>{console.log(a)},1000,'123');
setTimeout(()=>{_clearInterval(id.id);},5000)
*/

// function throttle(fn,time=300){
//   let off = true;
//   return function(){
//     if(!off) return;
//     off = false;
//     setTimeout(async ()=>{
//       await fn.apply(this,arguments);
//       off = true;
//     },time);
//   }
// }

// function debounce(fn,time=300,immediately=true){
//   let id = null, flag = true;
//   return function(){
//     if(flag && immediately){
//       fn.apply(this,arguments);
//       flag = false;
//       return;
//     }
//     id && clearTimeout(id);
//     id = setTimeout(()=>{
//       fn.apply(this,arguments)
//     },time);
//   }
// }

/*
Function.prototype.myCall = function(point,...argus){
  point = point || window;
  if(typeof this != 'function' || typeof point != 'object') return;
  point.self = this;
  const res = eval('point.self('+argus+')');
  delete point.self;
  return res;
}

let obj = {a:8};
    function fn(a,b,c) {
      console.log(this.a);
      console.log(a);
      console.log(b);
      console.log(c);
      return 9999;
    }
    console.log(fn.myCall(obj,1));
*/
/*
var a = 9
Function.prototype.myBind = function(point,...argus){
  point = point || window;
  if(typeof this != 'function' || typeof point != 'object') return ;
  point.self = this;
  return function (...argus_1){
    let params = argus.concat(argus_1);
    const res = eval('point.self('+params+')');
    delete point.self;
    return res;
  }
}

let obj = {a:8};
    function fn(a,b,c) {
      console.log(this.a);
      console.log(a);
      console.log(b);
      console.log(c);
      return 9999;
    }
  const fn_1 = fn.myBind(global,1);
  fn_1(2,3);
*/

/* 封装jsonp

  function getJsonP(url,params){
    return new Promise((reslove,reject)=>{
      try{
        let srcriptDom = document.createElement('script');
        let str = '';
        window._cb = reslove;
        if(params && typeof params === 'object'){
          for(let key in params){
            str += key + '=' + params[key] + '&'
          }
        }
        if(str != ''){
          url = url + '?' + str + 'callback=_cb';
        }else{
          url = url + '?' + 'callback=_cb';
        }
        srcriptDom.src = url;
        srcriptDom.onload = function(){
          delete window._cb;
          this.remove();
        }
        document.body.appendChild(scriptDom);
      }catch(err){
        reject(err);
      }
    })
  }

  getJsonP('http://www.baidu.com',{a:1,b:2});
*/

/* 手动实现ajax
function myAjax(params){
  return new Promise((reslove,reject)=>{
    try{
      let defaultParams = {
        method: 'GET',
        async: true,
        data: '',
        setHeader: function(){},
      }
      if(typeof params !== 'object' && !params.url){
        reject('参数不对');
        return ;
      }
      for(let key in params){
        defaultParams[key] = params[key];
      }
      let xml = new XMLHttpRequest();
      if(defaultParams['method'].toUpperCase() = 'GET' && defaultParams['data'] && typeof defaultParams['data'] === 'string'){
        defaultParams['url'] += '?' + defaultParams['data'];
      }
      xml.open(defaultParams['url'],defaultParams['method'],defaultParams['async']);
      defaultParams.setHeader(xml);
      xml.send(data);
      xml.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
          reslove(xml.response);
        }else{
          reject(xml.status);
        }
      }
    }catch(err){
      reject(err);
    }
  });
}

myAjax({url:'http://www.baidu.com'}); 
*/

// function arrToTree(arr){
//   if(!(arr instanceof Array)) return;
//   let obj = {}, res = [];
//   arr.forEach((item)=>{
//     obj[item.id] = item;
//   })
//   for(let key in obj){
//     let item = obj[key]
//     if(item.parentId){
//       if(obj[item.parentId].children){
//         obj[item.parentId].children.push(item);
//       }else{
//         obj[item.parentId].children = [];
//         obj[item.parentId].children.push(item);
//       }
//     }else{
//       res.push(item)
//     }
//   }
//   return res;
// }

function dfs(tree){
  if(typeof tree !== 'object') return;
  let res = [];
  let statck = Array.isArray(tree) ? tree : [tree];
  while(statck.length != 0){
    let node = statck.shift();
    res.push(node);
    if(node && node.children && node.children.length > 0){
      for(let i = node.children.length - 1; i >= 0; i--){
        statck.unshift(node.children[i]);
      }
    }
  }
  return res;
}


function srot(arr){
  for(let i = 1; i < arr.length; i++){
    let item = arr[i];
    for(let j = i - 1; j>=0; j--){
      if(arr[j] > item){
        arr[j+1] = arr[j];
      }else{
        break;
      }
    }
    arr[j] = item
  }
}