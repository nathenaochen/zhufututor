import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import Dailog from 'components/Dailog';
import styles from './reg.less';
import {pageInit} from 'utils/tool';
import {register} from 'apiService/service';

function Register(){
   //用户用户名
   const [userName, setUserName] = useState('');
   //用户密码
   const [pwd, setPwd] = useState('');
   //用户密码--隐藏
   const [pwdNo, setPwdNo] = useState('');
   //用户密码
   const [pwdSure, setPwdSure] = useState('');
   //用户密码--隐藏
   const [pwdSureNo, setPwdSureNo] = useState('');
   //单选框
   const [type, setType] = useState('STUDENT');
   //控制dailog
   const [showDailog,setShowDailog] = useState(false);

  function handleChange(e:React.ChangeEvent<HTMLInputElement>, type:string){
    let value = e.target.value;
    if(type == 'first'){
      //记录实际密码值
      setPwd((pwd)=>{
        if(pwd.length > value.length){ //判断是否输入的是删除
          return pwd.slice(0,pwd.length - 1);
        }else{
          return pwd + value.slice((value.length - 1));
        }
      });
      //记录隐藏密码
      setPwdNo((pwd)=>{
        if(pwd.length > value.length){//判断是否输入的是删除
          return pwd.slice(0,pwd.length - 1);
        }else{
          return pwd + '*';
        }
      });
    }else{
      //记录实际密码值
      setPwdSure((pwd)=>{
        if(pwd.length > value.length){ //判断是否输入的是删除
          return pwd.slice(0,pwd.length - 1);
        }else{
          return pwd + value.slice((value.length - 1));
        }
      });
      //记录隐藏密码
      setPwdSureNo((pwd)=>{
        if(pwd.length > value.length){//判断是否输入的是删除
          return pwd.slice(0,pwd.length - 1);
        }else{
          return pwd + '*';
        }
      });
    }
  }

  //去注册
  async function goRegister(){ setShowDailog(true);
    // console.log(userName,pwd,pwdSure,type);
    // if(!userName || !pwd || !pwdSure || !type){
    //   console.log('用户名密码等不能为空');
    // }
    // const {code, result} = await register({username:userName,password:pwd,passwordSure:pwdSure,type:type});
    // console.log('注册返回结果',result);
    // if(code == '0'){
    //   pageInit({url:'login-page.html'});
    // }
  }

  return (
    <div>
      <div className={styles['login-box']}>
        <ul>
          <li className={styles['login-item']}>
            <span></span>
            <input  
              type="text" placeholder='请输入用户名' autoFocus={true} value={userName} 
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setUserName(e.target.value)}}/>
            <span onClick={(e:React.MouseEvent) => {e.stopPropagation();setUserName('')}}></span>
          </li>
          <li className={styles['login-item']}>
            <span></span>
            <input  type="url" placeholder='请输入密码' value={pwdNo} 
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleChange(e,'first')}}/>
          </li>
          <li className={styles['login-item']}>
            <span></span>
            <input  type="url" placeholder='请确认密码' value={pwdSureNo} 
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleChange(e,'second')}}/>
          </li>
          <li className={styles['login-item']}>
            <p>
              <span></span>
              <p>选择角色</p>
            </p>
            <div className={styles['choose']}>
              <p><span>学生</span><input type="radio" value='1' checked={type == 'STUDENT'} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setType('STUDENT')}}/></p>
              <p><span>老师</span><input type="radio" value='2' checked={type == 'TEACHER'} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setType('TEACHER')}}/></p>
            </div>
          </li>
        </ul>
        <div className={styles['button-box']}>
          <p className={cns(styles['login-button'],styles['first'])} onClick={(e:React.MouseEvent) => {e.stopPropagation();goRegister();}}>注册</p>
          <p className={cns(styles['login-button'],styles['second'])} onClick={(e:React.MouseEvent) => {e.stopPropagation();pageInit({url:'login-page.html'});}}>已有帐号?登陆</p>
        </div>
        {/* <div className={styles['footer']}>
          已有帐号? <span onClick={(e:React.MouseEvent)=>{e.stopPropagation();pageInit({url:'login-page.html'});}}>登陆</span> 
        </div> */}
      </div>
      <Dailog visable={showDailog} title='注册成功' message='lalal的那份几年的时间妇女解放你单独刷卡积分当年反抗' btns={[{text:'确认',action: ()=>{setShowDailog(false)}},{text:'取消',action: ()=>{setShowDailog(false)}}]}/>
    </div>
  )
}

const HocRegister = Hoc(Register);

ReactDom.render(
  <HocRegister />,
  document.getElementById('root')
);