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
  static getImgSizeMb(imgSize: number){
    return (imgSize / 1024 / 1024).toFixed(2)
  }
}