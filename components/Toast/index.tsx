import React from 'react';
import ReactDOM from 'react-dom';
import ToastContainer from './toast';

let toastContainerDiv = document.createElement('div');
document.body.appendChild(toastContainerDiv);

const getToastInstance = ():any => {
  return ReactDOM.render(<ToastContainer /> ,toastContainerDiv);
}

// 这里是 <ToastContainer /> 的引用
let toastInstance = getToastInstance();

const hide = () => {
   // 将 <ToastContainer /> 组件 unMount，卸载组件
   ReactDOM.unmountComponentAtNode(toastContainerDiv);
   // 再次创建新的 <ToastContainer /> 引用，以便再次触发 Toast
   toastInstance = getToastInstance();
}

export default {
  show: (text,duration)=>{toastInstance.pushToast({text:text,duration:duration})},
  hide: hide
}


