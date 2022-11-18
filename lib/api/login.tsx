import React from 'react'
import { User } from '../models/user'
import apiClient from './apiClient'

export const  loginApi= {
    login:async (email:string,password:string)=>{
        const response=await apiClient.post(`/user/login`,{
            username:email,
            password:password
        });
        const data=response.data
        return data;
    },
    
    getId:async(uid:number)=>{
        const response=await apiClient.get(`/user?id=${uid}`)
        const data:User=response.data
        return data
    },
    regsiter:async (email:string,password:string)=>{
        const response=await apiClient.post(`/user/register`,{
            username:email,
            password:password
        });
        const data=response.data
        return data;
    },
    googleLogin:async(seesion:any)=>{
        const response=await apiClient.post('/auth/login',{
            data:seesion
        });
        console.log("返回结果：",response)
        const data=response.data
        return data
    }
}
