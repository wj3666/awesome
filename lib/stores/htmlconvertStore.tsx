import { makeAutoObservable } from "mobx";
import { HtmlConvertApi } from "../api/htmlConvert";
export default class HtmlconvertStore{
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }
    htmlData=''   //方法html链接
    isShowChoseList=false   //是否打开侧边栏
    isShield=false     //是否屏蔽广告
    isRemovePop=false   //是否移除弹窗
    browserWidth=0      //获得当前浏览器的宽度
    setHtmlData=(data)=>{
        this.htmlData=data
    }
    setIsShowChoseList=(v:boolean)=>{
        this.isShowChoseList=v
    }
    //设置屏蔽广告
    setIsShield=(v:boolean)=>{
        this.isShield=v
    }
    //设置移除弹窗
    setIsRemovePop=(v:boolean)=>{
        this.isRemovePop=v
    }
    //下载html图片
    upload=(htmlUrl:any,width:number)=>{
        console.log(width)
        HtmlConvertApi.upload(htmlUrl,width).then(res=>{
            console.log(res)
        })
    }
    setBrowserWidth=(width:number)=>{
        this.browserWidth=width
    }
}