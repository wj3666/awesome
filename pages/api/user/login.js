
import { query } from '../../../lib/util/dbconfig'
import { JWT } from '../../../lib/util/JWT'
import nc from 'next-connect'



 const handle=nc()
 .post ( async(req,res)=>{
   
    let userName=req.body.username;
    let password=req.body.password;
    let sql="select * from user where email=? and password=?"
    var db=query()
    var user = await db.query(sql,[userName,password])
    console.log(user[0])
    if(user[0].length==0){
        res.send({code:1,data:"error"});
    }else{
        //设置token值
        const value=user[0][0].id
        // console.log("value:",value)
        const token=JWT.generate({value},"12h")
        // console.log(token)
        // setTimeout(()=>{
        //     var decode=JWT.verify(token,'awesome-store')
        //     console.log(decode)
        // },11000)
        //token返回在network的header中
        res.header("Authorization",token)
        res.send({code:1,data:'success'})
        
    }
})
export default handle
// export  default async (req,res)=>{
//     if(req.method==='POST'){
//     let userName=req.body.username;
//     let password=req.body.password;
//     let sql="select * from user where email=? and password=?"
//     var db=query()
//     var user = await db.query(sql,[userName,password])
//     if(user[0].length==0){
//         res.send({code:1,data:"error"});
//     }else{
//         //设置token值
//         const token=JWT.generate({userName},"1h")
//         //token返回在network的header中
//         res.header("Authorization",token)
//         res.send({code:1,data:"success"})
//     }
//     }
// }
export const config={
    api:{
        externalResolver: true,
    }
}