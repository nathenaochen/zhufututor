import React, {useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import styles from './lp.less';

function LoginPage(){

  //用户账号
  const [userAccount, setUserAccount] = useState('');
  //用户密码
  const [pwd, setPwd] = useState('');
  //用户密码--隐藏
  const [pwdNo, setPwdNo] = useState('');
  //是否隐藏密码----flutter的webview支持input的password有bug，先自己手动实现此功能
  const [isshowPwd, setIsshowPwd] = useState(true);

  //去登陆
  async function gotoLogin(){
    console.log(userAccount,pwd);
    // JSSDK.openWebview({url:'/',title:'new webview'})
  }

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    // console.log(e);
    let value = e.target.value;
    setPwd((pwd)=>{
      if(pwd.length > value.length){
        return pwd.slice(0,pwd.length - 1);
      }else{
        return pwd + value.slice((value.length - 1));
      }
    });
    setPwdNo((pwd)=>{
      if(pwd.length > value.length){
        return pwd.slice(0,pwd.length - 1);
      }else{
        return pwd + '*';
      }
    });
  }


  return (
    <div>
      <div className={styles['login-box']}>
        <ul>
          <li className={styles['login-item']}>
            <span></span>
            <input 
              type="tel" placeholder='请输入账号' value={userAccount} 
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUserAccount(e.target.value)}}
            />
            <span></span>
          </li>
          <li className={styles['login-item']}>
            <span></span>
            <input 
              type="url" placeholder='请输入密码' value={isshowPwd ? pwdNo : pwd} autoFocus={true}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleChange(e)}}
            />
            <span onClick={(e:React.MouseEvent)=>{e.stopPropagation();setIsshowPwd((isshow)=>{return !isshow})}} className={isshowPwd ? '' : styles['see']}></span>
          </li>
        </ul>
        <div className={styles['options']}>
          <p>忘记密码?</p>
          <p>手机登陆</p>
        </div>
        <div className={styles['button-box']}>
          <p 
            className={cns(styles['login-button'],styles['first'])} 
            onClick={(e:React.MouseEvent<HTMLParagraphElement, MouseEvent>)=>{e.stopPropagation();gotoLogin()}}
          >登陆</p>
          <p 
            className={cns(styles['login-button'],styles['second'])} 
            onClick={(e:React.MouseEvent<HTMLParagraphElement, MouseEvent>)=>{}}
          >注册</p>
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


