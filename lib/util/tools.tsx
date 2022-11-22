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
}