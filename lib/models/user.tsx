export interface User{
    author:number;
    email:string;
    id:number;
    name:string;
    password:string;
    header_img:string;
    pay_time:number;
    end_time:number;
} 
export interface Profile {
    id: number,
    email: string,
    name: string,
    header_img: string
    privilege: number
}