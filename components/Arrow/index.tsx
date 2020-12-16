import React, {useState} from 'react';
import styles from './arrow.less';
import cns from 'classnames';

interface ArrowProps {
  className?: string;
  onAction?: Function;
}

function Arrow(props: ArrowProps){
  const {className,onAction} = props;
  return (
    <span className={cns(styles.arrow,className)} onClick={(e)=>{e.stopPropagation(); onAction && onAction(); }}>
      
    </span>
  )
}

export default Arrow;