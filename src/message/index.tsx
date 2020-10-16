import React, {useEffect,useRef, useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import { pageInit } from 'utils/tool';
import Hoc from 'components/Hoc';
import Loading from 'components/Loading';
import io from 'socket.io-client';
import {storage,getUrlQuery} from 'utils/tool';
import styles from './msg.less';
import {getRecentList} from 'apiService/service';

interface itemData {
  name: string;
  latestMsg: string;
  imgUrl: string;
}

let mockData: itemData[] = [
  {
    'name': '熊明',
    'latestMsg': '你决定环境hi的计划ID技术的回复我hi哦评价hi科技偶尔我家滴偶奇偶额金佛寺',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '李磊',
    'latestMsg': '哈比hjdfhjshfjhflkdklfdghkldfghdfklgjdflkjdfkd',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '阿米',
    'latestMsg': 'jdfhdsf但是那份快乐的时间付款了电视剧发来看看了',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '小强',
    'latestMsg': '减肥的开始节日快乐人么离开我非居民父类的VM法律框架',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '大熊',
    'latestMsg': '独食难肥见到你考虑代码来看大家都能发电量，干嘛呢来看发你的快乐健康',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '恺恺',
    'latestMsg': '大家佛山东方肯定没法开关机ODF港囧进风口',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '囧森',
    'latestMsg': 'hjdshfjdsnhfj剪短发的吗，付款了，马上发你的刷卡缴费J看大家快来',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '杰克',
    'latestMsg': '父母那肯定是两方面考虑是否记得看是否能打开了手机能否考虑国内空间给你看了梵蒂冈',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '艾玛',
    'latestMsg': '你决好的环境hi的计划ID技术的回复我hi哦评价hi',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '鲍勃',
    'latestMsg': '好的',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': 'Hellen',
    'latestMsg': 'jidkfjdklfd,fmnkldgnmd,gnjkngmknj',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '熊明',
    'latestMsg': '你决定环境hi的计划ID技术的回复我hi哦评价hi',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '熊明',
    'latestMsg': '你决定环境hi的计划ID技术的回复我hi哦评价hi',
    'imgUrl': '../../common/images/header.jpg'
  },
  {
    'name': '熊明',
    'latestMsg': '你决定环境hi的计划ID技术的回复我hi哦评价hi',
    'imgUrl': '../../common/images/header.jpg'
  },
]

function MessageList(){

  const sender = storage.get(['token']).token;

  //存储socket对象
  const socK = useRef<any>();

  //最近联系好友列表
  const [recentlyFriend, setRecentlyFriend] = useState<any>();

  //数据初始化
  async function init(){
    try{
      const {result} = await getRecentList({senderKey:sender});
      console.log('获取最近好友列表结果',result);
      setRecentlyFriend(result);
    }catch(err){
      console.log('获取最近好友列表结果报错',err)
    }
  }

  //组件初始化
  useEffect(()=>{
    JSSDK.onappear({cb:()=>{
      console.log('message---onappear');
    }})

    //创建websocket对象
    let socket = io.connect('http://localhost:3001/chat',{query:{sender:sender,typeCon:'list'}});
    socK.current = socket;
    socket.on('connect', function () {
      console.log('链接成功');
    });
    // 监听newmsg事件,新消息提醒
    socket.on('newmsg', (data:any) => {
      console.log(data);
      setRecentlyFriend((oldList:any)=>{
        let idx = oldList.findIndex((item:any)=>{return item.receiver == data.receiver});
        if(idx != -1){
          oldList[idx].nestMsg = data.nestMsg;
          oldList[idx].noreadNumber = data.noreadNumber;
          oldList[idx].date = data.date;
          return [...oldList];
        }else{
          return [data,...oldList]
        }
       
      });
    });

    init();
  },[]);

  function gotoDetail(receiver:any,name:any){
    if(window.isApp){
      JSSDK.openWebview({url:'/chat_detail?receiverName='+name+'&receiver='+receiver,title:'李磊',type:1})
    }else{
      pageInit({url:`/test-chat.html?receiverName=${name}&receiver=${receiver}`});
    }
    
  }

  console.log(recentlyFriend);

  if(!recentlyFriend){
    return <Loading />
  }

  return (
    <div className={styles['messag-container']}>
      <ul>
        {recentlyFriend.map((item:any)=>{
          return (
            <li onClick={(evt: React.MouseEvent)=>{evt.stopPropagation();gotoDetail(item.receiver,item.name);}} key={item.sender}>
              <div className={styles['left']}>
                <img src={`http://39.99.174.23/common/images/header_${item.receiver}.jpg`} alt=""/>
              </div>
              <div className={styles['right']}>
                <p className={styles['name']}>{item.name}</p>
                <p className={styles['new-message']}>{item.nestMsg}</p>
              </div>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

const HocMessageList = Hoc(MessageList);

ReactDom.render(
  <HocMessageList />,
  document.getElementById('root')
);