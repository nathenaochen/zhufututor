//定义cssModule 需要的模块，使用import styles from './hello.less';时让编辑器不报错
declare module '*.less'{
  const content: any;
  export default content;
}

declare module '*.jpg'; //图片jpg模块 ，使用import img from './hello.jpg';时让编辑器不报错
declare module '*.png';