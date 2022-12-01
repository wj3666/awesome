import { chownSync } from "fs";
import { makeObservable, observable, action, computed, runInAction, toJS } from "mobx";
import { CompressApi, ImgUrlData, ProcessData } from "../api/compress";

export default class CompressStore {
    constructor() {
        makeObservable(this);
    }
    @observable imgListData = []; //压缩前图片文件
    @observable imgListCompressData = []; //压缩后
    @observable isShowChoseList: boolean = false;
    @observable imgUrl = [];
    @observable isStartCompress: boolean = false; //是否开始压缩
    @observable process:ProcessData[] = [];//压缩进度


    @action init(){
        this.imgListData = [];
        this.imgListCompressData = [];
        this.isShowChoseList = false;
        this.imgUrl = [];
        this.isStartCompress = false;
        this.process = [];
    }

    @action changeIsShowChoseList(v: boolean) {
        this.isShowChoseList = v;
    }

    @action setImgListData(data) {
        this.imgListData = this.imgListData.concat(data);
        this.imgListCompressData = this.imgListCompressData.concat(data);
    }

    @action setImgListCompressData(data, idx) {
        console.log("新文件1",this.imgListCompressData[idx],idx)
        this.imgListCompressData[idx] = data;
        console.log("新文件2",this.imgListCompressData[idx],idx)
    }

    @action onChangeStartCompress(v: boolean) {
        this.isStartCompress = v;
    }

    @action setProcess(data: number, i: number) {
        this.imgListCompressData[i].process = data;
        this.process = this.process.concat([{process:data,idx:i}]);
    }
    @action upload(file, i: number){
        CompressApi.upload(file, i).then(
            data => {
                this.imgListCompressData[i].imgUrl = data;
                runInAction(() => {
                    this.imgUrl = this.imgUrl.concat(data);
                    // console.log({idx:i,url:data})
                    this.isStartCompress = false;
                })
            }
        )
    }

}