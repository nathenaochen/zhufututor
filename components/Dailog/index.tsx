/**
 * 定义弹框公共组件
 */
import React, {useState,FunctionComponent,ReactNode,useEffect} from 'react';
import {createPortal} from 'react-dom';
import styles from './dailog.less';
import cns from 'classnames';

interface BtnAttr {
  text: string;   //按钮文字
  action: Function; //点击按钮执行的方法
}
interface DailogProps {
  visable: boolean;  //控制Diolog的展示与隐藏
  message?: string;   //弹框提示内容
  btns?: BtnAttr[];    //按钮列表
  className?: string;  //外传控制class
  title?: string;      //弹框标题
  children?: ReactNode; //用于支持自定义弹框
}

const doc = window.document;
const node = doc.createElement('div');
doc.body.appendChild(node);

const Dailog: FunctionComponent<DailogProps> = (props:DailogProps) => {
  const {className,visable,message,btns,title, children} = props; 
  
  // return (
  //   <div className={cns(styles['mask'], className ,visable ? styles['show'] : styles['hidden'])}>
  //     <div className={styles['dailog-box']}>
  //      { children ? children :
  //       <>
  //         {title && <p className={styles['title']}>{title}</p>}
  //         <p className={styles['message']}>{message}</p>
  //         <p className={styles['button']}>
  //           {
  //             btns && btns.map((item,idx)=>{
  //               return (
  //                 <span 
  //                   onClick={(evt: React.MouseEvent)=>{evt.stopPropagation();item.action && item.action();}}
  //                   className={styles['btn']}
  //                 >{item.text}</span>
  //               )
  //             })
  //           }
  //         </p>
  //       </>}
  //     </div>
  //   </div>
  // )

  useEffect(()=>{

    return ()=>{
      doc.body.removeChild(node);
    }
  },[]);

  return createPortal(
    <div className={cns(styles['mask'], className ,visable ? styles['show'] : styles['hidden'])}>
      <div className={styles['dailog-box']}>
       { children ? children :
        <>
          {title && <p className={styles['title']}>{title}</p>}
          <p className={styles['message']}>{message}</p>
          <p className={styles['button']}>
            {
              btns && btns.map((item,idx)=>{
                return (
                  <span 
                    onClick={(evt: React.MouseEvent)=>{evt.stopPropagation();item.action && item.action();}}
                    className={styles['btn']}
                  >{item.text}</span>
                )
              })
            }
          </p>
        </>}
      </div>
    </div>, //塞进传送门的JSX
    node //传送门的另一端DOM node
  );
}


export default Dailog;