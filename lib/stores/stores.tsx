import { createContext,useContext } from "react";
import appStore from "./appstore";
import homeStore from "./homeStore";
import loginSign from "./loginSignStore";
import paymentStore from "./paystore";
class RootStore{
    appStore = appStore
    loginSignStore=loginSign
    homeStore=homeStore
    paymentStore=paymentStore
}
const store =new RootStore
const Context=createContext(store)
export default function useStore(){
    return useContext(Context)
}