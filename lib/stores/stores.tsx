import { createContext,useContext } from "react";
import appStore from "./appstore";
import homeStore from "./homeStore";
import loginSign from "./loginSignStore";
import paymentStore from "./paystore";
import CompressStore from "./compressStore";

import TailorStore from "./tailorStore";
import AdjustStore from "./adjustStore";
const compressStore = new CompressStore();
const tailorStore = new TailorStore();
const adjustStore=new AdjustStore()
const stores = {
    appStore:appStore,
    loginSignStore:loginSign,
    homeStore:homeStore,
    paymentStore:paymentStore,
    compressStore,
    tailorStore,
    adjustStore
}
export default stores;

// class RootStore{
//     appStore = appStore
//     loginSignStore=loginSign
//     homeStore=homeStore
//     paymentStore=paymentStore
// }
// const store =new RootStore
// const Context=createContext(store)
// export default function stores(){
//     return useContext(Context)
// }