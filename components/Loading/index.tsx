import React, {useState} from 'react';
import styles from './loading.less';
import cns from 'classnames';

interface LoaddingProps {
  className?: string;
}

function Loadding(props: LoaddingProps){
  const {className} = props;
  return (
    <div className={cns(styles.box,className)}>
      <p className={styles['loaddingpic']}></p>
      <span>数据加载中...</span>
    </div>
  )
}

export default Loadding;