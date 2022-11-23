import { createContext,useContext } from "react";
import appStore from "./appstore";
import homeStore from "./homeStore";
import loginSign from "./loginSignStore";
import paymentStore from "./paystore";
import CompressStore from "./compressStore";
import TailorStore from "./tailorStore";

const compressStore = new CompressStore();
const tailorStore = new TailorStore();

const stores = {
    appStore:appStore,
    loginSignStore:loginSign,
    homeStore:homeStore,
    paymentStore:paymentStore,
    compressStore,
    tailorStore
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