import React from 'react';
import ReactDom from 'react-dom';
import cns from 'classnames';
import Hoc from 'components/Hoc';

function TeacherDetail(){


  return (
    <div>
      teacher-detial
    </div>
  )
}

const HocTeacherDetail = Hoc(TeacherDetail);

ReactDom.render(
  <HocTeacherDetail />,
  document.getElementById('root')
);
