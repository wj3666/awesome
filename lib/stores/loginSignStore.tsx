import { makeAutoObservable,toJS ,action   } from "mobx";
import Router from "next/router";
import { loginApi } from "../api/login";
import {User} from '../models/user'

class LoginSign {
    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
        
    }
    switchLoginSignView:number=0  //0:登录  1:注册
    showPaymentState:boolean=false
    showUserModel:boolean=false;
    userErr:boolean=false
    tokenMessage:boolean=false
    registerErr:boolean=false
    //注册
    register(email:string,password:string){
        loginApi.regsiter(email,password).then((data:any)=>{
            if(data==='success'){
                console.log("注册成功")
                this.onchangeLogSignView(0)
            }else{
                this.registerErr=true
            }
        });
    }
    onchangeLogSignView(number:number=0){
        this.switchLoginSignView=number
    }

    //选择那种订阅month/year
    setShowPaymentState(v:boolean=true){
        this.showPaymentState=v
    }
    setShowUserModel(v:boolean=true){
        this.showUserModel=v
    }
    setTokenMessage(v:boolean=true){
        this.tokenMessage=v
    }
    clear(){
        this.userErr=true
    }

}
const loginSign=new LoginSign
export default loginSign