import React, {useState, useRef, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import Hoc from 'components/Hoc';
import Arrow from 'components/Arrow';
import styles from './cm.less';
import Dailog from 'components/Dailog';
import {completeTeacherMessage} from 'apiService/service';
import { storage } from 'utils/tool';

let teacherItem = [
  {
    text: '昵称',
    clickFun: (evt)=>{
    },
    type: 'nc',
    placeholder:'请输入昵称',
  },
  {
    text: '性别',
    clickFun: (evt)=>{

    },
    type: 'xb'
  },
  {
    text: '签名',
    clickFun: (evt)=>{

    },
    type: 'qm',
    placeholder:'请输入签名',
  },
  {
    text: '毕业学校',
    clickFun: (evt)=>{

    },
    type: 'byxx',
    placeholder:'请输入毕业学校',
  },
  {
    text: '学历',
    clickFun: (evt)=>{

    },
    type: 'xl',
    placeholder:'请输入最高学历',
  },
  {
    text: '家教年限',
    clickFun: (evt)=>{

    },
    type: 'jjnx',
    placeholder:'请输家教工作年限，以小时为单位',
  },
]


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

function CompleteMessage(props){

  const {role ='teacher'} = props;

  const [username,setUsername] = useState();
  const [sex,setSex] = useState('1');
  const [signName,setSignName] = useState();
  const [school,setSchool] = useState();
  const [degree,setDegree] = useState();
  const [jjnx,setJjnx] = useState();

  //控制dailog的显示隐藏
  const [showDailog,setShowDailog] = useState(false);
  //控制dailog的相关属性
  const dailogMsg = useRef<DailogProps>({});

  function handleInput(evt,type) {console.log(evt.target.value);
    if(role == 'teacher'){
      switch(type){
        case 'nc':
          setUsername(evt.target.value);
          break;
        case 'xb':
          setShowDailog(true);
          break;
        case 'qm':
          setSignName(evt.target.value);
          break;
        case 'byxx':
          setSchool(evt.target.value);
          break;
        case 'xl':
          setDegree(evt.target.value);
          break;
          case 'jjnx':
            setJjnx(evt.target.value);
            break;
        default:
          break;
      }
    }else{

    }
  }


  function changeHeader(){
    JSSDK.openWebview({url:'/imagepicker',type:1})
    
  }

  async function handClick(evt){
    console.log(username,sex,signName,school,degree);
    // if(role == 'teacher'){
    //   const {result} = await completeTeacherMessage({
    //     key: isApp ? await JSSDK.getFileData({key:['token']}) : storage.get(['token']),
    //     account: isApp ? await JSSDK.getFileData({key:['account']}) : storage.get(['account']),
    //     name: username,
        
    //   });
    // }else{

    // }

  }


  return (
    <div className={styles['container']}>
      <ul className={styles['first']}>
        <li className={styles['item']} onClick={(e)=>{e.stopPropagation();changeHeader();}}><span>头像</span><Arrow className={styles.arrow} onAction={()=>{changeHeader();}}/></li>
      </ul>
      {
        role == 'teacher' ? 
        <ul className={styles['second']}>
          {
            teacherItem.map((item)=>{
              return (
                item.type == 'xb' ? 
                <li className={styles['item']}>
                  <span>{item.text}</span>
                  <input 
                  value={sex == '1' ? '男' : '女'} onClick={(e)=>{e.stopPropagation();setShowDailog(true)}}
                  />
                </li> :
                <li className={styles['item']}>
                  <span>{item.text}</span>
                  <input onChange={(evt)=>{handleInput(evt,item.type);}}  placeholder={item.placeholder}/>
                </li>
              )
            })
          }
        </ul> : 
        <ul>
          <li>none</li>
        </ul>
      }

      <p className={styles['button']} onClick={(e)=>{e.stopPropagation();handClick(e);}}>确认修改</p>

      <Dailog  visable={showDailog} >
        <div className={styles['box']}>
          <p>
            <p>选择性别:</p>
          </p>
          <div className={styles['choose']}>
            <p><span>男</span><input type="radio" value='1' checked={sex == '1'} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setSex('1');setShowDailog(false)}}/></p>
            <p><span>女</span><input type="radio" value='2' checked={sex == '0'} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setSex('0');setShowDailog(false)}}/></p>
          </div>
        </div>
      </Dailog>
      
    </div>
  )
}

const HocCompleteMessage = Hoc(CompleteMessage);

ReactDOM.render(<HocCompleteMessage />, document.getElementById('root'));
