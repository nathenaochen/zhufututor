import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import Hoc from 'components/Hoc';
import NoLogin from 'components/NoLogin';
import Loading from 'components/Loading';
import styles from './index.less';
import Cart from './components/cart/index';
import { pageInit } from 'utils/tool';

function Index(){

  const [isLogin, setIsLogin] = useState<boolean|string>('init');


  async function init() {
    //检查是否有登录态
    const {role} = await JSSDK.getFileData({key:['role']});
    // const {account} = await JSSDK.getFileData({key:['account']});
    console.log(role,'role');
    if(role != null){
      setIsLogin(true);
    }else{
      setIsLogin(false);
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
  
  if(isLogin == 'init'){
    return <Loading />
  }
  
  return (
    <>
      { isLogin ? 
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
                [1,2,3,4,5,6,7,8].map(()=>{
                  return (
                    <Cart />
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
