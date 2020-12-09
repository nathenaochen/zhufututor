import React, {useState} from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import styles from './setting.less';

function Setting(){

  const [state, setState] = useState(0)


  return (
    <div className={styles['container']}>
      <div  onClick={(e:React.MouseEvent) => {e.stopPropagation(); JSSDK.writeData({token:'',role:''});}}>退出登录</div>
      {/* <div className="App">
      <div id="container1" onClickCapture={() => console.log('捕获经过 div')} onClick={() => console.log('冒泡经过 div')} className="container">
        <p style={{ width: 128, textAlign: 'center' }}>
          {state}
        </p>
        <button style={{ width: 128 }} onClick={(e:React.MouseEvent) => { e.stopPropagation();console.log('mubiao',e._dispatchListeners,e._dispatchInstances, e,e.nativeEvent,e.target,e.currentTarget,e.nativeEvent.target,e.nativeEvent.currentTarget,this );setState(state + 1);}}>点击+1</button>
      </div>
    </div> */}
    </div>
  )
}

const HocSetting = Hoc(Setting);

ReactDom.render(
  <HocSetting />,
  document.getElementById('root')
);
