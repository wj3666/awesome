import nc from "next-connect";
import { Upload,ReadDirRecur } from "../../../lib/util/APITools";
import fs from 'fs'
const handler = nc().post(Upload.single("file"), async (req, res) => {
  let filePath = req.file.destination + req.file.filename;
  let fileName = req.file.destination + req.file.originalname;
  // 文件重命名
  fs.rename(filePath, fileName, (err) => {
      if (err) {
          res.json({ code: '-2', msg: '文件写入失败' });
      } else {
          res.json({ code: '1', msg: 'success', data: `public/jpgConvert/${req.file.originalname}` });
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
