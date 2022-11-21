import { makeObservable, observable, action, computed, runInAction } from "mobx";
import { CompressApi } from "../api/compress";

export default class CompressStore {
    constructor() {
        makeObservable(this);
    }
    @observable imgListData = []; //压缩前图片文件
    @observable imgListCompressData = []; //压缩后
    @observable isShowChoseList: boolean = false;
    @observable imgUrl = '';
    @observable isStartCompress: boolean = false; //是否开始压缩
    @observable process = 0;//压缩进度

    @action changeIsShowChoseList(v: boolean) {
        this.isShowChoseList = v;
    }

    @action setImgListData(data) {
        this.imgListData = this.imgListData.concat(data);
    }

    @action setImgListCompressData(data) {
        this.imgListCompressData = this.imgListCompressData.concat(data);
    }

    @action onChangeStartCompress(v: boolean) {
        this.isStartCompress = v;
    }

    @action setProcess(n:number) {
        this.process = n;
    }

    @action upload(file) {
        CompressApi.upload(file).then(
            data => {
                this.imgUrl = data;
                this.onChangeStartCompress(false);
            }
        )
    }

}