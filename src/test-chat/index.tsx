import React, {useEffect, useRef, useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
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
  //输入框输入的文本内容
  const [inputStr, setInputStr] = useState('');
  //消息列表数组
  const [msgList, setmsgList] = useState<any>([]);

  //数据初始化
  async function init(){
    try{
      const {result} = await getHistoryChat({senderKey: sender,receiverKey:receiver});
      console.log('初始化获取聊天记录结果为：',result);
      setmsgList(result);
      scrollDom.current.scrollTop = scrollDom.current.scrollHeight - scrollDom.current.offsetHeight;
    }catch(err){
      console.log('初始获取聊天记录时出错',err);
    }
  }

  //组件初始化
  useEffect(()=>{
    //创建websocket对象
    let socket = io.connect('http://localhost:3001/chat',{query:{sender:sender,typeCon:'detail'}});
    socK.current = socket;
    socket.on('connect', function () {
      console.log('链接成功');
    });
    
    //进入页面时，修改清除未读消息
    socket.emit('updataunread',{sender:sender,receiver: receiver});
    // 监听message事件
    socket.on('message', (data:any) => {
      // console.log('222');
      // console.log(data);
      setmsgList((oldMsg:any)=>{
        return [...oldMsg,data];
      });
      // console.log(scrollDom.current.scrollTop,scrollDom.current.scrollHeight,scrollDom.current.offsetHeight);
      scrollDom.current.scrollTop = scrollDom.current.scrollHeight - scrollDom.current.offsetHeight;
    });

    init();
  },[]);

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
  // console.log(e.target.value);
  setInputStr(e.target.value);
}

  return (
    <div className={styles['container']}>
      <div className={styles['content']} ref={scrollDom}>
        <div className={styles['content-scroll']}>
          <ul>
            {
              msgList.map((item,idx) => {
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
