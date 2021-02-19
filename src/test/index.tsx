import React,{useState, useEffect, useRef, useCallback} from "react";
import ReactDOM from "react-dom";
import {formatmoney,aa} from 'ts-lib-cli';
import Toast from 'components/Toast/index';
import {isAndroid} from 'utils/tool';
import ArrowSvg from 'components/ArrowSvg';
import styles from './test.less';


/**
 * 测试React15 生命周期代码用例
 */
// // 定义子组件
// class LifeCycle extends React.Component {
//   constructor(props:any) {
//     super(props);
//     console.log("进入子组件constructor",this.props);
//     // state 可以在 constructor 里初始化
//     this.state = { text: "子组件的文本" };
//   }
//   // 初始化渲染时调用
//   componentWillMount() {
//     console.log("子组件componentWillMount方法执行");
//   }
//   // 初始化渲染时调用
//   componentDidMount() {
//     console.log("子组件componentDidMount方法执行");
//   }
//   // 父组件修改组件的props时会调用
//   componentWillReceiveProps(nextProps) {
//     console.log("子组件componentWillReceiveProps方法执行",nextProps,this.props);
//   }
//   // 组件更新时调用
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log("子组件shouldComponentUpdate方法执行",nextProps,nextState,this.props,this.state,nextProps.text != this.props.text,this.state.text != nextState.text);
//     if((nextProps.text != this.props.text) || (this.state.text != nextState.text)){
//       return true;
//     }else{
//       return false;
//     }
    
//   }
//   // 组件更新时调用
//   componentWillUpdate(nextProps, nextState) {
//     console.log("子组件componentWillUpdate方法执行",nextProps,nextState,this.props,this.state);
//   }
//   // 组件更新后调用
//   componentDidUpdate(preProps, nextState) {
//     console.log("子组件componentDidUpdate方法执行",preProps,nextState,this.props,this.state);
//   }
//   // 组件卸载时调用
//   componentWillUnmount() {
//     console.log("子组件的componentWillUnmount方法执行");
//   }
//   // 点击按钮，修改子组件文本内容的方法
//   changeText = () => {
//     this.setState({
//       text: "修改后的子组件文本"
//     });
//   };
//   render() {
//     console.log("子组件render方法执行");
//     return (
//       <div className="container">
//         <button onClick={this.changeText} className="changeText">
//           修改子组件文本内容
//         </button>
//         <p className="textContent">{this.state.text}</p>
//         <p className="fatherContent">{this.props.text}</p>
//       </div>
//     );
//   }
// }
// // 定义 LifeCycle 组件的父组件
// class LifeCycleContainer extends React.Component {
//   constructor(props:any) {
//     super(props);
//     console.log("进入父组件constructor");
//     // state 可以在 constructor 里初始化
//     this.state = {
//       text: "父组件的文本",
//       hideChild: false
//     };
//   }
//   // state 也可以像这样用属性声明的形式初始化
//   // state = {
//   //   text: "父组件的文本",
//   //   hideChild: false
//   // };

//    // 初始化渲染时调用
//    componentWillMount() {
//     console.log("父组件componentWillMount方法执行");
//   }
//   // 初始化渲染时调用
//   componentDidMount() {
//     console.log("父组件componentDidMount方法执行");
//   }
//   // 父组件修改组件的props时会调用
//   componentWillReceiveProps(nextProps) {
//     console.log("父组件componentWillReceiveProps方法执行",nextProps,this.props);
//   }
//   // 组件更新时调用
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log("父组件shouldComponentUpdate方法执行",nextState,this.state);
//     return true;
//   }
//   // 组件更新时调用
//   componentWillUpdate(nextProps, nextState) {
//     console.log("父组件componentWillUpdate方法执行",nextState,this.state);
//   }
//   // 组件更新后调用
//   componentDidUpdate(preProps, nextState) {
//     console.log("父组件componentDidUpdate方法执行",nextState,this.state);
//   }
//   // 组件卸载时调用
//   componentWillUnmount() {
//     console.log("父组件的componentWillUnmount方法执行");
//   }

//   // 点击按钮，修改父组件文本的方法
//   changeText = () => {
//     this.setState({
//       text: "修改后的父组件文本"
//     });
//   };
//   // 点击按钮，隐藏（卸载）LifeCycle 组件的方法
//   hideChild = () => {
//     this.setState({
//       hideChild: true
//     });
//   };
//   render() {
//     console.log("父组件render方法执行");
//     return (
//       <div className="fatherContainer">
//         <button onClick={this.changeText} className="changeText">
//           修改父组件文本内容
//         </button>
//         <button onClick={this.hideChild} className="hideChild">
//           隐藏子组件
//         </button>
//         {this.state.hideChild ? null : <LifeCycle text={this.state.text} />}
//       </div>
//     );
//   }
// }


