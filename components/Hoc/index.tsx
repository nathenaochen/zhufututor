import React,{useState, useEffect, FunctionComponent} from 'react';
import '../../pageconfig/init.css';
import Vconsole from 'vconsole';
import {checkIsApp} from 'utils/tool';
import {myEventEmitter} from 'utils/eventEmitter'

interface globalData {
  a:number,
  b:string
}

function Hoc(WrapComponent:FunctionComponent<globalData>){
  return () => {


    async function init(){ 
      let globEvent = new myEventEmitter();
      window.globEvent = globEvent;console.log('isapp');
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