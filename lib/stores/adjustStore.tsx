import { makeAutoObservable, observable, action, computed, runInAction, toJS } from "mobx";
import { AdjustApi } from "../api/adjust";
import { HomeApi } from "../api/home";
import { NBString } from "../util/tools";
import { ProcessData } from "../api/compress";
export default class AdjustStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }
    dimensionsWidth = []
    dimensionsHeight = []
    initialWidth = []
    initialHeight = []
    adjustLock = true
    adjustButton = false
    isShowChoseList = false
    imgListData = [] //调整图片
    isStartAdjust: boolean = false; //是否开始调整
    imgListAdjustData=[] //调整后
    process:ProcessData[]=[] //调整进度
    imgURL=[]
    init = () => {
        this.dimensionsWidth = []
        this.dimensionsHeight = []
        this.initialWidth = []
        this.initialHeight = []
        this.adjustLock = true
        this.adjustButton = false
        this.isShowChoseList = false
        this.imgListData = [] //调整图片
        this.isStartAdjust = false; //是否开始调整
        this.imgListAdjustData=[]
        this.process=[]
        this.imgURL=[]
    }
    //设置调整图像进程
    setProcess(data:number,i:number){
        this.imgListAdjustData[i].process=data;
        this.process=this.process.concat([{process:data,idx:i}])
    }
     setImgListData(data) {
        this.imgListData = this.imgListData.concat(data);
        this.imgListAdjustData=this.imgListAdjustData.concat(data);
    }
    //添加调整过后新的图像文件
    setImgListAdjustData=(data,id)=>{
        this.imgListAdjustData[id]=data
    }
    onChangeStartAdjust = (v: boolean) => {
        this.isStartAdjust = v
    }
    
    setDimensionsWidth(width: number) {
        this.dimensionsWidth = this.dimensionsWidth.concat(width)
        this.initialWidth = this.initialWidth.concat(width)
    }
    setDimensionsHeight(height) {
        this.dimensionsHeight = this.dimensionsHeight.concat(height)
        this.initialHeight = this.initialHeight.concat(height)
    }
    setAdjustLock(v: boolean) {
        this.adjustLock = v
    }
        adjustWidth(id, value) {
        var width = 0
        if (value == '' || isNaN(value)) {
            this.dimensionsHeight[id]=0
        } else {
            width = parseInt(value)
            if (this.adjustLock) {
                let height = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], width, 'W')
                this.dimensionsHeight[id] = height
            }
        }
        this.dimensionsWidth[id] = width
        this.reactButton(id)
    }
    adjustHeight(id, value) {
        var height = 0
        if (value == '' || isNaN(value)) {
            this.dimensionsWidth[id]=0
        } else {
            height = parseInt(value)
            if (this.adjustLock) {
                let width = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], height, 'H')
                this.dimensionsWidth[id] = width
            }
        }
        this.dimensionsHeight[id] = height
        this.reactButton(id)
    }
    //加宽度
    addWidth(id) {
        this.dimensionsWidth[id]++
        if (this.adjustLock) {
            let scaleNum = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], this.dimensionsWidth[id], 'W')
            this.dimensionsHeight[id] = scaleNum
        }
        this.reactButton(id)
    }
    // 减宽度
    subtractWidth(id) {
        this.dimensionsWidth[id]--
        if (this.adjustLock) {
            let scaleNum = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], this.dimensionsWidth[id], 'W')
            this.dimensionsHeight[id] = scaleNum
        }
        this.reactButton(id)
    }
    //加高度
    addHeight(id) {
        this.dimensionsHeight[id]++
        if (this.adjustLock) {
            let scaleNum = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], this.dimensionsHeight[id], 'H')
            this.dimensionsWidth[id] = scaleNum
        }
        this.reactButton(id)
    }
    //减高度
    subtractHeight(id) {
        this.dimensionsHeight[id]--
        if (this.adjustLock) {
            let scaleNum = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], this.dimensionsHeight[id], 'H')
            this.dimensionsWidth[id] = scaleNum
        }
        this.reactButton(id)
    }
    //宽高是否为0
    reactButton(id) {
        this.adjustButton = NBString.judgeZero(this.dimensionsWidth[id], this.dimensionsHeight[id])
    }
    // 上传文件
    adjustUpload = (file: any,i:number) => {
        AdjustApi.updateSize(file,i).then(
            data => {
                // console.log("返回的路径",data)
                this.imgListAdjustData[i].imgURL=data;
                console.log(this.imgListAdjustData[i].imgURL)
                runInAction(()=>{
                    this.imgURL=this.imgURL.concat(data)
                    this.isStartAdjust=false
                })
            })
    }
    changeIsShowChoseList = (v: boolean) => {
        this.isShowChoseList = v

    }
}