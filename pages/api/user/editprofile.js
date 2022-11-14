import {query} from '../../../lib/util/dbconfig'

export default async (req,res)=>{
    if(req.method==='POST'){
        const {id,avatarImg}=req.body
        const avatar =avatarImg?`/uploads/${avatarImg.filename}`:``
        let sql="update user set header_img=? where id=?"
        let sql2="select * from user where id=?"
        var db=query()
        var user=await db.query(sql,[avatar,id])
        var users=await db.query(sql2,[id])
        console.log(users[0])
        if(user[0].length==0){
            res.send({code:1,data:"error"});
        }else{
            res.send({code:1,data:users[0]})
        }
    }
}
export const config = {
    api: {
        externalResolver: true,
    }
}