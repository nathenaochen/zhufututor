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

    const [acd ,setAcd] = useState(1)


    async function init(){ 
      let globEvent = new myEventEmitter();
      window.globEvent = globEvent;
      let isApp = await checkIsApp();
      console.log('isapp--hoc',isApp);
      window.isApp = isApp;
      setTimeout(()=>{setAcd(2)},2000);
    }

    useEffect(()=>{
      init();
    },[]);

    new Vconsole();
    return (
      <WrapComponent a={acd} b={'23'}/>
    )
  }
}

export default Hoc;