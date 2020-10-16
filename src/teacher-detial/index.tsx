import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import Loading from 'components/Loading';
import {  getUrlQuery,pageInit } from 'utils/tool';
import styles from './td.less';
import {getTeacherDetail} from 'apiService/service';
import {getTeacherLisRes,Result} from 'interface/response';

function TeacherDetail(){

  //获取教师详情信息
  const [teacherDetail, setTeacherDetail] = useState<getTeacherLisRes|Result>();

  //初始化函数
  async function init(){
    //获取教师id
    const {key} = getUrlQuery();
    //那去教师详情
    const {code,result} = await getTeacherDetail({key:key});
    console.log('教师详情信息',result);
    setTeacherDetail(result);
  }

  useEffect(()=>{
    init();
  },[]);

  if(!teacherDetail){
    return <Loading />
  }


  return (
    <div className={styles.container}>
      {/* 中间内容区域 */}
      <div className={styles.content}>
        {/* 头像区域 */}
        <div className={styles.topper}>
          <div className={styles.ava}>
            <img src={teacherDetail.header_img} alt=""/> 
          </div>
          <div className={styles.info}>
          <p className={styles.name}><strong>{teacherDetail.name}</strong></p>
          <p>{teacherDetail.school_tag}</p>
          <p>{teacherDetail.zuoyouming}</p>
          </div>
        </div>

        {/* 基本信息区域 */}
        <div className={styles.baseInfo}>
          <h3>基本信息</h3>
          <div>
            <p className={styles.baseInfo_title}>教育背景</p>
          <p className={styles.baseInfo_detail}>{`${teacherDetail.school_tag} ${teacherDetail.degree}`}</p>
          </div>
          <div>
            <p className={styles.baseInfo_title}>教授课程</p>
            <p className={styles.baseInfo_detail}>{teacherDetail.teach_project}</p>
          </div>
          <div>
            <p className={styles.baseInfo_title}>获得荣誉 </p>
            <p className={styles.baseInfo_detail}>{teacherDetail.gethonor}</p>
          </div>
          {/* <div>
            <p className={styles.baseInfo_title}>上课校区</p>
            <p className={styles.baseInfo_detail}>
              <img src={require('./images/location.png')} alt="" className={styles.location}/>武汉光谷·光谷软件园
            </p>
          </div> */}
        </div>

        {/* 老师简介区域 */}
        <div className={styles.introduce}>
          <h3>老师简介</h3>
          <div className={styles.self_introduce}>
            <p className={styles.introduce_title}>个人简介</p>
            <p className={styles.introduce_detail}>{teacherDetail.personal_introl}</p>
          </div>
          <div className={styles.characteristic}>
            <p className={styles.introduce_title}>教学特点</p>
            <p className={styles.introduce_detail}>{teacherDetail.teach_feature}</p>
          </div>
          {/* <div className={styles.published_book}>
            <p className={styles.introduce_title}>出版书籍</p>
            <p className={styles.introduce_detail}>《武汉十年中考真题解析》<br/><span>华中科技大学出版社，ISBN:978-7-5680-5963-3</span></p>
          </div> */}
        </div>
      </div>

      {/* 底部区域 */}
      <div className={styles.footer}>
        <span className={styles.appoint} 
          onClick={(evt: React.MouseEvent)=>{
            evt.stopPropagation(); 
            if(window.isApp){
              JSSDK.openWebview({url:'/chat_detail?receiver='+teacherDetail.key,title:teacherDetail.name,type:1})
            }else{
              pageInit({url:`/test-chat.html?receiverName=${teacherDetail.name}&receiver=${teacherDetail.key}`});
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
