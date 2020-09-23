export interface openViewParams{
  url: string;  //url为新打开页面的地址,必传参数
  type?: number; //type为打开webview的类型，1-表示打开fluter页面  2-表示打开webapp页面 默认为webapp页面 可选
  title?: string; //title为新打开页面的标题 可选
  fullScrenn?: boolean; //fullScrenn为是否以全面屏（即没有原生titlebar）的形式打开webview 默认为false  可选
  needclose?: number;   //表示在打开新的webview时，是否需要移除当前的webview。  1--表示不移除   2---表示移除  默认为1
  hasInput?: boolean;   //webview为了兼容h5的input标签  true为表示当前h5页面有input标签  false则没有  默认为false
}