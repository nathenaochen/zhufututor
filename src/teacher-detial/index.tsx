import React from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import styles from './td.less';
import Arrow from 'components/Arrow';

function TeacherDetail(){


  return (
    <div className={styles.container}>
      {/* 顶部区域 */}
      <div className={styles.header}>
        <Arrow className={styles.arrow}/>
        <span>老师详情</span>
        <img src={require('./images/collect.png')} alt=""/>  
      </div>

      {/* 中间内容区域 */}
      <div className={styles.content}>
        {/* 头像区域 */}
        <div className={styles.topper}>
          <div className={styles.ava}>
            <img src={require('./images/header.jpg')} alt=""/> 
          </div>
          <div className={styles.info}>
            <p className={styles.name}><strong>Tony老师</strong></p>
            <p>峡谷大学</p>
            <p>教龄16年，峡谷大学骨干教师</p>
          </div>
        </div>

        {/* 基本信息区域 */}
        <div className={styles.baseInfo}>
          <h3>基本信息</h3>
          <div>
            <p className={styles.baseInfo_title}>教育背景</p>
            <p className={styles.baseInfo_detail}>华中科技大学本科</p>
          </div>
          <div>
            <p className={styles.baseInfo_title}>教授课程</p>
            <p className={styles.baseInfo_detail}>初二物理，中考物理</p>
          </div>
          <div>
            <p className={styles.baseInfo_title}>教师资质</p>
            <p className={styles.baseInfo_detail}>高级中学教师资格证 <span>(20194200241666666)</span></p>
          </div>
          <div>
            <p className={styles.baseInfo_title}>上课校区</p>
            <p className={styles.baseInfo_detail}>
              <img src={require('./images/location.png')} alt="" className={styles.location}/>武汉光谷·光谷软件园
            </p>
          </div>
        </div>

        {/* 老师简介区域 */}
        <div className={styles.introduce}>
          <h3>老师简介</h3>
          <div className={styles.self_introduce}>
            <p className={styles.introduce_title}>个人简介</p>
            <p className={styles.introduce_detail}>上课富有激情，与学生互动充分，逻辑清晰，课程受学生喜爱。</p>
          </div>
          <div className={styles.characteristic}>
            <p className={styles.introduce_title}>教学特点</p>
            <p className={styles.introduce_detail}>授课和长相都非常幽默思路清晰，家长都能听懂。</p>
          </div>
          <div className={styles.published_book}>
            <p className={styles.introduce_title}>出版书籍</p>
            <p className={styles.introduce_detail}>《武汉十年中考真题解析》<br/><span>华中科技大学出版社，ISBN:978-7-5680-5963-3</span></p>
          </div>
        </div>
      </div>

      {/* 底部区域 */}
      <div className={styles.footer}>
        <span className={styles.appoint}>指定教员</span>
        <span className={styles.order}>去发单</span>
      </div>
    </div>
  )
}

const HocTeacherDetail = Hoc(TeacherDetail);

ReactDom.render(
  <HocTeacherDetail />,
  document.getElementById('root')
);
