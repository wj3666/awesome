import { makeAutoObservable, observable, action, computed, runInAction, toJS } from "mobx";
import { AdjustApi } from "../api/adjust";
import { HomeApi } from "../api/home";
import { NBString } from "../util/tools";

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
    isShowChoseList=false
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
    addWidth(id) {
        this.dimensionsWidth[id]++
        if (this.adjustLock) {
            let scaleNum = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], this.dimensionsWidth, 'W')
            this.dimensionsHeight[id] = scaleNum
        }
        this.reactButton(id)
    }
    subtractWidth(id) {
        this.dimensionsWidth[id]--
        if (this.adjustLock) {
            let scaleNum = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], this.dimensionsWidth, 'W')
            this.dimensionsHeight[id] = scaleNum
        }
        this.reactButton(id)
    }
    addHeight(id) {
        this.dimensionsHeight[id]++
        if (this.adjustLock) {
            let scaleNum = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], this.dimensionsHeight, 'H')
            this.dimensionsWidth[id] = scaleNum
        }
        this.reactButton(id)
    }
    subtractHeight(id) {
        this.dimensionsHeight[id]--
        if (this.adjustLock) {
            let scaleNum = NBString.imageScale(this.initialWidth[id], this.initialHeight[id], this.dimensionsHeight, 'H')
            this.dimensionsWidth[id] = scaleNum
        }
        this.reactButton(id)
    }
    reactButton(id) {
        this.adjustButton = NBString.judgeZero(this.dimensionsWidth[id], this.dimensionsHeight[id])
    }
    // 上传文件
    setImageSize=(file:any)=>{
        AdjustApi.updateSize(file).then(
            res=>{
            console.log("返回结果",res)
        })
    }
    changeIsShowChoseList=(v:boolean)=>{
        this.isShowChoseList=v

    }
}