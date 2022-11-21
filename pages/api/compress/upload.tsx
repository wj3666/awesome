import multer from 'multer';
import fs from 'fs';
export default async (req, res) => {
    if (req.method === 'POST') {
        await new Promise(resolve => {
            const upload = multer({ dest: 'public/compressImg/' })
            const mw = upload.single('file')
            mw(req, res, resolve)
        })
        // console.log(req.file)
        let filePath = req.file.destination + req.file.filename;
        let fileName = req.file.destination + req.file.originalname;
        // 文件重命名
        fs.rename(filePath, fileName, (err) => {
            // console.log(filePath);
            // console.log(fileName);
            if (err) {
                res.json({ code: '-2', msg: '文件写入失败' });
            } else {
                res.json({ code: '1', msg: 'success', data: `http://localhost:3000/compressImg/${req.file.originalname}` });
            }
        })
    }
}


export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};