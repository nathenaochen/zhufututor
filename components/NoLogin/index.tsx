import React, {useState} from 'react';
import Arrow from 'components/Arrow';
import styles from './nl.less';
import cns from 'classnames';
import { pageInit } from 'utils/tool';

interface NoLoginProps {
  className?: string;
}

function NoLogin(props: NoLoginProps){
  const {className} = props;
  return (
    <div className={cns(styles.box,className)}>
      <p className={styles['first']}>您暂无登录，登录查看更多信息</p>
      <p className={styles['second']} onClick={(e:React.MouseEvent)=>{e.stopPropagation();pageInit({url:'login-page.html',hasInput:true});}}>去登陆<Arrow className={styles['arrow']}/></p>
    </div>
  )
}

export default NoLogin;