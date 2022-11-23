import multer from "multer";
import nc from "next-connect";


const handler = nc().post(async (req, res) => {
  console.log("email:", req.body);
  await new Promise((resolve) => {
    const upload = multer({ dest: "public/adjustImg/" });
    const mw = upload.single("file");
    mw(req, res, resolve);
  });
  res.send(JSON.stringify({code:1,data:req.file}))
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default handler;
