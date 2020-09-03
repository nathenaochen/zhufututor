import React from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';

function Me(){


  return (
    <div>
      me
    </div>
  )
}

const HocMe = Hoc(Me);

ReactDom.render(
  <HocMe />,
  document.getElementById('root')
);
