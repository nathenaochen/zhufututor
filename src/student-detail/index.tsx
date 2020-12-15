import React, {useEffect, useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import Loading from 'components/Loading';
import {  getUrlQuery,pageInit } from 'utils/tool';
import styles from './st.less';
import {getStudentDetail} from 'apiService/service';
import {getStudentLisRes,Result} from 'interface/response';

function TeacherDetail(){

  //获取教师详情信息
  const [studentDetail, setStudentDetail] = useState<getStudentLisRes|Result>();

  //初始化函数
  async function init(){
    //获取学生id
    const {key} = getUrlQuery();
    //那去学生详情
    const {code,result} = await getStudentDetail({key:key});
    if(+code == 0){
      setStudentDetail(result);
    }else{
      setStudentDetail([]);
    }
    console.log('学生详情信息',result);
    
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
            <p className={styles.baseInfo_detail}>{studentDetail.class ? studentDetail.class : '暂无完善'}</p>
          </div>
          <div>
            <p className={styles.baseInfo_title}>弱势科目</p>
            <p className={styles.baseInfo_detail}>{studentDetail.subject ? studentDetail.subject : '暂无完善'}</p>
          </div>
          <div>
            <p className={styles.baseInfo_title}> 家教要求</p>
            <p className={styles.baseInfo_detail}>{studentDetail.request ? studentDetail.request : '暂无完善'}</p>
          </div>
        </div>
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
      </div>
    </div>
  )
}

const HocTeacherDetail = Hoc(TeacherDetail);

ReactDom.render(
  <HocTeacherDetail />,
  document.getElementById('root')
);
