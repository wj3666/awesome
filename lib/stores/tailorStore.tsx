import { makeObservable, observable, action, computed, runInAction, toJS } from "mobx";

export default class TailorStore {
    constructor() {
        makeObservable(this);
    }
    @observable isShowChoseList: boolean = false;
    @observable imgData = null; //裁剪前图片文件
    @observable cropperImgData = null; //裁剪后
    @observable isCropper = false;
    @observable cropper: Cropper;
    @observable cropperBoxWidth = 0;
    @observable cropperBoxHeight = 0;
    @observable cropperBoxX = 0;
    @observable cropperBoxY = 0;


    @action initCropper(cropper) {
        this.cropper = cropper
    }

    @action onChangeIsCropper(v) {
        this.isCropper = v
    }

    @action onchangeIsShowChoseList(v) {
        this.isShowChoseList = v
    }
    @action setImgData(v) {
        this.imgData = v;
    }
    @action setCropperImgData(v) {
        if (/base64/.test(v)) {
            const data = v.split(',');
            const mime = data[0].match(/:(.*?);/)[1];
            const binary = atob(data[1].trim());
            let n = binary.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = binary.charCodeAt(n);
            }
            // 转换成file对象
            const file = new File([u8arr], this.imgData.name, { type: mime });
            console.log(file)
            this.cropperImgData = file
        }
    }
    @action setCropperBox = (w: number, h: number, x: number, y: number) => {
        this.cropperBoxWidth = Math.floor(w);
        this.cropperBoxHeight = Math.floor(h);
        this.cropperBoxX = Math.floor(x);
        this.cropperBoxY = Math.floor(y);
    }

    // 改变宽度
    @action setCropperBoxWidth = (w: number) => {
        this.cropperBoxWidth = w;
        this.cropper.setData(
            {
                width: w,
            }
        )
    }
    @action onChangeCropperBoxWidth = (v: boolean) => {
        if (v) {
            this.cropperBoxWidth = this.cropperBoxWidth + 1;
        } else {
            this.cropperBoxWidth = this.cropperBoxWidth - 1;
        }
        this.cropper.setData(
            {
                width: this.cropperBoxWidth,
            }
        )
    }
    // 改变高度
    @action setCropperBoxHeight = (h: number) => {
        this.cropperBoxHeight = h;
        this.cropper.setData(
            {
                height: h,
            }
        )
    }
    @action onChangeCropperBoxHeight = (v: boolean) => {
        if (v) {
            this.cropperBoxHeight = this.cropperBoxHeight + 1;
        } else {
            this.cropperBoxHeight = this.cropperBoxHeight - 1;
        }
    }
    // 改变位置X
    @action setCropperBoxX = (x: number) => {
        this.cropperBoxX = x;
        this.cropper.setData(
            {
                x: x,
            }
        )
    }
    @action onChangeCropperBoxX = (v: boolean) => {
        if (v) {
            this.cropperBoxX = this.cropperBoxX + 1;
        } else {
            this.cropperBoxX = this.cropperBoxX - 1;
        }
    }
    // 改变位置Y
    @action setCropperBoxY = (y: number) => {
        this.cropperBoxY = y;
        this.cropper.setData(
            {
                y: y,
            }
        )
    }
    @action onChangeCropperBoxY = (v: boolean) => {
        if (v) {
            this.cropperBoxY = this.cropperBoxY + 1;
        } else {
            this.cropperBoxY = this.cropperBoxY - 1;
        }
    }
}