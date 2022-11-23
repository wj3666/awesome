import stores from "../stores/stores";

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
  static getImgSizeMb(imgSize: number) {
    return (imgSize / 1024 / 1024).toFixed(2)
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
  static setImgWidHeigth = (file: any, newWidth: number, newHeight: number) => {
    console.log("文件名字:", file)
    return new Promise<any>(function (resolve, reject): any {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async function (evt: any) {
        var replaceSrc = evt.target.result
        var imageObj = new Image()
        imageObj.src = replaceSrc
        imageObj.onload = function (): any {
          var dataURL = NBString.AdjustImage(imageObj, newWidth, newHeight, file.type)
          //为了兼容ios 需要dataURL -> blob->file
          var blob=NBString.dataURLToBlob(dataURL)
          var fileName=file.name.split('.')[0]
          var newFile = NBString.blobToFile(blob,file.fileName)
          console.log(newFile)
          resolve(newFile)
        }
      }
    })
  }

  static AdjustImage = (img: any, width: number, height: number, type: string) => {
    var canvas, ctx, img64
    canvas = document.querySelector('#canvasImg')
    canvas.width = width
    canvas.height = height
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height)
    img64 = canvas.toDataURL(type, 1)
    return img64
  }
  // 将base64转化为blob
  static dataURLToBlob = (dataurl) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  //将blob转化为file
  static blobToFile = (theBlob: any, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  //图片比例
  static imageScale = (width: number, height: number, value, name) => {
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

