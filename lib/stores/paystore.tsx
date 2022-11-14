import { makeAutoObservable } from "mobx";
import {PaymentApi} from '../api/payment' 

class PaymentStore{
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }
    //支付宝状态
    alipayMethod(id:number,money:number){
        PaymentApi.alipay(id,money).then(res=>{
           
        })
    }
}
const paymentStore= new PaymentStore
export default paymentStore