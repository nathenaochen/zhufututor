import React, {useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import styles from './lp.less';

function LoginPage(){

  // const []

  //去登陆
  async function gotoLogin(){
    JSSDK.openWebview({url:'/',title:'new webview'})
  }

  return (
    <div>
      <div className={styles['login-box']}>
        {/* <p className={styles['login-type']}>密码登陆</p> */}
        <ul>
          <li className={styles['login-item']}>
            <span></span>
            <input type="tel" placeholder='请输入账号'/>
            <span></span>
          </li>
          <li className={styles['login-item']}>
            <span></span>
            <input type="url" placeholder='请输入密码'/>
            <span></span>
          </li>
        </ul>
        <div className={styles['options']}>
          <p>忘记密码?</p>
          <p>手机登陆</p>
        </div>
        <div className={styles['button-box']}>
          <p className={cns(styles['login-button'],styles['first'])} onClick={()=>{}}>登陆</p>
          <p className={cns(styles['login-button'],styles['second'])}>注册</p>
        </div>
      </div>
    </div>
  )
}

const HocLoginPage = Hoc(LoginPage);

ReactDom.render(
  <HocLoginPage />,
  document.getElementById('root')
);


