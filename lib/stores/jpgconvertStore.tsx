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
    isShowGiFMode=false  //是否显示GIF模块
    //初始化
    init = () => {
        this.imgListData = [] //初始传入的文件
        this.isShowChoseList = false //显示侧边栏
        this.imgListConvertData = [] //存放转换前和后的文件
        this.jpgUrl = [] //jpg文件存储路径
        this.process = [] //完成进程
        this.isStartConvert = false //是否开转换

    }
    //设置gif显示
    setIsShowGiFMode=(v:boolean)=>{
        this.isShowGiFMode=v
    }
    //开始转换
    onChangeStartConvert(v: boolean) {
        this.isStartConvert = v;
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
    //存图像文件+处理文件
    uploadJPG = (data: any, id: number) => {
        JpgConvert.upload(data, id).then(res => {
            this.imgListConvertData[id].imgUrl = res
            console.log(this.imgListConvertData[id].imgUrl)
            runInAction(() => {
                this.jpgUrl = this.jpgUrl.concat(res)
                this.isStartConvert = false;
            })
        })
    }


}