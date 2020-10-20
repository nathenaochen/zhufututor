import React, {useState} from 'react';
import styles from './lb.less';
import cns from 'classnames';

interface LoaddingBarProps {
  className?: string;
  text?: string;
  isShowLoadingImg?: boolean;
}

function LoaddingBar(props: LoaddingBarProps){
  const {className, text='加载中',isShowLoadingImg=true} = props;
  return (
    <div className={cns(styles['loaddingbar'],className)}>
      <p className={styles['text']}>{text}</p>
      {isShowLoadingImg && <span className={styles['loading-img']}></span>}
    </div>
  )
}

export default LoaddingBar;