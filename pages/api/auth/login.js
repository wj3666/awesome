
import { JWT } from "../../../lib/util/JWT";
import nc from "next-connect";
import SQL from "../../../lib/util/SQL";

const handle = nc().post(async (req, res) => {
  console.log("email:", req.body.data.user);
  let email = req.body.data.user.email;
  let name = req.body.data.user.name;
  let image=req.body.data.user.image

  var isExist = await SQL.getUserEamil(email);
  console.log("1111",isExist)
  if (isExist.length != 0) {
    console.log("!!!1")
    const token = JWT.generate({ email }, "12h");
    res.header("Authorization", token);
    res.send({ code: 1, data: "success" });
  } else {
    await SQL.insertUserSql(email, name,image);
    const token = JWT.generate({ email }, "12h");
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
