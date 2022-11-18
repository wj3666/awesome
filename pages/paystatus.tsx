import { useEffect } from "react"
import stores from "../lib/stores/stores"
const Paystatus=(data:any)=>{
    const {paymentStore} = stores
    useEffect(()=>{
        if(data){
         paymentStore.aliapyStats(data)
        }
     })
    return(
        <>
        </>
    )
}
Paystatus.getInitialProps = async (ctx:any) => {
    const out_trade_no=ctx.req?.query.out_trade_no
    const trade_no =ctx.req?.query.trade_no
    const total_amount=ctx.req?.query.total_amount
    console.log("1111",ctx.req?.query)
    const data={
        out_trade_no:out_trade_no,
        trade_no:trade_no,
        total_amount:total_amount
    }
    return {data}
}
export default Paystatus