import axios from "axios";
export class NBString {
  static truncateString(str: string, beforeLimit: number, afterLimit: number) {
    if (str?.length < (beforeLimit * 2)) {
      return str
    }
    if (str?.length > beforeLimit) {
      return str.substring(0, beforeLimit) + "..." + str.substring(str.length - afterLimit, str.length);
    } else {
      return str;
    }
  }
  static getImgSize(imgSize: number) {
    if (imgSize / 1024 < 1024) {
      return Math.ceil(Number((imgSize / 1024))); //Kb
    } else {
      return Number((imgSize / 1024 / 1024).toFixed(2)); //Mb
    }
  }
  static getImgSizeMb(imgSize: number) {
    return Number((imgSize / 1024 / 1024).toFixed(2)); //Mb
  }
  static getImgSizeUnit(imgSize: number) {
    if (imgSize / 1024 < 1024) {
      return false
    } else {
      return true
    }

  }
  static textIsNull(val) { //判断输入框是否为空(包括空格 回车)
    if (val.replace(/\s/g, '').length > 0) {
      return true;
    } else {
      return false;
    }
  }
  // 拿到图片的宽度
  static getImgWidth = (item: any) => {
    return new Promise<number>(function (resolve, reject): any {
      var reader = new FileReader()
      reader.readAsDataURL(item)
      reader.onload = function (evt: any) {
        var replaceSrc = evt.target.result
        var imageObj = new Image()
        imageObj.src = replaceSrc
        imageObj.onload = function (): any {
          var width = imageObj.width
          resolve(width)
        }
      }
    })
  }
  // 拿到图片的高度
  static getImgHeight = (item: any) => {
    return new Promise<number>(function (resolve, reject): any {
      var reader = new FileReader()
      reader.readAsDataURL(item)
      reader.onload = async function (evt: any) {
        var replaceSrc = evt.target.result
        var imageObj = new Image()
        imageObj.src = replaceSrc

        imageObj.onload = function (): any {
          var height = imageObj.height
          resolve(height)
        }
      }
    })
  }
  //修改图片的宽高
  static setImgWidHeigth = (file: any, newWidth: number, newHeight: number, multiple: number) => {
    // console.log("原来文件：", file)
    return new Promise<any>(function (resolve, reject): any {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async function (evt: any) {
        var replaceSrc = evt.target.result
        var imageObj = new Image()
        imageObj.src = replaceSrc
        imageObj.onload = function (): any {
          var width = imageObj.width
          var height = imageObj.height
          var dataURL
          if (multiple != 0) {
            dataURL = NBString.AdjustImage(imageObj, width, height, file.type, multiple)
          } else {
            dataURL = NBString.AdjustImage(imageObj, newWidth, newHeight, file.type, multiple)
          }
          //为了兼容ios 需要dataURL -> blob->file
          // console.log("dataURL", dataURL)
          var blob = NBString.dataURLToBlob(dataURL)
          if(blob=='err'){
            resolve(blob)
          }
          let files = new window.File([blob], file.name, { type: file.type })
          // var newFile = NBString.blobToFile(blob,fileName)
          resolve(files)
        }
      }
    })
  }

  static AdjustImage = (img: any, width: number, height: number, type: string, multiple: number) => {
    var canvas, ctx, img64, ratio
    canvas = document.querySelector('#canvasImg')
    if (multiple != 0) {
      if (multiple == 1) {
        ratio = 3
      } else if (multiple == 2) {
        ratio = 2
      } else if (multiple == 3) {
        ratio = 4
      } else {
        ratio = 1
      }
      width = width / ratio
      height = height / ratio
      canvas.width = width
      canvas.height = height
    } else {
      canvas.width = width
      canvas.height = height
    }
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height)
    img64 = canvas.toDataURL(type, 1)
    return img64
  }
  // 将base64转化为blob
  static dataURLToBlob = (dataurl) => {
    try {
      var arr = dataurl.split(",")
      var mime = arr[0].match(/:(.*?);/)[1] && arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    } catch (error) {
      var err='err'
      return err
    }
  }
  //将blob转化为file
  static blobToFile = (theBlob: any, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  //图片比例
  static imageScale = (width: number, height: number, value: number, name: string) => {
    var scale = 1
    let num = 1
    if (name == 'W') {
      if (width >= height) {
        scale = width / height
        num = Math.round(value / scale)
      } else {
        scale = height / width
        num = Math.round(value * scale)
      }
      return num
    }
    else {
      if (height > width) {
        scale = height / width
        num = Math.round(value / scale)
      } else {
        scale = width / height
        num = Math.round(value * scale)
      }
      return num
    }
  }
  // 判断宽高是否为0
  static judgeZero = (width: number, heights: number) => {
    if (width == 0 || heights == 0 || width < 0 || heights < 0) {
      return true
    } else {
      return false
    }
  }
}

