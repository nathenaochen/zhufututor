export interface openViewParams{
  url: string;  //url为新打开页面的地址,必传参数
  type?: string; //type为打开webview的类型，1-表示打开fluter页面  默认为webapp页面 可选
  title?: string; //title为新打开页面的标题 可选
  fullScrenn?: boolean; //fullScrenn为是否以全面屏（即没有原生titlebar）的形式打开webview 默认为false  可选
}