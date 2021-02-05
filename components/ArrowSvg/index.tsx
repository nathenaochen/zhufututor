import React, { FunctionComponent } from 'react';

function ArrowSvg(props){
  const {fill,className} = props;
  return (
    <div  className={className}>
      <svg fill={fill} viewBox="0 0 1024 1024" version="1.1" p-id="2610" ><path d="M527.929 750.768l438.278-431.027c6.798-6.686 6.891-17.619 0.203-24.42-6.686-6.801-17.62-6.891-24.42-0.203l-426.066 419.018-424.478-424.477c-6.743-6.743-17.678-6.743-24.421 0-3.372 3.372-5.058 7.792-5.058 12.211s1.687 8.84 5.058 12.211l436.584 436.584c6.705 6.705 17.56 6.75 24.32 0.102z" p-id="2611"></path>
      </svg>
    </div>
   
  )
 }

 export default ArrowSvg;