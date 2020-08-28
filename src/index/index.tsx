import React from 'react';
import ReactDom from 'react-dom';
import Hoc from 'components/Hoc';
import styles from './index.less';
import {getUser,register,getToken,validatetoken} from 'apiService/service';
import Cart from './components/cart/index';

function Index(){

  
  return (
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
    </div>
  )
}
const HocIndex = Hoc(Index);

ReactDom.render(
  <HocIndex />,
  document.getElementById('root')
);
