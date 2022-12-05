import { Upload } from "../../../lib/util/APITools";
import nc from "next-connect";
import fs from "fs";

const sharp = require("sharp");
var path = require('path');

const handler = nc()
.post(Upload.single('file'),(req, res) => {
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
        .jpeg({
          quality: 100,
          chromaSubsampling: "4:4:4",
        })
        .toFile("public/jpgConvert/" + newFileName + ".jpg")
        .then((info) => {
          let newJpegName = newFileName + ".jpg";
          console.log(newJpegName)
          res.json({
            code: "1",
            msg: "success",
            data: `http://localhost:3000/jpgCovert/${newJpegName}`,
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
