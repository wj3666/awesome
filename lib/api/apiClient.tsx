import axios from "axios";
import Router from "next/router";
import { SERVER_BASE_URL } from "../util/constan";

type generalResp = {
    code: number;
    msg: string;
    data: any;
}
const apiClient = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 30000,
})
// apiClient.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// apiClient.defaults.headers.common["Accept-Language"] = "en-US,en;q=0.5" // default set to english

// 添加请求拦截器
apiClient.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token=localStorage.getItem("token")
    //config请求对象
    config.headers.Authorization=token //bearer:票根加不加无所谓
    console.log("config.header.Authorization:",config.headers.Authorization)
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log("请求错误")
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    function (response) {
        // console.log("debug response data", response.data)
        console.log(response.data)
        let resp: generalResp = response.data;
        if (resp.code == 1) {
            // console.log("dsadsa",response)
            response.data = resp.data;
            // console.log("res.data:",response.data) 
            const { authorization } = response.headers
            authorization && localStorage.setItem("token", authorization)
            return response;
        } else {
            // response.data = resp.msg;
            // return response;
            return Promise.reject(resp.msg);
        }
    },
    function (error) {
        console.log("响应错误:",error.response)
        if(error.response?.status==400){
            localStorage.removeItem("token")
        }
        return Promise.reject(error);
    }
);


export default apiClient