/**
 * 测试React16 生命周期代码用例
 */
// 定义子组件
// class LifeCycle extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("子组件进入constructor");
//     // state 可以在 constructor 里初始化
//     this.state = { text: "子组件的文本" };
//   }
//   // 初始化/更新时调用
//   static getDerivedStateFromProps(props, state) {
//     console.log("子组件getDerivedStateFromProps方法执行",props, state);
//     return {
//       fatherText: props.text
//     }
//   }
//   // 初始化渲染时调用
//   componentDidMount() {
//     console.log("子组件componentDidMount方法执行");
//   }
//   // 组件更新时调用
//   shouldComponentUpdate(prevProps, nextState) {
//     console.log("子组件shouldComponentUpdate方法执行",prevProps, nextState,this.props,this.state);
//     return true;
//   }
//   // 组件更新时调用
//   getSnapshotBeforeUpdate(prevProps, prevState) {
//     console.log("子组件getSnapshotBeforeUpdate方法执行",prevProps, prevState,this.props,this.state);
//     return "haha";
//   }
//   // 组件更新后调用
//   componentDidUpdate(preProps, preState, valueFromSnapshot) {
//     console.log("子组件componentDidUpdate方法执行",preProps, preState,this.props,this.state);
//     console.log("从 getSnapshotBeforeUpdate 获取到的值是", valueFromSnapshot);
//   }
//   // 组件卸载时调用
//   componentWillUnmount() {
//     console.log("子组件的componentWillUnmount方法执行");
//   }
//   // 点击按钮，修改子组件文本内容的方法
//   changeText = () => {
//     this.setState({
//       text: "修改后的子组件文本"
//     });
//   };
//   render() {
//     console.log("子组件render方法执行",this.state,this.props);
//     return (
//       <div className="container">
//         <button onClick={this.changeText} className="changeText">
//           修改子组件文本内容
//         </button>
//         <p className="textContent">{this.state.text}</p>
//         <p className="fatherContent">{this.props.text}</p>
//       </div>
//     );
//   }
// }
// // 定义 LifeCycle 组件的父组件
// class LifeCycleContainer extends React.Component {
//   // state 也可以像这样用属性声明的形式初始化
//   // state = {
//   //   text: "父组件的文本",
//   //   hideChild: false
//   // };

//   constructor(props) {
//     super(props);
//     console.log("父组件进入constructor");
//     // state 可以在 constructor 里初始化
//     this.state = {
//       text: "父组件的文本",
//       hideChild: false
//     };
//   }

//    // 初始化/更新时调用
//    static getDerivedStateFromProps(props, state) {
//     console.log("父组件getDerivedStateFromProps方法执行",props, state);
//     // return {
//     //   fatherText: 1
//     // }
//     return null;
//   }
//   // 初始化渲染时调用
//   componentDidMount() {
//     console.log("父组件componentDidMount方法执行");
//   }
//   // 组件更新时调用
//   shouldComponentUpdate(prevProps, nextState) {
//     console.log("父组件shouldComponentUpdate方法执行",prevProps, nextState,this.props,this.state);
//     return true;
//   }
//   // 组件更新时调用
//   getSnapshotBeforeUpdate(prevProps, prevState) {
//     console.log("父组件getSnapshotBeforeUpdate方法执行",prevProps, prevState,this.props,this.state);
//     return "haha";
//   }
//   // 组件更新后调用
//   componentDidUpdate(preProps, preState, valueFromSnapshot) {
//     console.log("父组件componentDidUpdate方法执行",preProps, preState,this.props,this.state);
//     console.log("从 getSnapshotBeforeUpdate 获取到的值是", valueFromSnapshot);
//   }
//   // 组件卸载时调用
//   componentWillUnmount() {
//     console.log("父组件的componentWillUnmount方法执行");
//   }
//   // 点击按钮，修改父组件文本的方法
//   changeText = () => {
//     this.setState({
//       text: "修改后的父组件文本"
//     });
//   };
//   // 点击按钮，隐藏（卸载）LifeCycle 组件的方法
//   hideChild = () => {
//     this.setState({
//       hideChild: true
//     });
//   };
//   render() {
//     console.log("父组件render方法执行",this.state,this.props);
//     return (
//       <div className="fatherContainer">
//         <button onClick={this.changeText} className="changeText">
//           修改父组件文本内容
//         </button>
//         <button onClick={this.hideChild} className="hideChild">
//           隐藏子组件
//         </button>
//         {this.state.hideChild ? null : <LifeCycle text={this.state.text} />}
//       </div>
//     );
//   }
// }

/**
 * 测试自定义hook
 */
// function LifeCycleContainer(){
//   console.log('父组件开始');
//   const [state, setState] = useState(true);
//   // const isOnline = useFriendState(state);

