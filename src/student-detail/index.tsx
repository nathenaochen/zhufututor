import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import Loading from 'components/Loading';
import {  getUrlQuery,pageInit } from 'utils/tool';
import styles from './st.less';
import {getTeacherDetail} from 'apiService/service';
import {getStudentLisRes,Result} from 'interface/response';

var obj =  {
  name: 'Lilei',
  sex: '0',
  free_time: '星期一,星期二',
  class: '初三',
  subject: '数学,英语',
  header_img: 'http://39.99.174.23/common/images/header.jpg',
  charge: '100',
  request: '重点本科',
  key: '5fd02f15f6890d1246cee9fc',
  zuoyouming: '没有最好，只有更好'
}

function TeacherDetail(){

  //获取教师详情信息
  const [studentDetail, setStudentDetail] = useState<getStudentLisRes|Result>();

  //初始化函数
  async function init(){
    //获取学生id
    const {key} = getUrlQuery();
    //那去教师详情
    // const {code,result} = await getTeacherDetail({key:key});
    // console.log('教师详情信息',result);
    setStudentDetail(obj);
  }

  useEffect(()=>{
    init();
  },[]);

  if(!studentDetail){
    return <Loading />
  }


  return (
    <div className={styles.container}>
      {/* 中间内容区域 */}
      <div className={styles.content}>
        {/* 头像区域 */}
        <div className={styles.topper}>
          <div className={styles.ava}>
            <img src={studentDetail.header_img} alt=""/> 
          </div>
          <div className={styles.info}>
          <p className={styles.name}><strong>{studentDetail.name}</strong></p>
          {/* <p>{teacherDetail.school_tag}</p> */}
          <p>{studentDetail.zuoyouming}</p>
          </div>
        </div>

        {/* 基本信息区域 */}
        <div className={styles.baseInfo}>
          <h3>基本信息</h3>
          <div>
            <p className={styles.baseInfo_title}>在读年级</p>
          <p className={styles.baseInfo_detail}>{`${studentDetail.class}`}</p>
          </div>
          <div>
            <p className={styles.baseInfo_title}>弱势科目</p>
            <p className={styles.baseInfo_detail}>{studentDetail.subject}</p>
          </div>
          <div>
            <p className={styles.baseInfo_title}> 家教要求</p>
            <p className={styles.baseInfo_detail}>{studentDetail.request}</p>
          </div>
          {/* <div>
            <p className={styles.baseInfo_title}>上课校区</p>
            <p className={styles.baseInfo_detail}>
              <img src={require('./images/location.png')} alt="" className={styles.location}/>武汉光谷·光谷软件园
            </p>
          </div> */}
        </div>

        {/* 老师简介区域 */}
        {/* <div className={styles.introduce}>
          <h3>老师简介</h3>
          <div className={styles.self_introduce}>
            <p className={styles.introduce_title}>个人简介</p>
            <p className={styles.introduce_detail}>{teacherDetail.personal_introl}</p>
          </div>
          <div className={styles.characteristic}>
            <p className={styles.introduce_title}>教学特点</p>
            <p className={styles.introduce_detail}>{teacherDetail.teach_feature}</p>
          </div> */}
          {/* <div className={styles.published_book}>
            <p className={styles.introduce_title}>出版书籍</p>
            <p className={styles.introduce_detail}>《武汉十年中考真题解析》<br/><span>华中科技大学出版社，ISBN:978-7-5680-5963-3</span></p>
          </div> */}
        {/* </div> */}
      </div>

      {/* 底部区域 */}
      <div className={styles.footer}>
        <span className={styles.appoint} 
          onClick={(evt: React.MouseEvent)=>{
            evt.stopPropagation(); 
            if(window.isApp){
              JSSDK.openWebview({url:'/chat_detail?receiver='+studentDetail.key,title:studentDetail.name,type:1})
            }else{
              pageInit({url:`test-chat.html?receiverName=${studentDetail.name}&receiver=${studentDetail.key}`});
            }
          }
          }
            
          >找他聊聊</span>
        {/* <span className={styles.order}>去发单</span> */}
      </div>
    </div>
  )
}

const HocTeacherDetail = Hoc(TeacherDetail);

ReactDom.render(
  <HocTeacherDetail />,
  document.getElementById('root')
);
