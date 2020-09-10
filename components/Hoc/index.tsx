import React,{useState, useEffect} from 'react';
import '../../pageconfig/init.css';
import Vconsole from 'vconsole';

interface globalData {
  a:number,
  b:string
}

function Hoc(WrapComponent: React.ComponentType<globalData>){
  return () => {

    new Vconsole();
    return (
      <WrapComponent a={1} b={'23'}/>
    )
  }
}

export default Hoc;