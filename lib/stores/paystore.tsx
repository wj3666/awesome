import { makeAutoObservable } from "mobx";
import Router from "next/router";
import {PaymentApi} from '../api/payment' 
import appStore from '../stores/appstore'
class PaymentStore{
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }
    //支付宝提交支付
    alipayMethod(id:number,money:number){
        PaymentApi.alipay(id,money).then(res=>{
           
        })
    }
    //判断支付宝支付是否成功
    aliapyStats(data:any){
        PaymentApi.alipayJdude(data).then(res=>{
            if(res=='支付成功'){
                Router.push('/payment/success')
            }
        })
    }
}
const paymentStore= new PaymentStore
export default paymentStore