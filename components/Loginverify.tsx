import { NBString } from '../lib/util/tools'
export  const verificationEmail = (email:any) => {
    let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!NBString.textIsNull(email)) {
        var err=1
        return err
    } else if (!reg.test(email)) {
        var err=2
        return err
    } else {
        var err=0
        return err
    }
}
export const verificationPwd = (password:any) => {
    if (!NBString.textIsNull(password)) {
        var err=1
        return err
    } else {
        var err=0
        return err
    }
}
export  const verificationPwdRegister = (password:any) => {
    let reg = /^(?=.*?[A-Za-z]+)(?=.*?[a-zA-Z0-9]{6,})(?=.*?[A-Z]).*$/;
    if (!NBString.textIsNull(password)) {
        var err=1
        return err
    } else if (!reg.test(password)) {
        var err=2
        return err
    } else {
        var err=0
        return err
    }
}