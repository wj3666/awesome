import createRouter from 'next-connect'
import SQL from '../../../lib/util/SQL'

const router = createRouter()
// .use(async(req,res,next)=>{
//     console.log(req.headers)
// })
.post(async (req, res) => {
    let email=req.body.username;
    let password=req.body.password;
    var user=await SQL.getUserEamil(email)
    console.log("user:",user)
    if(user.length==0){
    await SQL.registerUser(email,password)
      res.send({code:1,data:"success"})
    }else{
      res.send({code:1,data:"error"})
    }
  });

export default router
export const config = {
    api: {
      externalResolver: true,
    },
  }