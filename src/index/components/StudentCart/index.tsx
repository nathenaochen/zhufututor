import React from 'react';
import cns from 'classnames'
import styles from './sc.less';
import {pageInit} from 'utils/tool';
import {getStudentLisRes} from 'interface/response';

interface StudentCardProps {
  student: getStudentLisRes;
}


function StudentCart(props:StudentCardProps){
  const {student} = props;

  async function gotoDetail(key:string){
    pageInit({url:`student-detail.html?key=${key}`});
  }


  return (
    <div className={styles['student-cart']} onClick={(e:React.MouseEvent)=>{e.stopPropagation();gotoDetail(student.key);}}>
      <div className={styles['left']}>
        <div className={styles.image}>
            <img src={student.header_img} alt=""/>  
          </div>
      </div>
      <div className={styles['right']}>
        <div className={styles['title']}>
            <span className={styles['name']}>{student.name}</span>
            <span className={cns(styles['sex'],student.sex == '0' ? styles['girl'] : styles['boy'])}></span>
            {
              student.free_time ? student.free_time.split(',').map((item)=>{
                return  <span className={styles['time']}>{item}</span>
              }) : <span className={styles['time']}>周末</span>
            }
          </div>
          <div className={styles['student-rang']}>
            <p className={styles['grade']}>
              <span>{student.class ? student.class : '暂无'}</span>
            </p>
            <p className={styles['subject']}>
              {
                student.subject ? student.subject.split(',').map((item)=>{
                  return (
                  <span>{item}</span>
                  )
                }) : <span>暂无</span>
              }
            </p>
        </div>
        <div><span className={styles['money']}>￥{student.charge}元/小时</span></div>
      </div>
    </div>
  )
}

export default StudentCart;