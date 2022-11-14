import apiClient  from "./apiClient";

export const PaymentApi={
    // 支付宝支付接口
    alipay:async(id:number,money:number)=>{
        const res=await apiClient.post('/pay/alipay',{
            id:id,
            money:money,
            Headers:{
                token:true,
                'content-type':'application/x-www-form-urlencoded'
            }
        }).then(res=>{
           if(res.data.success){
            window.location.href=res.data.parmentUrl;   
           }
        })
    }
}