import React,{useState, useEffect} from 'react';
import '../../pageconfig/init.css';
import Vconsole from 'vconsole';
import {checkIsApp} from 'utils/tool';

interface globalData {
  a:number,
  b:string
}

function Hoc(WrapComponent: React.ComponentType<globalData>){
  return () => {


    async function init(){
      let isApp = await checkIsApp();
      console.log('isapp',isApp);
      window.isApp = isApp;
    }

    useEffect(()=>{
      init();
    },[]);

    new Vconsole();
    return (
      <WrapComponent a={1} b={'23'}/>
    )
  }
}

export default Hoc;