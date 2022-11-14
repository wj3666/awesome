import {query} from '../../../lib/util/dbconfig'
import nc from 'next-connect'
import {JWT} from '../../../lib/util/JWT'

import fs from 'fs'
const multer =require('multer')
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}
export default async function handler(req, res) {
    var author = req.headers.authorization
    if (req.method === 'POST') {
        await new Promise(resolve => {
            const upload = multer({ dest: 'public/uploads/' })
            const mw = upload.single('file')
            mw(req, res, resolve)
        })
        // console.log(req.file)
        res.send(JSON.stringify({code:1,data:req.file}))
        
        // let filePath = './' + req.file.path;
        // // 文件类型
        // let temp = req.file.originalname.split('.');
        // let fileType = temp[temp.length - 1];
        // let lastName = '.' + fileType;
        // // 构建图片名
        // let fileName = Date.now() + lastName;
        // // 图片重命名
        // fs.rename(filePath, fileName, (err) => {
        //     if (err) {
        //         res.json(JSON.stringify({ code: '-2', msg: '文件写入失败' }));
        //     } else {
        //         let localFile = './' + fileName;
        //         let key = 'image/' + fileName;
        //         res.json(JSON.stringify({code:1,msg:"上传成功",data:req.file}))
        //     }
        // });
    }
}

