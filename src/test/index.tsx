import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./index.less";

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
//     console.log("子组件componentWillMount方法执行 ");
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
//   })

//   console.log('父组件retuen前');
//   return (
//     <div>
//       {/* {isOnline} */}
//       <Child />
//       {state ? 'hahah' : 'lalal'}
//       <div onClick={()=>{
//         setState(!state);
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

// const themes = {
//   light: {
//     foreground: '#000000',
//     background: '#eeeeee',
//   },
//   dark: {
//     foreground: '#ffffff',
//     background: '#222222',
//   },
// };

// const ThemeContext = React.createContext(
//   themes.dark // default value
// );

// class ThemedButton extends React.Component {
//   render() {
//     let props = this.props;
//     let theme = this.context;
//     console.log(props,theme,'ppp');
//     return (
//       <div>
//          {/* <ThemeContext.Consumer>
//           {
//             value => <p>{value.background}</p>
//           }
//         </ThemeContext.Consumer> */}
//         <button
//         {...props}
//         style={{backgroundColor: theme.background}}
//       />
//       </div>

//     );
//   }
// }
// ThemedButton.contextType = ThemeContext;

// function A(){
//   return (
//     <div>
//       <ThemeContext.Consumer>
//           {
//             value => <p>{value.background}</p>
//           }
//         </ThemeContext.Consumer>
//     </div>
//   )
// }

// function Toolbar(props) {
//   return (
//     <ThemedButton onClick={props.changeTheme}>
//       Change Them
//     </ThemedButton>
//   );
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       theme: themes.light,
//     };
//   }

//   toggleTheme = () => {console.log(111,this.state);
//     this.setState(state => ({
//       theme:
//         state.theme === themes.dark
//           ? themes.light
//           : themes.dark,
//     }));
//   };

//   render() {
//     // The ThemedButton button inside the ThemeProvider
//     // uses the theme from state while the one outside uses
//     // the default dark theme
//     return (
//       <div>
//         <ThemeContext.Provider value={this.state.theme}>
//           <Toolbar changeTheme={this.toggleTheme} />
//           <A />
//         </ThemeContext.Provider>
//         <div>
//           <ThemedButton>2323</ThemedButton>
//         </div>
//       </div>
//     );
//   }
// }

// function App() {
//   const [count, setCount] = useState(0);

//   useLayoutEffect(() => {
//     // setTimeout(()=>{
//     //   if (count === 0) {
//     //     const randomNum = 10 + Math.random()*200
//     //     setCount(10 + Math.random()*200);
//     //   }
//     // },2000)
//     if (count === 0) {
//       const randomNum = 10 + Math.random()*200
//       setCount(10 + Math.random()*200);}
//   }, [count]);

//   return (
//       <div onClick={() => setCount(0)}>{count}</div>
//   );
// }

function App() {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.all}>all</div>
        <div className={styles.allNo}>all</div>
      </div>
      <div className={styles.box}>
        <div className={styles.top}>top</div>
        <div className={styles.topNo}>top</div>
      </div>
      <div className={styles.box}>
        <div className={styles.bottom}>bottom</div>
        <div className={styles.bottomNo}>bottom</div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
