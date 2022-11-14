import {query} from '../../../lib/util/dbconfig'
import createRouter from 'next-connect'


const router = createRouter()
// .use(async(req,res,next)=>{
//     console.log(req.headers)
// })
.post(async (req, res) => {
    let userName=req.body.username;
    let password=req.body.password;
    let author=0;
    let sql="insert into user (email,password,author) values (?,?,?)"
    var db=query()
    await db.query(sql,[userName,password,author])
    res.send({code:1,data:"success"})
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