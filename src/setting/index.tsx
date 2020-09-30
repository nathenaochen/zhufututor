import React from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import styles from './setting.less';

function Setting(){


  return (
    <div className={styles['container']}>
      <div  onClick={(e:React.MouseEvent) => {e.stopPropagation(); JSSDK.writeData({token:'',role:''});}}>退出登录</div>
    </div>
  )
}

const HocSetting = Hoc(Setting);

ReactDom.render(
  <HocSetting />,
  document.getElementById('root')
);
