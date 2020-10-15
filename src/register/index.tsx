import React, {useState, useEffect, useRef, ReactNode} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import Dailog from 'components/Dailog';
import styles from './reg.less';
import {pageInit,storage} from 'utils/tool';
import {register} from 'apiService/service';

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
   //控制dailog的显示隐藏
   const [showDailog,setShowDailog] = useState(false);
   //控制dailog的相关属性
   const dailogMsg = useRef<DailogProps>({});

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
  async function goRegister(){
    if(!userName || !pwd || !pwdSure || !type){
      dailogMsg.current.message = '输入的字符不能为空，请检查';
      dailogMsg.current.btns = [{text:'确定',action:()=>{setShowDailog(false)}}];
      setShowDailog(true);
      return ;
    }
    if(pwd != pwdSure){
      dailogMsg.current.message = '两次输入密码不一样';
      dailogMsg.current.btns = [{text:'确定',action:()=>{setShowDailog(false)}}];
      setShowDailog(true);
      return ;
    }
    if(pwd.length < 6 || pwdSure.length < 6){
      dailogMsg.current.message = '密码不能少于6位数';
      dailogMsg.current.btns = [{text:'确定',action:()=>{setShowDailog(false)}}];
      setShowDailog(true);
      return ;
    }
    try{
      const {code, result} = await register({username:userName,password:pwd,passwordSure:pwdSure,type:type});
      console.log('注册返回结果',result,result?.user?.account);
      if(code == '0'){
        dailogMsg.current.title = `恭喜您注册成功`;
        dailogMsg.current.message = `您的账号是 ${result?.user?.account}`;
        dailogMsg.current.btns = [{text:'马上登陆',action:()=>{pageInit({url:'login-page.html',needclose:2,hasInput:true})}},{text:'绑定电话', action: ()=>{pageInit({url:'setting.html',needclose:2})}}];
        setShowDailog(true);
        JSSDK.writeData({account:result?.user?.account,token:'',role:''});
        storage.set({account:result?.user?.account,token:'',role:''}); //非app内
      }else{
        dailogMsg.current.message = `${result?.errorMeg}`;
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

  return (
    <div>
      <div className={styles['login-box']}>
        <ul>
          <li className={styles['login-item']}>
            <span></span>
            <input  
              type="text" placeholder='请输入用户名' value={userName} 
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
          <p className={cns(styles['login-button'],styles['second'])} onClick={(e:React.MouseEvent) => {e.stopPropagation();pageInit({url:'login-page.html',needclose:2,hasInput:true});}}>已有帐号?登陆</p>
        </div>
        {/* <div className={styles['footer']}>
          已有帐号? <span onClick={(e:React.MouseEvent)=>{e.stopPropagation();pageInit({url:'login-page.html'});}}>登陆</span> 
        </div> */}
      </div>
      <Dailog 
        visable={showDailog} 
        title={dailogMsg.current.title} 
        message={dailogMsg.current.message} 
        btns={dailogMsg.current.btns}/>
    </div>
  )
}

const HocRegister = Hoc(Register);

ReactDom.render(
  <HocRegister />,
  document.getElementById('root')
);