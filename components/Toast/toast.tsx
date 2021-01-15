import React, {Component} from 'react';
import ToastItem from './toastItem';
import styles from './toast.less';
import cns from 'classnames';

interface StateType{
  tasklist: Task[]
}
interface Task{
  id: string;
  text: string;
  duration: number
}

let toastCount = 0;
// 生成唯一的id
const getUuid = () => {
  return 'toast-container' + new Date().getTime() + '-' + toastCount++;
};

export default class ToastContainer extends Component<{},StateType>{

  constructor(props){
    super(props);
    this.state = {
      tasklist: []
    }
  }

  pushToast(toastInfo){
    const {text,duration} = toastInfo;
    let {tasklist} = this.state;
    tasklist.unshift({
      id: getUuid(),
      text: text,
      duration: duration
    });
    this.setState({
      tasklist:tasklist
    });
  }

  clearToast = (id) => {
    let {tasklist} = this.state;
    let newTasklist = tasklist.filter((item)=>{return item.id !== id});
    this.setState({tasklist:newTasklist});
  }

  render(){
    let {tasklist} = this.state;
    return (
      <div className={cns(styles['container'], tasklist.length == 0 ? styles['hidden'] : styles['show'])}>
        {
          tasklist.map((item)=>{
            return (
              <ToastItem onClose={this.clearToast} {...item} key={item.id}/>
            )
          })
        }
      </div>
    )
  }


}
