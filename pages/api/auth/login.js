
import { JWT } from "../../../lib/util/JWT";
import nc from "next-connect";
import SQL from "../../../lib/util/SQL";

const handle = nc().post(async (req, res) => {
  console.log("email:", req.boy);
  let email = req.body.data.user.email;
  let name = req.body.data.user.name;
  let image=req.body.data.user.image

  var isExist = await SQL.getUserEamil(email);
  if (isExist.length != 0) {
    const payload={
      id:isExist[0].id,
      email:isExist[0].email,
      name:isExist[0].name,
      header_img:isExist[0].header_img,
      privilege:isExist[0].author
  }
    const token = JWT.generate(payload , "10s");
    res.header("Authorization", token);
    res.send({ code: 1, data: "success" });
  } else {
    await SQL.insertUserSql(email, name,image);
    var newUser = await SQL.getUserEamil(email);
    const payload={
      id:newUser[0].id,
      email:newUser[0].email,
      name:newUser[0].name,
      header_img:newUser[0].header_img,
      privilege:newUser[0].author
  }
    const token = JWT.generate( payload , "12h");
    res.header("Authorization", token);
    res.send({ code: 1, data: "success" });
  }
});
export default handle;
export const config = {
  api: {
    externalResolver: true,
  },
};
