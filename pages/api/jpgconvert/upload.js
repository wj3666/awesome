import multer from "multer";
import nc from "next-connect";
import fs from "fs";

const sharp = require("sharp");
var path = require('path');

const upload = multer({
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
    destination: path.join('public/jpgConvert/'),//上传的相对路径
    //上传文件的名称
    filename: function (req, file, cb) {
      cb(null, decodeURI(file.originalname))
    }
  })
})
const handler = nc()
.post(upload.single('file'),(req, res) => {
  console.log("file:",req.file);
  let filePath = req.file.destination + req.file.filename;
  let fileName = req.file.destination + req.file.originalname; //原来文件路径+文件名+后缀
  let newFileName = req.file.originalname.split(".")[0];
  // 文件重命名
  fs.rename(filePath, fileName, (err) => {
    if (err) {
      res.json({ code: "-2", msg: "文件写入失败" });
    } else {
      console.log("成功");
      console.log(req.file.destination + req.file.originalname);
      let path = req.file.destination + req.file.originalname;
      sharp(path)
        .png()
        .toFile("public/jpgConvert/" + newFileName + ".png")
        .then((info) => {
          let newJpegName = newFileName + ".png";
          console.log(newJpegName)
          res.json({
            code: "1",
            msg: "success",
            data: `http://localhost:3000/jpgConvert/${newJpegName}`,
          });
        })
        .catch((err) => {
          res.send({ code: -1, data: err });
        });
    }
  });
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default handler;
