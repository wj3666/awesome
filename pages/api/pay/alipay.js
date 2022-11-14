import nc from 'next-connect'
const AlipayFormData = require('alipay-sdk/lib/form').default
const AlipaySdk =require('alipay-sdk').default  
const alipaySdk = new AlipaySdk({
  //APPid
  appId: '2021000121609281',
  //签名算法
  signType:'RSA2',
  //支付宝网关
  geteway:'https://openapi.alipaydev.com/gateway.do',
  //支付宝公钥
  alipayPublicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz+TvJ953bT4T8MTqDYw0M8lK7bnJNuRdQXzWFcgILpLbVgv7e2BLiiqauVlvDmafirR741VuodnEwX1klR/SCSM7zz9mi+zY3saUXI0+8CcL6J4UCKqk8unQbpcLEoz+fWPYkXD9R0pdfzOE3FCN3MD+bEKKDT2GWhMgGzLeUdZZrd84Bnnmleo1zwVAjao7jLtoviHeM8bVMOk8Mf1Ncq3h3WoSBNNuU/6J/3g/JRslzAUH6BmsRDENEp+svuBStuSedSrlg9UP+Ei5+E1XJzQPZjYYNlTXlO1UscTsCKic1nJYlXcGdWttK3PIDB2B8ma0P0AQqLad/anabE3K9QIDAQAB',
  //应用公钥
  privateKey:'MIIEpAIBAAKCAQEAoBEKxFZR+d69xZy0wGDzykaTfLbmM+RMTHHDB9Cd9kjorkDEhu1YaC0h7rRHntO/L7o6aotnc6Vfp7LCVsGDm3Bo1X1slO9rY97FPpI6HvcvwiZlMeD88EvUXdFk13jTwzr0wQ+jMzdrqstLtThHL0XyOC1GGEHbHAA8vinGjb6QCwmvODuDMBAp/1TI/mSWWBjVwph61kwQH9Z6Jw+y1i8IXI3TSaaH6YcNhLnMyeo0mPqE/Ct/vqApZW8mfYbuxmnC/YrPkD0UXaVuREe028lTNGI0yTzCuZwpiZBXvQeD7a2PJl4qb6kUsPGwNyPJfLy8Kpico/9ycavKnZjH1wIDAQABAoIBAFuNg9gK+3Zs9aSK3kPO8II43fEOeBskMJPk2cWliEQvLY9FkmMObGuhrO/og7KPsKHu5ay9MZ3O8ChuMYQHyWvl3sCFrc5+JrGH4M/KOZ4uik2FQopGAsa6yKwksYYhIRZgqU+nzxPjVhzpjNMJboXWfxWsp5QGTvn0FMo8AMpfUWcfdJo+t/mUxHeau0/zAAA0tGZUdqLLrk/+CEJ2rL3EMXkimyNjfll30oyhna31CbTx5IjmjHDfUiuYKPiAc89Vcfqm/Ln7IBkuaKUx4JKl07g1cSFU7UagsB8Aw9j4hE0GkQ8PtyaJ9Jd9RQqdqCs8FDAEENh1FjWMAHXfjhECgYEA+M5pWAUAj3kCmBWq3qO3KdYLlCc7pMhgz1/tjsdweHt27f3D6aCvpAoSLY5vcs6W6uyqdmRayp6iBFIyomcDpbPJp3Kxujr3G4NBFuoiZZ+/7/xsi2Qv/LJw0RVHBeExezE+fVaclCBQxLe71kQBRZ3LpkiLqHfKpfqLBSSErG8CgYEApLHOXaYsdyGQ6aJC0cVDAG5u1KFDoQr1rIGRmNY8RMCl+6R+8A8nvFu1ng/mSPc+SGjnB/9LMoDGFr2l6sNv6IbqKBgZxNCQwqHlTUuN+LyR7ps7C8tTmppX1X0t1tsyzYV/xFImxSMr9F4i2u1YdkY21ovo4AI7tJseFJ6lnxkCgYEAltflrDSUK2fNN9FjH8oYAShBKthCY9wMPY3GI9ssiA8qgo1ompsOAaENdks1rGAtxU4o5tBe7xsP1RjUk/tqjaqbpoZ11Bdtu2NvMepPYldg8amTUUszgLvahBinT5xA+JRZc3nwQin5bdqK6hOexcsuLakr6r59wPVOFZcXTMcCgYEAk94Uc56UA63+ZtXJen/KpWOBXKUhjEDDzMtURs3qtKvnGuVZFv30ZjhM+wo5bz+VCvwsmdCL2l8l+xrxEbPBERu4tqDU2hGMN0OWFe0FHdNojruOqws2F/QFcmd+tY5+sWnwCfrcVlk6yJ+QWdGJgD+QUtaxEhbPNlujCU5bU1kCgYBq5+9HivKIO9klgWTSawQJNl82QSy/5hamzITVK8FUYO9AXsjui8hKpKdWPv8FD7EtrK8B/0u6VK/RhnEoNdcYsJihVHp1PZsaNuGJPPrv485ftPmC+XosBISQGKVKQ+EOmgvxGxn9yEjDtMv8rzJatqBIzA5OSt70P7XRVa28gA==',
}); 
const handle = nc()
    .post(async (req, res) => {
        let userId = req.body.id
        let price = req.body.money  
        // 开始对接
        const formData = new AlipayFormData
        // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
        formData.setMethod('get');
        const Content={
            outTradeNo: userId,//用户id
            productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
            totalAmount: price,//价格
        }
        //支付时的信息
        formData.addField('bizContent',JSON.stringify(Content));
        //支付成功或者失败要跳转的链接
        formData.addField('returnUrl', 'http://localhost:3000/payment/success');
        console.log("id", req.body.id)  
        //返回promise
        const result = alipaySdk.exec(
            'alipay.trade.page.pay',
            {},
            { formData: formData },
        )  
        result.then(resp=>{
            res.send({code:1,data:{
                success:true,
                msg:"支付中",
                parmentUrl:resp
            }})
        })
        console.log(result)
        //对接支付宝成功返回的数据,
       
        //写到这里以上时可以自己测试一下，测试的时候一定要无痕浏览
    })
export default handle

export const config = {
    api: {
        externalResolver: true,
    }
}       