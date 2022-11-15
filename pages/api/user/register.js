import {query} from '../../../lib/util/dbconfig'
import createRouter from 'next-connect'


const router = createRouter()
// .use(async(req,res,next)=>{
//     console.log(req.headers)
// })
.post(async (req, res) => {
    let userName=req.body.username;
    let password=req.body.password;
    var db=query()
    let author=0;
    let sql="select * from user where email=?"
    var user=await db.query(sql,userName)
    console.log(user[0])
    if(user[0].length==0){
      let sql2="insert into user (email,password,author) values (?,?,?)"
      await db.query(sql2,[userName,password,author])
      res.send({code:1,data:"success"})
    }else{
      res.send({code:1,data:"error"})
    }

   
  });
// const handle=nc()
// handle.post(async (req,res)=>{
//     let userName=req.body.username;
//     let password=req.body.password;
//     let author=0;
//     let sql="insert into user (email,password,author) values (?,?,?)"
//     var db=query()
//     await db.query(sql,[userName,password,author])
//     res.send({code:1,data:"success"})
// })
// export default handle
// export  default async (req,res)=>{
//     if(req.method==='POST'){
//     let userName=req.body.username;
//     let password=req.body.password;
//     let author=0;
//     let sql="insert into user (email,password,author) values (?,?,?)"
//     var db=query()
//     await db.query(sql,[userName,password,author])
//     res.send({code:1,data:"success"})
//     }
// }
// export const config={
//     api:{
//         externalResolver: true,
//     }
// }
export async function getServerSideProps({ req, res }) {
  return router.run(req, res);
}
export default router
export const config = {
    api: {
      externalResolver: true,
    },
  }