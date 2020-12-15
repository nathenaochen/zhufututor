import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import Arrow from 'components/Arrow';
import styles from './me.less';
import advice from './images/advice_feekback.png';
import password from './images/edit_password.png';
import jssdkImg from './images/jssdk_test.png';
import personInfo from './images/person_info_edit.png';
import setting from './images/setting.png';
import tel from './images/tel.png';
import {pageInit, storage} from 'utils/tool';
import headerImg from './images/6.png';

let items = [
  {
    desc:'绑定手机号',
    imgUrl: tel,
    clickFun: ()=>{

    }
  },
  {
    desc:'修改密码',
    imgUrl: password,
    clickFun: ()=>{
      
    }
  },
  {
    desc:'完善信息',
    imgUrl: personInfo,
    clickFun: async()=>{
      let loginStatus;
      if(isApp){
        loginStatus = await JSSDK.getFileData({key:['role']});
      }else{
        loginStatus = storage.get(['role']);
      }
      if(loginStatus.role != null){
        if(loginStatus.role == 'student'){
          pageInit({url:'complete-message.html?type=student'})
        }else if(loginStatus.role == 'teacher'){
          pageInit({url:'complete-message.html?type=teacher'})
        }
      }else{
        pageInit({url:'login-page.html'})
      }
      
    }
  },
  {
    desc:'系统设置',
    imgUrl: setting,
    clickFun: ()=>{
      pageInit({url:'setting.html'});
    }
  },
  {
    desc:'意见反馈',
    imgUrl: advice,
    clickFun: ()=>{
      
    }
  },
  {
    desc:'jssdk测试',
    imgUrl:jssdkImg,
    clickFun: ()=>{
      pageInit({url:'webviewtest.html'});
    }
  },

]

function Me(){



  useEffect(()=>{
    JSSDK.onappear({cb:()=>{
      console.log('me---onappear');
    }})
  },[]);


  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <div className={styles['header-img']}>
              <img src={headerImg} alt=""/>
          </div>
          <div className={styles['info']}>
            <p className={styles['name']}>NathenAoChen</p>
            <div className={styles['zuo-box']}>
              <p className={styles['qianming']}>座右铭:仰望星空，脚踏实地</p>
              <Arrow className={styles.arrow}/>
            </div>
          </div>
        </div>
        <ul className={cns(styles['item-container'],styles['first'])}>
          {
            items.map((item,idx)=>{
              return (
                <li 
                  className={cns(styles['item'],idx == 0 ? styles['first'] : '')}
                  onClick={(evt:React.MouseEvent)=>{evt.stopPropagation();item.clickFun()}}
                >
                  <p>
                    <span> 
                      <img src={item.imgUrl} alt=""/> 
                    </span>
                    <span>{item.desc}</span>
                  </p>
                  <Arrow className={styles.arrow}/>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

const HocMe = Hoc(Me);

ReactDom.render(
  <HocMe />,
  document.getElementById('root')
);
