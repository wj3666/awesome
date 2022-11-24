import { throws } from "assert";
import { makeAutoObservable, toJS } from "mobx";
import Router from "next/router";
import { HomeApi } from "../api/home";
import { User } from "../models/user";
import { loginApi } from "../api/login";
import loginSign from "./loginSignStore";
class AppStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    showMenu = false
    userMessage: string = ''
    headerUser: boolean = false
    showContactModel: boolean = false
    temporaryAvatar = '';
    user: User = {} as User
    userPrivilege=false  //用户功能权限
    //侧边菜单栏  
    setShowMenu() {
        if (this.showMenu) {
            this.showMenu = false
        } else {
            this.showMenu = true
        }
    }
    setHeaderUser(v: boolean = true) {
        this.headerUser = v

    }
    //联系我们窗口
    setShowContactModel(v: boolean = true) {
        this.showContactModel = v
    }
    //验证是否登录
    // getUserMessage

    //刷新获取用户登录信息
    getUsers=()=>{
        HomeApi.getUser().then(
            data=>{
                if(data==='error'){
                    this.setUser({})
                    loginSign.setTokenMessage(false)
                }else{
                    // console.log("getuser",data)
                    this.setUser(data)
                    loginSign.setTokenMessage(true)
                }
            }
        )
    }

    //登录
    login(email: string, password: string) {
        loginApi.login(email, password).then((data: any) => {
            if (data =='success') {
                // this.getUsers()
               Router.push('/home')
            } else {
                loginSign.userErr=true
            }
        })
    }
    //三方登录存储数据(google、facebook)
        googleLogin(session:any){
            loginApi.googleLogin(session).then((data:any)=>{
                
            })
        }
    
    //用户信息
    setUser = (data: any) => {
        // console.log("dasada",data)
        this.user = data[0]
        // console.log(toJS(this.user))
        if(this.user.author==1){
            this.setUserPrivilege(true)
        }
        // console.log("user:", this.user)
    }
    //修改用户功能权限
    setUserPrivilege=(v:boolean)=>{
        this.userPrivilege=v
    }
    // 上传头像
    uploadAvatar = (fileInfo: any, id: any) => {
        HomeApi.upload(fileInfo).then(
            data => {
                this.temporaryAvatar = data
                return HomeApi.editProfile(id, this.temporaryAvatar)
            }
        ).then(
            data => {
                this.getUsers()
            }
        )
    }

}
const appStore = new AppStore
export default appStore
