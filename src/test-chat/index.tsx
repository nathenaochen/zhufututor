import React, {useEffect, useRef, useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import LoadingBar from 'components/LoaddingBar';
import {storage,getUrlQuery} from 'utils/tool';
import {getHistoryChat} from 'apiService/service';
import styles from './tc.less';
import io from 'socket.io-client';

let meslist = [
  {msg:'dhjhfjk', sender:1, receiver:2},
  {msg:'金卡水水水水水水水水水水水水水水水水水', sender:1, receiver:2},
  {msg:'答复你觉得十分内疚', sender:1, receiver:2},
  {msg:'的健康的身份和监控',  sender:2, receiver:1},
  {msg:'的凤凰军事反击v',  sender:1, receiver:2},
  {msg:'但是否能借款单',  sender:2, receiver:1},
  {msg:'发v考虑什么v', sender:1, receiver:2},
  {msg:'dhjhfjk', sender:1, receiver:2},
  {msg:'金卡水水水水水水水水水水水水水水水水水金卡水水水水水水水水水水水水水水水水水金卡水水水水水水水水水水水水水水水水水', sender:1, receiver:2},
  {msg:'答复你觉得十分内疚', sender:1, receiver:2},
  {msg:'的健康的身份和监控',  sender:2, receiver:1},
  {msg:'的凤凰军事反击v',  sender:1, receiver:2},
  {msg:'但是否能借款单',  sender:2, receiver:1},
  {msg:'发v考虑什么v', sender:1, receiver:2},
];

function TestChat(){
  //获取聊天对象id
  const {receiver,receiverName} = getUrlQuery();
  const userName = storage.get(['username']).username;
  const sender = storage.get(['token']).token;

  //存储socket对象
  const socK = useRef<any>();
  //获取滚动的dom元素
  const scrollDom = useRef<any>();
  //记录当前滚动的dom元素的scrollHeight
  const scrollDomHeight = useRef<any>();
  //输入框输入的文本内容
  const [inputStr, setInputStr] = useState('');
  //消息列表数组
  const [msgList, setmsgList] = useState<any>([]);
  //判断是否到没有更多的记录了
  const [isEnd, setIsEnd] = useState<boolean>(false);

  //数据初始化
  async function init(){
    try{
      const {result} = await getHistoryChat({senderKey: sender,receiverKey:receiver});
      if(result){
        result.sort((a:any,b:any)=>{
          return a.createdate - b.createdate;
        });
      }
      console.log('初始化获取聊天记录结果为：',result);
      setmsgList(result);
      scrollDom.current.scrollTop = scrollDom.current.scrollHeight - scrollDom.current.offsetHeight;
      scrollDomHeight.current = scrollDom.current.scrollHeight;
    }catch(err){
      console.log('初始获取聊天记录时出错',err);
    }
  }

  //组件初始化
  useEffect(()=>{
    //创建websocket对象　
    let socket = io.connect(EVN == 'development'?'http://39.99.174.23:3001/chat':'http://39.99.174.23:3001/chat',{query:{sender:sender,typeCon:'detail',receiver: receiver}});
    socK.current = socket;
    socket.on('connect', function () {
      console.log('链接成功');
    });
    
    //进入页面时，修改清 除未读消息
    socket.emit('updataunread',{sender:sender,receiver: receiver});
    // 监听message事件
    socket.on('message', (data:any) => {
      setmsgList((oldMsg:any)=>{
        return [...oldMsg,data];
      });
      // console.log(scrollDom.current.scrollTop,scrollDom.current.scrollHeight,scrollDom.current.offsetHeight);
      scrollDom.current.scrollTop = scrollDom.current.scrollHeight - scrollDom.current.offsetHeight;
      scrollDomHeight.current = scrollDom.current.scrollHeight;
    });

    document.title = receiverName as any;

    // scrollDom.current.addEventListener('scroll',throttle(scrollFun))

    init();
  },[]);

//滚动事件对应回调
async function scrollFun(){
  // console.log('scroll',isEnd);
  if(isEnd){return}
  if(scrollDom.current.scrollTop < 15){
    try{
      const {result=[]} = await getHistoryChat({senderKey: sender,receiverKey:receiver,lastTime:msgList[0].createdate});
      if(result.length != 0){
        result.sort((a:any,b:any)=>{
          return a.createdate - b.createdate;
        });
        console.log('下拉刷新获取聊天记录结果为：',result);
        setmsgList([...(result as Array<any>),...msgList]);
        scrollDom.current.scrollTop = scrollDom.current.scrollHeight - scrollDomHeight.current;
        scrollDomHeight.current = scrollDom.current.scrollHeight;
      }else if(result.length == 0){
        setIsEnd(true);
      }
      
    }catch(err){
      console.log('下拉刷新获取聊天记录时出错',err);
    }
  }
}

//实现一个节流函数  fn--真正执行任务的函数，外部传过来   time--指定的时间间隔
function throttle(fn:Function,time=500){
  let canRun = true;
  return function(evt){
      evt.stopPropagation();
      if(!canRun){return; }
      canRun = false;
      console.log(1,'this');
      let id = setTimeout(()=>{
        fn();
        canRun = true;
        clearTimeout(id);
    },time);
  }
}

//发送消息
function sendMsg(){
  socK.current.emit('message', {
    sender: sender,
    receiver: receiver,
    msg: inputStr,
    receivername: receiverName,
    sendername: userName
  });
  //发送完消息后清空输入字符串
  setInputStr('');
}

//处理聊天内容
function handInputMsg(e:React.ChangeEvent<HTMLTextAreaElement>){
  // console.log(e.target.value); (e)=>{e.stopPropagation();scrollFun(e);} onScroll={throttle(scrollFun)}
  setInputStr(e.target.value);
}

  return (
    <div className={styles['container']}>
      <div className={styles['content']} ref={scrollDom} onScroll={throttle(scrollFun)}>
        <LoadingBar text={ isEnd ? '没有更多聊天记录了' : ''} isShowLoadingImg={!isEnd}/>
        <div className={styles['content-scroll']}>
          <ul>
            {
              msgList.map((item:any,idx:any) => {
                return (
                  <li key={idx} className={cns(styles['msg-item'], item.sender == sender ? styles['isme'] : '')}>
                   {item.receiver == sender && <img src={`http://39.99.174.23/common/images/header_${item.sender}.jpg`} alt=""/>}
                    <span>{item.msg}</span>
                    {item.sender == sender && <img src={`http://39.99.174.23/common/images/header_${item.sender}.jpg`} alt=""/>}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className={styles['input-box']}>
        <textarea className={styles['input']} placeholder='输入消息' value={inputStr}
          onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{handInputMsg(e);}}
        />
        <span  onClick={(e:React.MouseEvent)=>{e.stopPropagation();sendMsg();}}>发送</span>
      </div>
    </div>
  )
}

const HocTestChat = Hoc(TestChat);

ReactDom.render(
  <HocTestChat />,
  document.getElementById('root')
);
