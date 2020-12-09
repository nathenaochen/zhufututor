import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Hoc from 'components/Hoc';
import NoLogin from 'components/NoLogin';
import Loading from 'components/Loading';
import styles from './index.less';
import Cart from './components/cart/index';
import { pageInit, px, getUrlQuery, checkIsApp,storage } from 'utils/tool';
import {getTeacherList} from 'apiService/service';
import {getTeacherLisRes,Result} from 'interface/response';

function Index(){

  //教师列表数据
  const [teacherList, setTeacherList] = useState<getTeacherLisRes[]|Result>();
  
  

  async function init() {
    let loginStatus;
    const isApp = await checkIsApp();
    console.log('index',loginStatus,isApp);
    //检查是否有登录态
    if(isApp){
      loginStatus = await JSSDK.getFileData({key:['role']});
      console.log('index',loginStatus);
    }else{
      loginStatus = storage.get(['role']);
    }
    // const {account} = await JSSDK.getFileData({key:['account']});
    // console.log(role,'role');
    // console.log(px(600),'600',getUrlQuery());
    if(loginStatus.role != null){
      const {code, result} = await getTeacherList({});
      console.log(result,'查询教师列表页结果');
      if(+code == 0){
        setTeacherList(result);
      }else{
        setTeacherList([]);
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
  
  if(!teacherList){
    return <Loading />
  }
  
  return (
    <>
      { teacherList.length > 0 ? 
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
          <div className={styles['cart-container']}>
            <div className={styles.content}>
              {
                teacherList.map((item:getTeacherLisRes)=>{
                  return (
                    <Cart teacher={item}/>
                  )
                })
              }
            </div>
          </div>
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
