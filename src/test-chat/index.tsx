import React, {useEffect, useRef, useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import {storage,getUrlQuery} from 'utils/tool';
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
  const {sender,receiver} = getUrlQuery();

  //存储socket对象
  const socK = useRef<any>();
  //获取滚动的dom元素
  const scrollDom = useRef<any>();
  //输入框输入的文本内容
  const [inputStr, setInputStr] = useState('');
  //消息列表数组
  const [msgList, setmsgList] = useState<any[]>([]);

  //组件初始化
  useEffect(()=>{
    //创建websocket对象
    let socket = io.connect('http://localhost:3001/chat',{query:{sender:sender}});
    socK.current = socket;
    socket.on('connect', function () {
      console.log('链接成功');
    });
    
    // 监听message事件
    socket.on('message', (data:any) => {
      // console.log('222');
      // console.log(data);
      setmsgList((oldMsg)=>{
        return [...oldMsg,data];
      });
      // console.log(scrollDom.current.scrollTop,scrollDom.current.scrollHeight,scrollDom.current.offsetHeight);
      scrollDom.current.scrollTop = scrollDom.current.scrollHeight - scrollDom.current.offsetHeight;
    });
  },[]);

//发送消息
function sendMsg(){
  socK.current.emit('message', {
    sender: sender,
    receiver: receiver,
    msg: inputStr,
    headerImg: `http://39.99.174.23/common/images/header_${sender}.jpg`,
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
                   {item.receiver == sender && <img src={item.headerImg} alt=""/>}
                    <span>{item.msg}</span>
                    {item.sender == sender && <img src={item.headerImg} alt=""/>}
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
