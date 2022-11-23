import { makeObservable, observable, action, computed, runInAction, toJS } from "mobx";

export default class TailorStore {
    constructor() {
        makeObservable(this);
    }
    @observable isShowChoseList: boolean = false;
    @observable imgData = null; //裁剪前图片文件
    @observable cropperBoxWidth = 0;
    @observable cropperBoxHeight = 0;
    @observable cropperBoxX = 0;
    @observable cropperBoxY = 0;


    @action init() {

    }

    @action onchangeIsShowChoseList(v) {
        this.isShowChoseList = v
    }
    @action setImgData(v) {
        this.imgData = v;
    }
    @action setCropperBox = (w: number, h: number, x: number, y: number) => {
        this.cropperBoxWidth = w;
        this.cropperBoxHeight = h;
        this.cropperBoxX = x;
        this.cropperBoxY = y;
    }
}