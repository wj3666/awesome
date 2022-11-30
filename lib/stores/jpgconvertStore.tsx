import { makeAutoObservable, toJS, runInAction } from "mobx";
import { ConvertJpg, JpgConvert } from "../api/convertJpg";
export default class JpgconvertStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }
    imgListData = [] //初始传入的文件
    isShowChoseList = false //显示侧边栏
    imgListConvertData = [] //存放转换前和后的文件
    jpgUrl = [] //jpg文件存储路径
    process = [] //完成进程
    isStartConvert = false //是否开转换
    isShowGiFMode = false  //是否显示GIF模块
    GIFSeconds = '0.5' //gif每张间隔多少秒
    isPlayBack = false //是否循环
    addGIF = 0  //加数
    choiceMode = false   //gif静态还是动态
    moveUrl=[]   //得到动态图片存储的位置
    gifUrl=''   //得到合成的gif存储位置
    isFinish=false  //是否完成动态的gif转换
    //初始化
    init = () => {
        this.imgListData = [] //初始传入的文件
        this.isShowChoseList = false //显示侧边栏
        this.imgListConvertData = [] //存放转换前和后的文件
        this.jpgUrl = [] //jpg文件存储路径
        this.process = [] //完成进程
        this.isStartConvert = false //是否开转换
        this.isShowGiFMode = false  //是否显示GIF模块
        this.GIFSeconds = '0.5' //gif每张间隔多少秒
        this.isPlayBack = false //是否循环
        this.addGIF = 0  //加数
        this.choiceMode = false   //静态还是动态

    }
    //设置gif显示
    setIsShowGiFMode = (v: boolean) => {
        this.isShowGiFMode = v
    }
    //设置静态或者动态
    setChoiceMode = (v: boolean) => {
        this.choiceMode = v
    }
    //开始转换
    onChangeStartConvert(v: boolean) {
        this.isStartConvert = v;
    }
    //从gif返回png
    pngInit=()=>{
        this.process=[]
        for(let i=0;i<this.imgListConvertData.length;i++){
            this.imgListConvertData[i].imgUrl=undefined
        }
        this.jpgUrl=[]
        this.onChangeStartConvert(false)
        this.setIsShowGiFMode(false)
    }
    //输入文件
    setImgListData = (data) => {
        this.imgListData = this.imgListData.concat(data)
        this.imgListConvertData = this.imgListConvertData.concat(data)
    }
    //监听任务进程
    setProcess = (data: any, i: number) => {
        this.imgListConvertData[i].process = data
        this.process = this.process.concat({ process: data, idx: i })
    }
    //显示侧边栏
    changeIsShowChoseList = (v: boolean) => {
        this.isShowChoseList = v
    }
    changeIsPlayBack = (v: boolean) => {
        this.isPlayBack = v
    }
    //输入秒数
    inputGIFSeconds = (value: any) => {
        value = value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '')
        if (value != '') {
        }
        this.GIFSeconds = value

    }
    //增加秒数
    addGIFSeccons = () => {
        this.addGIF++
        this.GIFSeconds = this.addGIF.toString()
    }
    //减少秒数
    reduceGIFSeconds = () => {
        if (parseFloat(this.GIFSeconds) < 1) {
            this.GIFSeconds = '0'
            return
        } else {
            let value = parseFloat(this.GIFSeconds)
            value--
            this.GIFSeconds = value.toString()
        }
    }
    //存图像文件jpg转换为png
    uploadJPG = (data: any, id: number, GIFMode: boolean) => {
        JpgConvert.upload(data, id, GIFMode).then(res => {
            this.imgListConvertData[id].imgUrl = res
            console.log(this.imgListConvertData[id].imgUrl)
            runInAction(() => {
                this.jpgUrl = this.jpgUrl.concat(res)
                this.isStartConvert = false;
            })
        })
    }
    //存储准备转换成动态GIF的jpg
    uploadGIF = (data: any, id:number) => {
        JpgConvert.uploadGIF(data,id).then(res=>{
        this.imgListConvertData[id].imgUrl = res
         this.moveUrl=this.moveUrl.concat(res)
        })
    }
    //生成动态gif
    createMoveGIF=(moveUrl,seconds:string,playBack:boolean,width:number,height:number)=>{
        JpgConvert.convertGIF(moveUrl,seconds,playBack,width,height).then(res=>{
            runInAction(() => {
                this.jpgUrl = this.jpgUrl.concat(res)
                this.isStartConvert = false;
                this.isFinish=true;
            })
        })
    }
}