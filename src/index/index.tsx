import React, {useEffect, useState,useRef} from 'react';
import ReactDom from 'react-dom';
import Hoc from 'components/Hoc';
import NoLogin from 'components/NoLogin';
import Loading from 'components/Loading';
import styles from './index.less';
import Cart from './components/cart/index';
import StudentCart from './components/StudentCart';
import { pageInit, px, getUrlQuery, checkIsApp,storage } from 'utils/tool';
import {getTeacherList} from 'apiService/service';
import {getTeacherLisRes,Result,getStudentLisRes} from 'interface/response';

var obj : getStudentLisRes=  {
  name: 'Lilei',
  sex: '0',
  free_time: '星期一,星期二',
  class: '初三',
  subject: '数学,英语',
  header_img: 'http://39.99.174.23/common/images/header.jpg',
  charge: '100',
  request: '重点本科',
  key: '5fd02f15f6890d1246cee9fc',
  zuoyouming: '没有最好，只有更好'
}

function Index(){

  const msgObj = useRef<any>({});

  //教师列表数据
  const [teacherList, setTeacherList] = useState<getTeacherLisRes[]|Result>();
  //学生列表数据
  const [studentList, setStudentList] = useState<getStudentLisRes[] | Result>();
  
  

  async function init() {
    let loginStatus;
    const isApp = await checkIsApp();
    console.log('index',loginStatus,isApp);
    //检查是否有登录态
    if(isApp){
      loginStatus = await JSSDK.getFileData({key:['role']});
      console.log('index',loginStatus);
      msgObj.current.loginStatus = loginStatus;
    }else{
      loginStatus = storage.get(['role']);
      msgObj.current.loginStatus = loginStatus;
    }
    if(loginStatus.role != null){
      if(loginStatus.role == 'student'){
        const {code, result} = await getTeacherList({});
        console.log(result,'查询教师列表页结果');
        if(+code == 0){
          setTeacherList(result);
        }else{
          setTeacherList([]);
        }
      }else if(loginStatus.role == 'teacher'){
        setStudentList([obj]);
      }
    }else{
      setTeacherList([]);
    }

  }

  //组件初始化
  useEffect(()=>{
    init();
    JSSDK.onappear({cb:()=>{
      console.log('index--onappear');
      init();
    }})
  },[]);
  
  if(!teacherList && !studentList){
    return <Loading />
  }
  
  return (
    <>
      { msgObj.current.loginStatus.role != null ? 
        <div className={styles.container}>
          <div className={styles.nav}>
            <div className={styles.left}>
              <span>推荐</span>
              <span>附近</span>
              <span>最新</span>
            </div>
            <div className={styles.right}>
              <span>筛选</span>
              <span>筛选</span>
            </div>
          </div>
          {
             msgObj.current.loginStatus.role == 'student' ? 
             <div className={styles['cart-container']}>
              <div className={styles.content}>
                {teacherList.length > 0 ?
                  teacherList.map((item:getTeacherLisRes)=>{
                    return (
                      <Cart teacher={item}/>
                    )
                  }) :
                  <div className={styles['no-data']}>暂无数据</div>
                }
              </div>
            </div> : 
            <div className={styles['cart-container']}>
              <div className={styles.content}>
                {studentList.length > 0 ?
                  studentList.map((item:getStudentLisRes)=>{
                    return (
                      <StudentCart student={item}/>
                    )
                  }) :
                  <div className={styles['no-data']}>暂无数据</div>
                }
              </div>
            </div>
          }
          
        </div> : <NoLogin />
      }
    </> 
  )
}
const HocIndex = Hoc(Index);

ReactDom.render(
  <HocIndex />,
  document.getElementById('root')
);
