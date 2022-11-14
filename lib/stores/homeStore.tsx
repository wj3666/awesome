import { makeAutoObservable } from "mobx";
import { HomeApi } from "../api/home";

class HomeStore {
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }
   

    getHomeData(){
        HomeApi.getData().then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
}
const homeStore=new HomeStore
export default homeStore