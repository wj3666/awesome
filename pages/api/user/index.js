import { JWT } from "../../../lib/util/JWT";
import nc from 'next-connect'
import SQL from '../../../lib/util/SQL'

const handle=nc()
.get(async(req,res)=>{
    const token=req.headers.authorization
    const decode =JWT.verify(token)
    var email=''
    if(decode.email==undefined){
       email=decode.value
    }else{
       email=decode.email
    }
    if(!decode){
        res.status(400).send({ code:1,data: 'error' })
    }else{
        var user= await SQL.getUserEamil(email)
        var startTime=user.pay_time
        var endTime=user.end_time
        if(endTime-startTime<0){
          db.query(SQL.authorEmail,[0,email])
          var user= await SQL.getUserEamil(email)
          // console.log("user1",user)
          res.send({code:1,data:user})
        }else{
          // console.log("user2",user)
          res.send({code:1,data:user})
        }
      
    }
})
export default handle

export const config = {
    api: {
      externalResolver: true,
    },
  }