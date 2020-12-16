import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import Arrow from 'components/Arrow';
import styles from './me.less';
import Loading from 'components/Loading';
import advice from './images/advice_feekback.png';
import password from './images/edit_password.png';
import jssdkImg from './images/jssdk_test.png';
import personInfo from './images/person_info_edit.png';
import setting from './images/setting.png';
import tel from './images/tel.png';
import {checkIsApp, pageInit, storage} from 'utils/tool';
import {getStudentDetail, getTeacherDetail} from 'apiService/service';
import {getStudentLisRes,Result,getTeacherLisRes} from 'interface/response';
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

  const msgObj = useRef<any>({});

  //记录用户信息
  const [userMsg, setUserMsg] = useState<getStudentLisRes|getTeacherLisRes>();

  //登录状态判断
  async function checkLoginStatus(){
     //判断角色以及是否登录
     let loginStatus;
     const isApp = await checkIsApp();
     msgObj.current.isApp = isApp;
     console.log('me',loginStatus,isApp);
     //检查是否有登录态
     if(isApp){
       loginStatus = await JSSDK.getFileData({key:['role']});
       console.log('me',loginStatus);
       msgObj.current.loginStatus = loginStatus.role;
     }else{
       loginStatus = storage.get(['role']);
       msgObj.current.loginStatus = loginStatus.role;
     }
     return loginStatus;
  }


  async function init(){
    const {role} = await checkLoginStatus();
    console.log(role,'yyy');
    const {token} =  msgObj.current.isApp ? await JSSDK.getFileData({key:['token']}) : storage.get(['token']);
    // console.log(token,'yyy');
    if(role == 'student'){
      const {result} = await getStudentDetail({key: msgObj.current.isApp ? token : storage.get(['token']).token});
      console.log('获取到的学生信息',result);
      setUserMsg(result as any)

    }else if(role == 'teacher'){
      const {result} = await getTeacherDetail({key: msgObj.current.isApp ? token : storage.get(['token']).token});
      console.log('获取到的老师信息',result);
      setUserMsg(result as any);
    }else{
      setUserMsg({} as any)
    }


  }

  useEffect(()=>{
    JSSDK.onappear({cb:()=>{
      console.log('me---onappear');
      init();
    }})
    init();
  },[]);

  if(!userMsg){
    return <Loading />
  }


  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['header']}>
          <div className={styles['header-img']}>
                <img src={userMsg.header_img + '?t=' + new Date().getTime() || ' '} alt="" onError={(e:any)=>{e.target.onError = null;e.target.src=headerImg}}/>
          </div>
          <div className={styles['info']}>
            {(userMsg && userMsg.name) ? <p className={styles['name']}>{userMsg.name}</p> : <p className={styles['name']} onClick={(e)=>{e.stopPropagation();pageInit({url:'login-page.html'})}}>马上登陆</p>}
            <div className={styles['zuo-box']}>
            {(userMsg && userMsg.zuoyouming) ? <p className={styles['qianming']}>{userMsg.zuoyouming}</p> : <p className={styles['qianming']}>你还没有设定签名哦！</p>}
              <Arrow className={styles.arrow} onAction={()=>{pageInit({url:'complete-message.html'})}}/>
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
