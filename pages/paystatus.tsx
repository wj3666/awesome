import Router, { useRouter } from "next/router"
import { useEffect } from "react"
import stores from "../lib/stores/stores"
const Paystatus=(data:any)=>{
    const router=useRouter()
    const {paymentStore} = stores
    useEffect(()=>{
        if(JSON.stringify(data.data)!="{}"){
         paymentStore.aliapyStats(data)
        }else{
            router.push('/home')
        }
     })
    return(
        <>
        </>
    )
}
Paystatus.getInitialProps = async (ctx:any) => {
    console.log("111")
    const out_trade_no=ctx.req?.query.out_trade_no
    const trade_no =ctx.req?.query.trade_no
    const total_amount=ctx.req?.query.total_amount
    const data={
        out_trade_no:out_trade_no,
        trade_no:trade_no,
        total_amount:total_amount
    }
    return {data}
}
export default Paystatus