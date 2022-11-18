import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useTransition } from 'react'
import useStore from '../lib/stores/stores'
import { Showpassword, FaceBooklogo, Googlelogo } from '../components/Svg'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { NBString } from '../lib/util/tools'
import appStore from '../lib/stores/appstore'
import { verificationEmail, verificationPwd, verificationPwdRegister } from '../components/Loginverify'
import { signIn, signOut, useSession } from 'next-auth/react'
import axios from 'axios'
const LogIn = () => {
    const { loginSignStore } = useStore()

    return (
        <>
            <div>
                {
                    loginSignStore.switchLoginSignView === 0 ? <LoginMoal /> : <SingUpModle />
                }
            </div>
        </>
    )

}
//登录
const LoginMoal = observer(() => {
    const { data: session } = useSession()
    console.log("session",session)
    const { t } = useTranslation('common');
    const [emailVal, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [showpassword, setShowpassword] = useState(false)
    const [emailTip, setEmailTip] = useState(0);// 0:隐藏 1:Enter the email address  2:Please enter the correct email address
    const [pwdTip, setPwdTip] = useState(0) // 0:隐藏  1:Enter a password 
    const { loginSignStore } = useStore()
    const router = useRouter()
    const submit = () => {
        var emailErr = verificationEmail(emailVal);
        var pwdErr = verificationPwd(password);
        setEmailTip(emailErr)
        setPwdTip(pwdErr)
        if (emailErr == 0 && pwdErr == 0) {
            appStore.login(emailVal, password)
            if (loginSignStore.userErr == true) {
                setPwdTip(2)
            }
        }
        
    }
    if(session){
        router.push('/home')
        appStore.googleLogin(session)
    }
    return (
        <>
            <div onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    submit()
                }
            }} className=' w-screen h-screen bg-nb-sidebar-grey flex flex-row  justify-center'>
                <div className='  bg-nb-sidebar-grey   h-screen w-5/12'>
                    <div className=' flex flex-row justify-center items-center bg-loginbg-left bg-cover w-full h-full '>
                        <div className='flex flex-col space-y-3 h-160 w-94.5   '>
                            <div className='flex flex-col justify-center items-center space-y-2 w-full h-26 '>
                                <img className='w-50' src='/Logo_awesomeImg.svg' />
                                <p className='font-p15-C8C8C8-sem'>{t('header.login.title')}</p>
                            </div>
                            <div className='flex flex-col items-center  justify-start w-full h-18 '>
                                <p className='relative  h-7 w-full font-p15-CFD0E4-sem'>{t('header.login.email')}</p>
                                {/* <img src='/Vector.png' className='absolute'/> */}
                                <input type="text" onChange={(e) => { setUserName(e.target.value) }} value={emailVal} className={`w-full h-10.5 rounded-xl border px-10  bg-email-logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D ${emailVal === '' ? "" : "font-p15-ffffff-sem"} `} placeholder="Name@xxxx.com" />
                            </div>
                            {
                                emailTip !== 0 && router.locale === 'en' ? <p className="mt-2 font-p15-fab300-re">{emailTip === 1 ? 'Enter the email address' : emailTip === 2 && 'Please enter the correct email address'}</p> : <p className="mt-2 font-p15-fab300-re">{emailTip === 1 ? '请输入邮箱地址' : emailTip === 2 && '请输入正确的邮箱地址'}</p>
                            }
                            <div className='relative items-center  justify-start w-full h-24 '>
                                <p className='h-7 w-full font-p15-CFD0E4-sem'>{t('header.login.passWord')}</p>
                                <input type={showpassword ? 'text' : 'password'} onChange={(e) => { setPassword(e.target.value) }} value={password} className={`w-full h-10.5 rounded-xl border px-10  bg-password-logo logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D ${password === '' ? "" : "font-p15-ffffff-sem"} `} placeholder={t('header.login.passWordHint')} />
                                <button type="button" onClick={() => setShowpassword(!showpassword)} className='absolute   w-5  right-3  top-9.5 cursor-pointer'>
                                    {
                                        showpassword ? <Showpassword /> : <Showpassword />
                                    }
                                </button>
                                {
                                    router.locale === 'en' ?
                                        pwdTip === 0 ? <p className="mt-2 font-p15-fab300-re"></p> : pwdTip === 1 ? <p className="mt-2 font-p15-fab300-re">{pwdTip === 1 && 'Enter a password'}</p> : pwdTip === 2 ? <p className="mt-2 font-p15-fab300-re">Wrong account or password</p> : ""
                                        :
                                        pwdTip === 0 ? <p className="mt-2 font-p15-fab300-re"></p> : pwdTip === 1 ? <p className="mt-2 font-p15-fab300-re">{pwdTip === 1 && '请输入密码'}</p> : pwdTip === 2 ? <p className="mt-2 font-p15-fab300-re">密码或邮箱错误</p> : ""
                                }
                            </div>
                            <button onClick={() => {
                                submit()
                            }} className="w-full h-12.5  font-p15-CFD0E4-sem   bg-nb-4C90FE rounded-xl">{t('header.login.login')}</button>
                            <div className=' w-full h-8 flex flex-row justify-center '><p className='font-p15-C8C8C8-sem'>{t('header.login.account')} <span onClick={() => loginSignStore.onchangeLogSignView(1)} className='font-p15-4C90FE-sem cursor-pointer'>{t('header.login.creatUser')}</span></p></div>
                            <div className=' flex flex-row items-center '>
                                <button onClick={() => {

                                }} className="flex flex-row justify-center items-center space-x-2 w-full h-12.5  font-p15-CFD0E4-sem   bg-nb-435893 rounded-xl">
                                    <FaceBooklogo />
                                    <p>{t('header.login.loginMethodOne')}</p>
                                </button>
                            </div>
                            <div className='h-20 flex flex-row items-center '><button onClick={() => signIn()} className="flex flex-row  justify-center items-center space-x-2 w-full h-12.5  font-p15-CFD0E4-sem   bg-black rounded-xl ">
                                <Googlelogo />
                                <p className='font-p15-ffffff-sem'>{t('header.login.loginMethodTwo')}</p>
                            </button></div>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col   justify-center items-center bg-paymentbg-right bg-cover h-full  w-5/12'>
                    <div className='flex flex-col justify-start  items-center  h-140 w-94.5 '>
                        <div className='w-110 h-77 '><img src='/login-rightimg.png' /></div>
                        <div className='flex flex-col items-center h-60 w-94.5 space-y-4 '>
                            <p className='font-p26-FFFFFF-sem font-sans w-100'>{t('header.loginRight.title')}</p>
                            <p className='font-p14-CFD0E4-sem w-100'>{t('header.loginRight.content')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
})
// 注册 
const SingUpModle = () => {
    const { loginSignStore } = useStore()
    const { t } = useTranslation('common')
    const [emailVal, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [showpassword, setShowpassword] = useState(false)
    const [emailTip, setEmailTip] = useState(0);// 0:隐藏 1:Enter the email address  2:Please enter the correct email address
    const [pwdTip, setPwdTip] = useState(0) // 0:隐藏  1:Enter a password 
    const router = useRouter()

    const submit = () => {
        var emailErr = verificationEmail(emailVal);
        var pwdErr = verificationPwdRegister(password);
        setEmailTip(emailErr)
        setPwdTip(pwdErr)
        if (emailErr == 0 && pwdErr == 0) {
            loginSignStore.register(emailVal, password)
            setEmailTip(3)
        }

    }
    return (
        <>
            <div onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    submit()
                }
            }} className='flex flex-row justify-center  w-screen h-screen bg-black  flex flex-row '>
                <div className=' bg-nb-sidebar-grey   h-screen w-5/12'>
                    <div className='flex flex-row justify-center items-center bg-loginbg-left bg-cover w-full h-full '>
                        <div className='flex flex-col space-y-3 h-160 w-94.5   '>
                            <div className='flex flex-col justify-center items-center space-y-2 w-full h-30 '>
                                <img className='w-50' src='/Logo_awesomeImg.svg' />
                                <p className='font-p15-C8C8C8-sem'>{t('header.login.title')}</p>
                            </div>
                            <div className='flex flex-col items-center  justify-start w-full h-18 '>
                                <p className='relative  h-7 w-full font-p15-CFD0E4-sem'>{t('header.login.email')}</p>
                                {/* <img src='/Vector.png' className='absolute'/> */}
                                <input type="text" onChange={(e) => { setUserName(e.target.value) }} value={emailVal} className={`w-full h-10.5 rounded-xl border px-10  bg-email-logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D ${emailVal === '' ? "" : "font-p15-ffffff-sem"} `} placeholder="Name@xxxx.com" />
                            </div>
                            {
                                emailTip !== 0 && router.locale === 'en' ? <p className="mt-2 font-p15-fab300-re">{emailTip === 1 ? 'Enter the email address' : emailTip === 2 ? 'Please enter the correct email address' : emailTip === 3 && 'The account already exists'}</p> : <p className="mt-2 font-p15-fab300-re">{emailTip === 1 ? '请输入邮箱地址' : emailTip === 2 ? '请输入正确的邮箱地址' : emailTip === 3 && '账号已经存在'}</p>
                            }
                            <div className='relative items-center  justify-start w-full h-30 '>
                                <p className='h-7 w-full font-p15-CFD0E4-sem'>{t('header.login.passWord')}</p>
                                <input type={showpassword ? 'password' : 'text'} onChange={(e) => { setPassword(e.target.value) }} value={password} className={`w-full h-10.5 rounded-xl border px-10  bg-password-logo logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D ${password === '' ? "" : "font-p15-ffffff-sem"} `} placeholder={t('header.register.passWordHint')} />
                                <button type="button" onClick={() => setShowpassword(!showpassword)} className='absolute   w-5  right-3  top-1/3 cursor-pointer'>
                                    {
                                        showpassword ? <Showpassword /> : <Showpassword />
                                    }
                                </button>
                                {
                                    router.locale === 'en' ?
                                        pwdTip === 0 ? <p className="mt-2 font-p15-fab300-re"></p> : pwdTip === 1 ? <p className="mt-2 font-p15-fab300-re">{pwdTip === 1 && 'Enter a password'}</p> : pwdTip === 2 ? <p className="mt-2 font-p15-fab300-re">Wrong account or password</p> : ""
                                        :
                                        pwdTip === 0 ? <p className="mt-2 font-p15-fab300-re"></p> : pwdTip === 1 ? <p className="mt-2 font-p15-fab300-re">{pwdTip === 1 && '请输入密码'}</p> : pwdTip === 2 ? <p className="mt-2 font-p15-fab300-re">密码格式有问题,请重新输入</p> : ""
                                }

                            </div>
                            <button onClick={() => {
                                submit()
                            }} className="w-full h-12.5  font-p15-CFD0E4-sem   bg-nb-4C90FE rounded-xl">{t('header.register.creatUser')}</button>
                            <div className=' w-full h-10 flex flex-row justify-center '><p className='font-p15-C8C8C8-sem'>{t('header.register.haveMember')} <span onClick={() => loginSignStore.onchangeLogSignView(0)} className='font-p15-4C90FE-sem cursor-pointer'>{t('header.register.signIn')} </span></p></div>

                        </div>
                    </div>
                </div>
                <div className=' flex flex-col   justify-center items-center bg-paymentbg-right bg-cover h-full  w-5/12'>
                    <div className='flex flex-col justify-start  items-center  h-140 w-94.5 '>
                        <div className='w-110 h-77 '><img src='/login-rightimg.png' /></div>
                        <div className='mt-4 flex flex-col items-center h-60 w-94.5 space-y-4 '>
                            <p className='font-p26-FFFFFF-sem font-sans w-100'>{t('header.loginRight.title')}</p>
                            <p className='font-p14-CFD0E4-sem w-100'>{t('header.loginRight.content')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default observer(LogIn)

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})