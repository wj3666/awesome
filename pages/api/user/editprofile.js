import {query} from '../../../lib/util/dbconfig'
import SQL from '../../../lib/util/SQL'
export default async (req,res)=>{
    if(req.method==='POST'){
        const {id,avatarImg}=req.body
        const avatar =avatarImg?`/uploads/${avatarImg.filename}`:``
        var user=await SQL.updateHeader(avatar,id)
        var users=await SQL.getUserId(id)
        console.log(users[0])
        if(user.length==0){
            res.send({code:1,data:"error"});
        }else{
            console.log(users)
            res.send({code:1,data:users})
        }
    }
}
export const config = {
    api: {
        externalResolver: true,
    }
}