import React from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';
import styles from './setting.less';

function Setting(){


  return (
    <div>
      setting
    </div>
  )
}

const HocSetting = Hoc(Setting);

ReactDom.render(
  <HocSetting />,
  document.getElementById('root')
);
