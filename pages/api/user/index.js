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
        var startTime=user[0][0].pay_time
        var endTime=user[0][0].end_time
        if(endTime-startTime<0){
          let sql2="update user set author=? where id=?"
          db.query(sql2,[0,id])
          let sql="select * from user where id=?"
          user= await db.query(sql,id)
          console.log("user",user[0][0])
          res.send({code:1,data:user[0][0]})
        }else{
          console.log("user",user[0][0])
          res.send({code:1,data:user[0][0]})
        }
      
    }
})
export default handle

export const config = {
    api: {
      externalResolver: true,
    },
  }