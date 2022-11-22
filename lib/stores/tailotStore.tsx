import { makeObservable, observable, action, computed, runInAction, toJS } from "mobx";

export default class TailorStore {
    constructor() {
        makeObservable(this);
    }
    @observable isShowChoseList: boolean = false;
    @observable imgData = null; //裁剪前图片文件

    @action init() {

    }

    @action onchangeIsShowChoseList(v) {
        this.isShowChoseList = v
    }
    @action setImgData(v) {
        this.imgData = v;
    }
}