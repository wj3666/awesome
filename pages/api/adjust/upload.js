import multer from "multer";
import nc from "next-connect";
import fs, {chownSync} from 'fs'

const handler = nc().post(async (req, res) => {
  await new Promise((resolve) => {
    const upload = multer({ dest: "public/adjustImg/" });
    const mw = upload.single("file");
    mw(req, res, resolve);
  });
  // console.log("apifile",req.file)
  let filePath = req.file.destination + req.file.filename;
  let fileName = req.file.destination + req.file.originalname;
  // 文件重命名
  fs.rename(filePath, fileName, (err) => {
      if (err) {
          res.json({ code: '-2', msg: '文件写入失败' });
      } else {
          res.json({ code: '1', msg: 'success', data: `http://localhost:3000/adjustImg/${req.file.originalname}` });
      }
  })
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default handler;
