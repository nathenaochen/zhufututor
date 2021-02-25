import React, {useState, useEffect, useRef, ReactNode} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import Dailog from 'components/Dailog';
import styles from './lp.less';
import {pageInit, checkIsApp,storage} from 'utils/tool';
import {login} from 'apiService/service';

interface BtnAttr {
  text: string;   //按钮文字
  action: Function; //点击按钮执行的方法
}
interface DailogProps {
  message?: string;   //弹框提示内容
  btns?: BtnAttr[];    //按钮列表
  className?: string;  //外传控制class
  title?: string;      //弹框标题
  children?: ReactNode;
}

function LoginPage(){

  //用户账号
  const [userAccount, setUserAccount] = useState('');
  //用户密码
  const [pwd, setPwd] = useState('');
  //用户密码--隐藏
  const [pwdNo, setPwdNo] = useState('');
  //是否隐藏密码----flutter的webview支持input的password有bug，先自己手动实现此功能
  const [isshowPwd, setIsshowPwd] = useState(true);
  //随机验证码--前端实现
  const [authCode,setAuthCode] = useState('1234');
  //输入的验证码
  const [inputAuthCode,setInputAuthCode] = useState('');
  //控制dailog的显示隐藏
  const [showDailog,setShowDailog] = useState(false);
  //控制dailog的相关属性
  const dailogMsg = useRef<DailogProps>({});


  //初始化
  async function init(){
    const isApp = await checkIsApp();
    //设置随机验证码
    setAuthCode(()=>{
      return createCode();
    });
    if(isApp){
      const {account} = await JSSDK.getFileData({key:['account']});
      account != null && setUserAccount(account);
    }else{
      const {account} = storage.get(['account']);
      account != null && setUserAccount(account);
    }
    
  }


  //页面初始化
  useEffect(()=>{
    init();
    JSSDK.onappear({cb:()=>{
      console.log('login-page---onappear');
    }})
  },[]);

  //生成随机验证码
  function createCode():string {
    // let code = ''
    // let codeLength = 4; //验证码的长度  
    // var random = new Array<number|string>(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    //     'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
    // for(var i = 0; i < codeLength; i++) { //循环操作  
    //     var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
    //     code += random[index]; //根据索引取得随机数加到code上  
    // }
    // return code;
    return Math.random().toString(36).substr(-4);
  }

  //刷新随机验证码
  function refreshAuthCode():void{
    let code:string = createCode();
    setAuthCode(code);
  }

  //去登陆
  async function gotoLogin(){
    console.log(userAccount,pwd,inputAuthCode);
    if(!userAccount || !pwd || !inputAuthCode ){
      dailogMsg.current.message = '输入的字符不能为空，请检查';
      dailogMsg.current.btns = [{text:'确定',action:()=>{setShowDailog(false)}}];
      setShowDailog(true);
      return ;
    }
    if(inputAuthCode.toLocaleUpperCase() != authCode){
      dailogMsg.current.message = '验证码输入错误，请重新输入';
      dailogMsg.current.btns = [{text:'确定',action:()=>{setShowDailog(false);refreshAuthCode()}}];
      setShowDailog(true);
      return ;
    }
    if(pwd.length < 6){
      dailogMsg.current.message = '密码输入错误，请重新输入';
      dailogMsg.current.btns = [{text:'确定',action:()=>{setShowDailog(false);refreshAuthCode()}}];
      setShowDailog(true);
      return ;
    }
    try{
      const {code, result, errorMeg} = await login({account:userAccount,password:pwd});
      console.log('登陆返回结果',result,result?.user?.type);
      if(code == '0'){
        //app内
        if(window.isApp){
          JSSDK.writeData({account:result?.user?.account,token:result?.user?.key,role:result?.user?.type,username:result?.user?.username});
          JSSDK.close({});
        }else{
          //非app内
          storage.set({account:result?.user?.account,token:result?.user?.key,role:result?.user?.type,username: result?.user?.username});
          window.history.back();
        }
      }else{
        dailogMsg.current.message = `${errorMeg}`;
        dailogMsg.current.btns = [{text:'确定',action:()=>{setShowDailog(false)}}];
        setShowDailog(true);
      }
    }catch(err){
      console.log(err);
      dailogMsg.current.message = `${err?.errorMeg}`;
      dailogMsg.current.btns = [{text:'确定',action:()=>{setShowDailog(false)}}];
      setShowDailog(true);
    }
  }

  //去注册
  function gotoRegister(){
    pageInit({url:'register.html',needclose:2,hasInput:true});
  }

  //处理密码输入框--自己手动实现输入框密码功能
  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    let value = e.target.value;
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
            <span onClick={(e:React.MouseEvent) => {e.stopPropagation();setUserAccount('')}}></span>
          </li>
          <li className={styles['login-item']}>
            <span></span>
            <input 
              type="url" placeholder='请输入密码' value={isshowPwd ? pwdNo : pwd}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{handleChange(e)}}
            />
            <span onClick={(e:React.MouseEvent)=>{e.stopPropagation();setIsshowPwd((isshow)=>{return !isshow})}} className={isshowPwd ? '' : styles['see']}></span>
          </li>
          <li className={styles['login-item']}>
            <span></span>
            <input 
              type="url" placeholder='请输入验证码' value={inputAuthCode}
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setInputAuthCode(e.target.value)}}
            />
            <span onClick={(e:React.MouseEvent)=>{e.stopPropagation();refreshAuthCode();}}>{authCode}</span>
          </li>
        </ul>
        <div className={styles['options']}>
          <p>忘记密码?</p>
          <p>手机登陆</p>
        </div>
        <div className={styles['button-box']}>
          <p 
            className={cns(styles['login-button'],styles['first'])} 
            onClick={(e:React.MouseEvent)=>{e.stopPropagation();gotoLogin()}}
          >登陆</p>
          <p 
            className={cns(styles['login-button'],styles['second'])} 
            onClick={(e:React.MouseEvent)=>{e.stopPropagation();gotoRegister();}}
          >注册</p>
        </div>
      </div>
      <Dailog 
        visable={showDailog} 
        title={dailogMsg.current.title} 
        message={dailogMsg.current.message} 
        btns={dailogMsg.current.btns}/>
    </div>
  )
}

const HocLoginPage = Hoc(LoginPage);

ReactDom.render(
  <HocLoginPage />,
  document.getElementById('root')
);


