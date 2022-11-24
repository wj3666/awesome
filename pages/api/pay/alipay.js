import nc from 'next-connect'
const AlipayFormData = require('alipay-sdk/lib/form').default
const AlipaySdk =require('alipay-sdk').default  
const alipaySdk = new AlipaySdk({
  //APPid
  appId:'2021000121687405',
  //签名算法
  signType:'RSA2',
  debug:false,
  //支付宝网关
  gateway:'https://openapi.alipaydev.com/gateway.do',
  //支付宝公钥
  alipayPublicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmHIPnESSjaYjZGdJVHu0VVWO1KioMN20FiQzriISnCP96MxLVBHW0H5YqX0lf+ZoPsnZrrBIuwpiub5LnGcNUzhne6mKxujABW04MR218I6QccdkgOR91G6Ric2tM40Qhxg1iWQZ+ugsRCyws6ua7ZcKDr1rvaWg0Pe01rZfaV9HKAi7fkScWst5qJPaSJK0ZOkyOUG8olKw3V3Jwrdu9swOZf1DmHzlt3q5iAg2uDu3X//SdUyypupE4qupUzd2p/9N5UY5cUIzmBRhcMk8VuQjjpdGksk+8Fs7j9y8s3VrfHgJORyhgyE8zOQUXfO9NiwMhJMrfvPc4p+b9KYMHwIDAQAB',
  //应用私钥
  privateKey:'MIIEpAIBAAKCAQEAnwaL5wP6WxsMtsuT8Io5MYlnvdV2sG7RNrJZOkgUC+fu7D8thSECPJG5sqh7G65PtCGjQky/FhEpRnHiJpEZcfpJY8Gjat5A/5DLDg+rgnAyT1eCaCU9YFXer272b5a+4yHopL8tdMQrHMzFAWO4Z0DupUzhizPnFpBIFkut53pajMtMQntpFUMtPoLL0cCfqC1DkxI6ezZBwYn7Bo8bmbUuSM7msc5t3vm45QGCgYQ2EPwromqowsQdUzhyF3qpuc4xlwxJbviqpjKGIYi6osM8Q0759qPU58REYtr5+qcYR07aGw7t4bnxOQz2SEK9Hz9os5EKnDMd/BcVxKhGMQIDAQABAoIBAGiM9kfQnrVtKEO5vi7DwWxnCRSOljTS9qt+QBmIL93QA43Az52aIQ1PRYZHLID7bh1gjCRXrr3EVJ2i2+s9NDxyL/Ps6BKnwpYDTOyWsszUFM+DGhJ8gUiny/sM+epNcnyD258Mrcb5/do2akNKm38O+pck35gUbJayDyLRaKkpAgtuhhbgChG2X4k1u3Pch92xUdfVMaisQNxdQJkEoixpleIIw/wN5tod8vYFL2Dqhdf/9ntcofqOKUwpYOx0xcfO6708bGGB7LjQG0cn6JEAM6mFN4WF3HoqVKFoONMbLiDsWvWP/BD4T7IdaDey5V78BX00RvrIpJCPuuGij80CgYEA+AKxqXYndH8K706TitbhD6/k3hqPIUuGqkcPBaInninmFGQdll+YoUoMn1JK0B4tPCKUQPUjXIqbUBXKzgm5iIuuuhL+WoRUJLVNDKvE01IFZKE8OIMn3XYzvyl4VrSxzWe/pqfIQXUeHvbvM3q6t0ZK3Y7Ypj7Xsb9LY/64i1sCgYEApCYBvgBzoTSqA3zRKxH8Vqm/VFi2kP8rHJTakyeFSo9ISZmBZU0wtrwfiuCHN1h5ME3yJF9eC6uPRmuSVzzLeOiOWWXJoedX5Q22qT1fqSmJA0ZbBYASapnZTHR64i9+Uzht0QrRyIcU5ICByh29j5ztIDIYjbkN1MO2eAgmxmMCgYEA0dDVpNwEvRXNlm8Pe2IWvUK9iPlHJY/TubKsDsQEaFZiA9Y/AbyWT71puE/SYwdklX9blSjOZbgNdU86Z9zqTY5+n4T6EnHpDbUkHhgjR/QYA+40GEs9KqqZVJws5o2v7mpbRQ6k6FvAw8l8zDyEQhEBvTbgKqT3rbR8f3g7gAkCgYBJnqYvYiJ6DZWmxMdHKuTitXUTTkprU5YxVm2FjDcSzppcMBXBqlIL0unOro7Wer63tG3CdGdIkqRKsBpNN/4F9z9IxwccrxZTq8fdtaH+y5sgteBC4kLgPqofySoH4cclaeyO0exupG7xYNVVIeuPypDrXKx4e6PBZhmjUfyaAwKBgQCa3kNyYi45SHDxYvfK00gQtRm5K8y2se4PVfVOD/kRdyky0VX4RoCIRJEWB24mwNSh0zUbXRC8phcVgNK8OHx1iEgiBTSDgtZK1zMDgIIhRYGzRiif/k0CxHmBwUsVWpp7OpTlcyOaF1q9JlExstvGHUJFWqTh11xmWohxXWwzQQ==',
}); 
const handle = nc()
    .post(async (req, res) => {
        let userId = req.body.id
        let price = req.body.money  
        console.log(userId,price)
        console.log("token",req.headers.authorization)
        // 开始对接
        const formData = new AlipayFormData
        // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
        formData.setMethod('get');
        //支付时的信息
        const bizContent={
            outTradeNo:userId,
            productCode:'FAST_INSTANT_TRADE_PAY',
            totalAmount:price,
            subject:'订阅',
            body: '商品详情'
        }
        formData.addField('bizContent',JSON.stringify(bizContent));
        //支付成功或者失败要跳转的链接
        formData.addField('returnUrl', 'http://localhost:3000/paystatus');
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
        // console.log("返回结果",result)
        //对接支付宝成功返回的数据,
       
        //写到这里以上时可以自己测试一下，测试的时候一定要无痕浏览
    }) 
export default handle

export const config = {
    api: {
        externalResolver: true,
    }
}       