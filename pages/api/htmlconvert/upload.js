import nc from "next-connect";

const phantom = require("phantom");
const URL=require('url').URL
const stringIsAValidUrl=(htmlUrl)=>{
    try {
        new URL(htmlUrl)
        return true
    } catch (error) {
        return false
    }
}
const handler = nc().post(async (req, res) => {
  console.log(req.body)
  const result=stringIsAValidUrl(req.body.htmlUrl)
  console.log(result)
  if(validUrl.isUri(req.body.htmlUrl)){
    console.log("1111")
  }else{
    ("2222")
  }
  phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
          page.open(req.body.htmlUrl).then(function(status) {
            console.log(`Page opened with status [${status}].`);
              page.property('viewportSize', { width: req.body.width, height: 1080 });
              page.render('./baidu.jpg').then(function() {
                  
                  ph.exit();
              });
          });
      });
  }).catch(e=>{
    console.log(e)
  })
  
})

export default handler;
export const config = {
  api: {
    externalResolver: true,
  },
};
