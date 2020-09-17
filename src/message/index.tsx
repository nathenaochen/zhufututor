import React from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import styles from './msg.less';

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

  function gotoDetail(){console.log('22233');
    JSSDK.openWebview({url:'/chat_detail',title:'李磊',type:1})
  }

  return (
    <div className={styles['messag-container']}>
      <ul>
        {mockData.map((item)=>{
          return (
            <li onClick={(evt: React.MouseEvent)=>{evt.stopPropagation();gotoDetail();}}>
              <div className={styles['left']}>
                <img src={item.imgUrl} alt=""/>
              </div>
              <div className={styles['right']}>
                <p className={styles['name']}>{item.name}</p>
                <p className={styles['new-message']}>{item.latestMsg}</p>
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