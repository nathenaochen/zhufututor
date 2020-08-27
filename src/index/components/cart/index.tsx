import React,{useState,useEffect} from 'react';
import cns from 'classnames';
import styles from './cart.less';

export default function Cart(){


  return (
    <div className={styles.cart}> 
      <div className={styles['left']}>
        <div className={styles.image}>
          <img src={require('./images/header.jpg')} alt=""/>  
        </div>
        <p className={styles.level}>三星老师</p>
      </div>
      <div className={styles['right']}>
        <div className={styles['title']}>
          <span className={styles['name']}>Tony老师</span>
          <span className={cns(styles['sex'],styles['boy'])}></span>
          <span className={styles['time']}>寒暑假</span>
        </div>
        <div className={styles['tercher-info']}>2</div>
        <div className={styles['terch-rang']}>3</div>
      </div>
    </div>
  )
}