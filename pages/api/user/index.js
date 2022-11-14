import { JWT } from "../../../lib/util/JWT";
import nc from 'next-connect'
import { query } from "../../../lib/util/dbconfig";

const handle=nc()
.get(async(req,res)=>{
    // console.log("getuser",req.headers.authorization)
    const token=req.headers.authorization
    const decode =JWT.verify(token)
    // console.log("decode:",decode)
    const id=decode.value
    if(!decode){
        res.status(400).send({ code:1,data: 'error' })
    }else{
        var sql="select * from user where id=?"
        var db=query()
       var user= await db.query(sql,id)
      //  console.log("user",user[0][0])
       res.send({code:1,data:user[0][0]})
    }
})
export default handle

export const config = {
    api: {
      externalResolver: true,
    },
  }