import multer from "multer";

const fs = require("fs");
const path = require("path");
const GIFEncoder = require("gif-encoder");
const getPixels = require("get-pixels");
const sharp = require("sharp");
//存储图片
export const Upload = multer({
  // 文件上传的位置
  // dest: path.join("public/jpgConvert/"),
  fileFilter(req, file, callback) {
    // 解决中文名乱码的问题 latin1 是一种编码格式
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },
  storage: multer.diskStorage({
    //上传文件的目录
    destination: path.join("public/jpgConvert/"), //上传的相对路径
    //上传文件的名称
    filename: function (req, file, cb) {
      cb(null, decodeURI(file.originalname));
    },
  }),
});

//转换成gif
export const JpgconvertGIF =  (urlArr, width, heigth, seconds, playback) => {
  const gif = new GIFEncoder(width, heigth);
  var file = fs.createWriteStream(`public/jpgConvert/Group1.gif`);
  gif.pipe(file);
//gif.setRepeat: 0 for repeat, -1 for no-repeat
  if(playback){
    gif.setRepeat(0);
  }else{
    gif.setRepeat(-1)
  }
  gif.writeHeader();
  var ms=parseFloat(seconds)*1000
  gif.setDelay(ms); // frame delay in ms
  gif.setQuality(10); // image quality. 10 is default.
  gif.on('readable', async (err) => {})
  gif.on('end', function () {
   
  });
  var addToGif = async function (images, counter = 0) {
    // http + gif-encoder
    try {
      // 读取图片像素信息
      const pixels = await getImgPixels(images[counter]);

      gif.addFrame(pixels.data);

      if (counter === images.length - 1) {
        gif.finish();
      } else {
        addToGif(images, ++counter);
      }
    } catch (err) {
      console.log("Bad image path", err);
    }
  };
  // http 请求图片资源，转为pixels（getPixels包实现）
  function getImgPixels(url) {
    const p = new Promise((resolve, reject) => {
      getPixels(url, function (err, pixels) {
        if (err) {
          console.log("Bad image path");
          reject(err);
          return;
        }
        resolve(pixels);
      });
    });
    return p;
  }
  addToGif(urlArr)
};
//列出当前文件夹下的所有文件
export const  GetCurrentFilenames=(filePath)=> {  
  console.log("\nCurrent filenames:");  
  fs.readdirSync(filePath).forEach(file => {  
    MkdirFile(filePath,file)
  });  
  console.log("\n");  
}
//用递归的方法删除目录
export const  MkdirFile=(filePath,file)=>{
  fs.unlink(filePath+'/'+file,function(error){
    if(error){
      console.log(error)
      return false
    }
  })
}