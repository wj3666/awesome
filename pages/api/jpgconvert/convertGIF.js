import nc from 'next-connect'
import {JpgconvertGIF} from '../../../lib/util/APITools';
import fs from 'fs'
const path =require('path')
const handler = nc().post(async (req,res)=>{
    const {moveUrl,seconds,playBack,width,height}=req.body
    try {
         JpgconvertGIF(moveUrl,width,height,seconds,playBack)
        res.send({code:"1",data:"http://localhost:3000/jpgConvert/Group1.gif"})
           
    } catch (error) {
        
    }
})

export const config = {
    api: {
      externalResolver: true,
    },
  };
export default handler
