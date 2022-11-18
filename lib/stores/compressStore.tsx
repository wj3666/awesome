import { makeObservable, observable, action, computed, runInAction } from "mobx";

export default class CompressStore {
    constructor() {
        makeObservable(this);
    }
    @observable imgListData = [];
    @observable isShowChoseList:boolean = false;

    @action changeIsShowChoseList (v:boolean) {
        this.isShowChoseList = v;
    }

    @action setImgListData (data) {
        this.imgListData = this.imgListData.concat(data);
    }

}