//   useEffect(()=>{
//     console.log('父组件useeffect');
//     console.log(isAndroid(),'is')
//   })

//   console.log('父组件retuen前',state);
//   return (
//     <div>
//       {/* {isOnline} */}
//       <Child />
//       {state ? 'hahah' : 'lalal'}
//       <div onClick={()=>{
//         // setTimeout(()=>{
//         //   setState(false);
//         // console.log(state,'4545');
//         // setState(true);
//         // console.log(state,'111');
//         // },1000)
//         setState(false);
//         console.log(state,'4545');
//         setState(true);
//         console.log(state,'111');
//         }}>anniu </div>
//     </div>
//   )
// }

//自定义hook 实现状态逻辑复用
// function useFriendState(state){
//   console.log('自定义useFriendState开始');
//   const [isOnline, setIsOnline] = useState(1);

//   useEffect(()=>{
//     console.log('自定义useFriendState的useeffect');
//     // setIsOnline((a)=>{return ++a});
//   },[state]);

//   console.log('自定义useFriendState retutn前');

//   return isOnline;

//   // return [isOnline,setIsOnline]
// }

// function Child(){
//   console.log('子组件开始');

//   useEffect(()=>{
//     console.log('子组件useeffect');
//   })


//   console.log('子组件return前');
//   return (
//     <div>子组件</div>
//   )
// }


/**
 * 测试在hook中获取上一次的state和props
 */
// function Counter() {
//   const [count, setCount] = useState(0);
//   const prevCount = useLastState(count);

//   // const prevCountRef = useRef<any>();
//   console.log(count);
//   // useEffect(() => {
//   //   prevCountRef.current = count;
//   //   // console.log(prevCountRef.current);
//   // });
//   // const prevCount = prevCountRef.current;
//   // console.log(prevCount);
//   return (
//     <div>
//        <h1>Now: {count}, before: {prevCount}</h1>
//        <div onClick={()=>{setCount((a)=>{return ++a})}}>按钮自</div>
//     </div>
//   );
// }

// function useLastState(state){

//   const lastState = useRef();

//   useEffect(()=>{
//     lastState.current = state;
//   },[state])

//   return lastState.current;
// }


// function Example() {
//   const [count, setCount] = useState(0);

//   const prevCountRef = useRef<any>(12);

//   function handleAlertClick() {
//     setCount(6)
//     setTimeout(() => {
//       console.log('You clicked on: ' + count);
//     }, 3000);
//     // console.log('You clicked on: ' + count);
//   }

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//       <button onClick={handleAlertClick}>
//         Show alert
//       </button>
//     </div>
//   );
// }

// Example.a = 1;

// console.log(Example);

// const Item = (props) => {
//   const {text} = props;
//   const {a} = text;
//   const onClick = useCallback(()=>{
//     console.log(props.text.a);
//   },[a]);
//   return <div onClick={()=>{onClick()}}>111</div>
// }

// class Iteml extends React.Component{
//   render(){
//     return (
//       <div onClick={()=>{console.log(222);Toast.show('lalal',1000)}}>111</div>
//     )
//   }
// }

// const Card = () => {
//   const [text,setText] = useState({a:1});
//   // const onClick = useCallback(()=>{
//   //   console.log(text);
//   // },[text]);
//   useEffect(()=>{
//     setTimeout(()=>{setText({a:2})},5000);
//   },[text])

//   return (
//     <div>
//       <Item text={text}/>
//     </div>
//   )
// }


// function MyImage(){
//   const [Myimg,setMyimg] = useState(null);

//   function loadImgAsync(url){
//     return new Promise((res,rej)=>{
//       const myImg = new Image();
//       myImg.onload=function(){
//         res(myImg);
//       }
//       myImg.onerror=function(){
//         rej('加载图片'+url+'报错');
//       }
//       myImg.src = url;
//     })
//   }
//   useEffect(()=>{
//     loadImgAsync('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg').then((data)=>{
//       if(typeof data != 'string'){
//         console.log(data,11,typeof data);
//         setMyimg(data.toString());
//       }
//     })
//   },[]);
//   console.log(Myimg);
//   return (
//     Myimg ?  Myimg : <div>1</div>
//   )
// }


function Auo(props) {

  useEffect(()=>{
    let a = formatmoney();
    console.log(a,'a');
  },[]);

  return (
    <div>
      <audio src="http://39.99.174.23/static/music/ybslda.mp3" controls={true} loop={true}>

      </audio>
    </div>
  )
}

ReactDOM.render(<Auo />, document.getElementById("root"));

// const card = ()=>{return ReactDOM.render(<Card />, document.getElementById("root"));}  <div dangerouslySetInnerHTML={{__html: JSON.stringify(Myimg)}}></div>