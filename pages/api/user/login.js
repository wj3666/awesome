
import { query } from '../../../lib/util/dbconfig'
import { JWT } from '../../../lib/util/JWT'
import nc from 'next-connect'
import SQL  from '../../../lib/util/SQL'


 const handle=nc()
 .post ( async(req,res)=>{
   
    let userName=req.body.username;
    let password=req.body.password;
    var user =await SQL.getUserEP(userName,password)
    console.log("111",user[0])
    if(user.length==0){
        res.send({code:1,data:"eamil error"});
    }else{
        //设置token值
        const payload={
            id:user[0].id,
            email:user[0].email,
            name:user[0].name,
            header_img:user[0].header_img,
            privilege:user[0].author
        }
        const value=user[0].email
        // console.log(value)
        // console.log("value:",value)
        const token=JWT.generate(payload,"12h")
        res.header("Authorization",token)
        res.send({code:1,data:'success'})
    }
})
export default handle
export const config={
    api:{
        externalResolver: true,
    }
}