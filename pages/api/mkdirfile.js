import  nc from 'next-connect'
import {MkdirFile,GetCurrentFilenames} from '../../lib/util/APITools'
const handler=nc().post(async (req,res)=>{
    const {filePath} = req.body
    GetCurrentFilenames(filePath)
})

export const config = {
    api: {
      externalResolver: true,
    },
  }
export default handler