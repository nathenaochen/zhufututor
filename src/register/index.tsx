import React from 'react';
import ReactDom from 'react-dom';
import Hoc from 'components/Hoc';
import styles from './reg.less';

function Register(){


  return (
    <div>
      Register
    </div>
  )
}

const HocRegister = Hoc(Register);

ReactDom.render(
  <HocRegister />,
  document.getElementById('root')
);