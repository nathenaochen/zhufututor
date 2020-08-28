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
        <div className={styles['tercher-info']}>
          <p>
            <span className={styles['school']}>北京大学</span>
            <span className={styles['quali']}>本科</span>
            <span className={styles['has-teach']}>授课<span>0</span>课时</span>
          </p>
          <span className={styles['money']}>￥{100}元</span>
        </div>
        <div className={styles['terch-rang']}>
          <p className={styles['grade']}>
            {
              ['一年级','二年级','三年级'].map((item)=>{
                return (
                <span>{item}</span>
                )
              })
            }
          </p>
          <p className={styles['subject']}>
            {
              ['数学','语文','英语'].map((item)=>{
                return (
                <span>{item}</span>
                )
              })
            }
          </p>
        </div>
      </div>
    </div>
  )
}