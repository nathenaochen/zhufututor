import React, {useState} from 'react';
import styles from './arrow.less';
import cns from 'classnames';

interface ArrowProps {
  className?: string;
}

function Arrow(props: ArrowProps){
  const {className} = props;
  return (
    <span className={cns(styles.arrow,className)}>
      
    </span>
  )
}

export default Arrow;