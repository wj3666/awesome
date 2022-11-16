
import axios from 'axios';
import nc from 'next-connect'
import { query } from '../../../lib/util/dbconfig';
import SQL from '../../../lib/util/SQL'
const AlipayFormData = require('alipay-sdk/lib/form').default
const AlipaySdk = require('alipay-sdk').default
const alipaySdk = new AlipaySdk({
    //APPid
    appId: '2021000121687405',
    //签名算法
    signType: 'RSA2',
    debug: false,
    //支付宝网关
    gateway: 'https://openapi.alipaydev.com/gateway.do',
    //支付宝公钥
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmHIPnESSjaYjZGdJVHu0VVWO1KioMN20FiQzriISnCP96MxLVBHW0H5YqX0lf+ZoPsnZrrBIuwpiub5LnGcNUzhne6mKxujABW04MR218I6QccdkgOR91G6Ric2tM40Qhxg1iWQZ+ugsRCyws6ua7ZcKDr1rvaWg0Pe01rZfaV9HKAi7fkScWst5qJPaSJK0ZOkyOUG8olKw3V3Jwrdu9swOZf1DmHzlt3q5iAg2uDu3X//SdUyypupE4qupUzd2p/9N5UY5cUIzmBRhcMk8VuQjjpdGksk+8Fs7j9y8s3VrfHgJORyhgyE8zOQUXfO9NiwMhJMrfvPc4p+b9KYMHwIDAQAB',
    //应用私钥
    privateKey: 'MIIEpAIBAAKCAQEAnwaL5wP6WxsMtsuT8Io5MYlnvdV2sG7RNrJZOkgUC+fu7D8thSECPJG5sqh7G65PtCGjQky/FhEpRnHiJpEZcfpJY8Gjat5A/5DLDg+rgnAyT1eCaCU9YFXer272b5a+4yHopL8tdMQrHMzFAWO4Z0DupUzhizPnFpBIFkut53pajMtMQntpFUMtPoLL0cCfqC1DkxI6ezZBwYn7Bo8bmbUuSM7msc5t3vm45QGCgYQ2EPwromqowsQdUzhyF3qpuc4xlwxJbviqpjKGIYi6osM8Q0759qPU58REYtr5+qcYR07aGw7t4bnxOQz2SEK9Hz9os5EKnDMd/BcVxKhGMQIDAQABAoIBAGiM9kfQnrVtKEO5vi7DwWxnCRSOljTS9qt+QBmIL93QA43Az52aIQ1PRYZHLID7bh1gjCRXrr3EVJ2i2+s9NDxyL/Ps6BKnwpYDTOyWsszUFM+DGhJ8gUiny/sM+epNcnyD258Mrcb5/do2akNKm38O+pck35gUbJayDyLRaKkpAgtuhhbgChG2X4k1u3Pch92xUdfVMaisQNxdQJkEoixpleIIw/wN5tod8vYFL2Dqhdf/9ntcofqOKUwpYOx0xcfO6708bGGB7LjQG0cn6JEAM6mFN4WF3HoqVKFoONMbLiDsWvWP/BD4T7IdaDey5V78BX00RvrIpJCPuuGij80CgYEA+AKxqXYndH8K706TitbhD6/k3hqPIUuGqkcPBaInninmFGQdll+YoUoMn1JK0B4tPCKUQPUjXIqbUBXKzgm5iIuuuhL+WoRUJLVNDKvE01IFZKE8OIMn3XYzvyl4VrSxzWe/pqfIQXUeHvbvM3q6t0ZK3Y7Ypj7Xsb9LY/64i1sCgYEApCYBvgBzoTSqA3zRKxH8Vqm/VFi2kP8rHJTakyeFSo9ISZmBZU0wtrwfiuCHN1h5ME3yJF9eC6uPRmuSVzzLeOiOWWXJoedX5Q22qT1fqSmJA0ZbBYASapnZTHR64i9+Uzht0QrRyIcU5ICByh29j5ztIDIYjbkN1MO2eAgmxmMCgYEA0dDVpNwEvRXNlm8Pe2IWvUK9iPlHJY/TubKsDsQEaFZiA9Y/AbyWT71puE/SYwdklX9blSjOZbgNdU86Z9zqTY5+n4T6EnHpDbUkHhgjR/QYA+40GEs9KqqZVJws5o2v7mpbRQ6k6FvAw8l8zDyEQhEBvTbgKqT3rbR8f3g7gAkCgYBJnqYvYiJ6DZWmxMdHKuTitXUTTkprU5YxVm2FjDcSzppcMBXBqlIL0unOro7Wer63tG3CdGdIkqRKsBpNN/4F9z9IxwccrxZTq8fdtaH+y5sgteBC4kLgPqofySoH4cclaeyO0exupG7xYNVVIeuPypDrXKx4e6PBZhmjUfyaAwKBgQCa3kNyYi45SHDxYvfK00gQtRm5K8y2se4PVfVOD/kRdyky0VX4RoCIRJEWB24mwNSh0zUbXRC8phcVgNK8OHx1iEgiBTSDgtZK1zMDgIIhRYGzRiif/k0CxHmBwUsVWpp7OpTlcyOaF1q9JlExstvGHUJFWqTh11xmWohxXWwzQQ==',
});
const handle = nc()
    .post(async (req, res) => {
        let out_trade_no = req.body.data.data.out_trade_no && req.body.data.data.out_trade_no
        let trade_no = req.body.data.data.trade_no && req.body.data.data.trade_no
        let amount = req.body.data.data.total_amount && req.body.data.data.total_amount
        console.log(out_trade_no, trade_no, amount)
        var db = query()
        //支付宝配置
        const formData = new AlipayFormData
        formData.setMethod('get');
        const bizContent = {
            out_trade_no,
            trade_no
        }
        formData.addField('bizContent', JSON.stringify(bizContent));
        const result = await alipaySdk.exec(
            'alipay.trade.query',
            {},
            { formData: formData },
        )
        axios({
            method: 'GET',
            url: result
        }).then(data => {
            // console.log(data.data.alipay_trade_query_response)
            let r = data.data.alipay_trade_query_response
            if (r.code == '10000') {
                switch (r.trade_status) {
                    case 'WAIT_BUYER_PAY':
                        res.send({ code: 1, data: '交易创建，等待买家付款' });
                        break;
                    case 'TRADE_FINISHED':
                        res.send({ code: 1, data: '交易结束,不可退款' });
                        break;
                    case 'TRADE_SUCCESS':
                        if (amount == 30) {
                            let startTime = new Date()
                            let time = new Date()
                            let entTime = time.setFullYear(time.getFullYear() + 1)
                            startTime = startTime.getTime()
                            console.log(entTime)
                            console.log(startTime)
                            var author= db.query(SQL.authorById,out_trade_no)
                            author.then(res=>{
                                const data=res[0][0].author
                                console.log("result,", data)
                                if(data==0){
                                    console.log(data)
                                    db.query(SQL.updatePayStatusById, [startTime, entTime, 1, out_trade_no])
                                }
                            })
                            
                        }
                        if (amount == 3) {
                            let startTime = new Date()
                            let time = new Date()
                            let entTime = time.setDate(time.getDate() + 30)
                            startTime = startTime.getTime()
                            console.log(entTime)
                            console.log(startTime)
                            var author= db.query(SQL.authorById,out_trade_no)
                            author.then(res=>{
                                const data=res[0][0].author
                                console.log("result,",data)
                                if(data==0){
                                    console.log(data)
                                    db.query(SQL.updatePayStatusById, [startTime, entTime, 1, out_trade_no])
                                }
                            })
                        }
                        res.send({ code: 1, data: '支付成功' });
                        break;
                    case 'TRADE_CLOSED':
                        res.send({ code: 1, data: '未付款交易超时关闭，或支付完成后全额退款' });
                        break;
                }
            } else if (r.code == '40004') {
                res.send({ code: 1, data: '交易不存在' });
            }
        }).catch(err => {
            res.send({
                code: 500,
                msg: '查询失败',
                err: err
            })
        })

    })
export default handle

export const config = {
    api: {
        externalResolver: true,
    }
}       