import React,{useState,useEffect} from 'react';
import cns from 'classnames';
import styles from './cart.less';
import {pageInit} from 'utils/tool';
import {getTeacherLisRes} from 'interface/response';

interface CardProps {
  teacher: getTeacherLisRes;
}

export default function Cart(props:CardProps){

  const {teacher} = props;

  async function gotoDetail(key:string){
    pageInit({url:`teacher-detial.html?key=${key}`});
  }


  useEffect(()=>{
  },[]);

  return (
    <div className={styles.cart} onClick={(e:React.MouseEvent)=>{e.stopPropagation();gotoDetail(teacher.key);}}> 
      <div className={styles['left']}>
        <div className={styles.image}>
          <img src={teacher.header_img} alt=""/>  
        </div>
        <p className={styles.level}>{teacher.teacher_level}</p>
      </div>
      <div className={styles['right']}>
        <div className={styles['title']}>
          <span className={styles['name']}>{teacher.name}</span>
          <span className={cns(styles['sex'],teacher.sex == '0' ? styles['girl'] : styles['boy'])}></span>
          {
            teacher.free_time.split(',').map((item)=>{
              return  <span className={styles['time']}>{item}</span>
            })
          }
        </div>
        <div className={styles['tercher-info']}>
          <p>
            <span className={styles['school']}>{teacher.school_tag}</span>
            <span className={styles['quali']}>{teacher.degree}</span>
            <span className={styles['has-teach']}>授课<span>{teacher.teaching_time}</span>课时</span>
          </p>
          <span className={styles['money']}>￥{teacher.charge}元/小时</span>
        </div>
        <div className={styles['terch-rang']}>
          <p className={styles['grade']}>
            {
              teacher.teach_class.split(',').map((item)=>{
                return (
                <span>{item}</span>
                )
              })
            }
          </p>
          <p className={styles['subject']}>
            {
              teacher.teach_project.split(',').map((item)=>{
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