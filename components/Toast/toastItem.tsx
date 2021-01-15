import React from 'react';
import styles from './toastitem.less';

interface TaskItem{
  id: string;
  text: string;
  duration: number;
  onClose: (id:any)=>void
}

export default class ToastItem extends React.Component<TaskItem>{

  timerId;

  componentDidMount(){
    const {id,duration,onClose} = this.props;
    this.timerId = setTimeout(()=>{
      onClose && onClose(id)
    },duration)
  }

  componentWillUnmount(){
    clearTimeout(this.timerId);
  }
    

  render(){
    const {text} = this.props;
    return (
      <p className={styles['toast-item']}>{text}</p>
    )
  }
}