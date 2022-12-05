import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useTransition } from 'react'
import stores from '../lib/stores/stores'
import { Showpassword, FaceBooklogo, Googlelogo } from '../components/Svg'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import appStore from '../lib/stores/appstore'
import { verificationEmail, verificationPwd, verificationPwdRegister } from '../components/Loginverify'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { GetServerSideProps } from 'next'
type Props = {
    children: React.ReactNode
}
const LogIn = ({ providers }) => {
    const { loginSignStore } = stores

    return (
        <>
            <div>
                {
                    loginSignStore.switchLoginSignView === 0 ? <LoginMoal providers={providers} /> : <SingUpModle />
                }
            </div>
        </>
    )

}

//登录
const LoginMoal = observer(({ providers }: any) => {
    const { data: session, status } = useSession()
    const { t } = useTranslation('common');
    const [emailVal, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [showpassword, setShowpassword] = useState(false)
    const [emailTip, setEmailTip] = useState(0);// 0:隐藏 1:Enter the email address  2:Please enter the correct email address
    const [pwdTip, setPwdTip] = useState(0) // 0:隐藏  1:Enter a password 
    const { loginSignStore } = stores
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
    if (session) {
        stores.appStore.googleLogin(session)
        router.push('/home')
    }
    return (
        <>
            <div onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    submit()
                }
            }} className=' w-screen h-screen    flex flex-row  justify-center'>
                <div className='bg-nb-191919 h-screen w-1/2'>
                    <div className='bg-loginbg-left bg-cover  h-full w-full'>
                        <div className=' flex flex-row justify-center items-center   w-full h-full '>
                            <div className='flex flex-col space-y-3 h-160 w-94.5  mt-5 '>
                                <div className='flex flex-col justify-center items-center space-y-2 w-full h-26 '>
                                    <img className='w-50' src='/Logo_awesomeImg.svg' />
                                    <p className='font-p15-C8C8C8-w400'>{t('header.login.title')}</p>
                                </div>
                                <div className='flex flex-col items-center  justify-start w-full  '>
                                    <p className='relative  h-7 w-full font-p15-CFD0E4-w500'>{t('header.login.email')}</p>
                                    {/* <img src='/Vector.png' className='absolute'/> */}
                                    <input type="text" onChange={(e) => { setUserName(e.target.value) }} value={emailVal} className={`w-full h-10.5 rounded-xl border px-10  bg-email-logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D  caretColor ${emailVal === '' ? "" : "font-p15-FFFFFF-w500"} `} placeholder="Name@xxxx.com" />
                                </div>
                                {
                                    emailTip !== 0 && router.locale === 'en' ? <p className="mt-2 font-p15-FAB300-w500">{emailTip === 1 ? 'Enter the email address' : emailTip === 2 && 'Please enter the correct email address'}</p> : <p className="mt-2 font-p15-FAB300-w500">{emailTip === 1 ? '请输入邮箱地址' : emailTip === 2 && '请输入正确的邮箱地址'}</p>
                                }
                                <div className='relative items-center  justify-start w-full  h-23'>
                                    <p className='h-7 w-full font-p15-CFD0E4-w500'>{t('header.login.passWord')}</p>
                                    <input type={showpassword ? 'text' : 'password'} onChange={(e) => { setPassword(e.target.value) }} value={password} className={`w-full h-10.5 rounded-xl border px-10  bg-password-logo logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D caretColor ${password === '' ? "" : "font-p15-FFFFFF-w500"} `} placeholder={t('header.login.passWordHint')} />
                                    <button type="button" onClick={() => setShowpassword(!showpassword)} className='absolute   w-5  right-3  top-9.5 cursor-pointer'>
                                        {
                                            showpassword ? <Showpassword /> : <Showpassword />
                                        }
                                    </button>
                                    {
                                        router.locale === 'en' ?
                                            pwdTip === 0 ? <p className="mt-2 font-p15-FAB300-w500"></p> : pwdTip === 1 ? <p className="mt-2 font-p15-FAB300-w500">{pwdTip === 1 && 'Enter a password'}</p> : pwdTip === 2 ? <p className="mt-2 font-p15-FAB300-w500">Wrong account or password</p> : ""
                                            :
                                            pwdTip === 0 ? <p className="mt-2 font-p15-FAB300-w500"></p> : pwdTip === 1 ? <p className="mt-2 font-p15-FAB300-w500">{pwdTip === 1 && '请输入密码'}</p> : pwdTip === 2 ? <p className="mt-2 font-p15-FAB300-w500">密码或邮箱错误</p> : ""
                                    }
                                </div>
                                <div className='h-15'>
                                    <button onClick={() => {
                                        submit()
                                    }} className="w-full h-12.5  font-p15-CFD0E4-w500   bg-nb-4C90FE rounded-xl">{t('header.login.login')}</button>
                                </div>
                                <div className=' w-full h-5  flex flex-row justify-center '><p className='font-p15-C8C8C8-w500'>{t('header.login.account')} <span onClick={() => loginSignStore.onchangeLogSignView(1)} className='font-p15-4C90FE-w500 cursor-pointer'>{t('header.login.creatUser')}</span></p></div>
                                <div>
                                    {
                                        providers && Object.values(providers).map((provider: any) => (
                                            <div className=' flex flex-row items-center mt-5' key={provider.name}>
                                                {provider.name === 'Facebook' ?
                                                    <button onClick={() => signIn(provider.id)}
                                                        className="flex flex-row justify-center items-center space-x-2 w-full h-12.5  font-p15-CFD0E4-w500   bg-nb-435893 rounded-xl">
                                                        <FaceBooklogo />
                                                        <p>{t('header.login.loginMethodOne')}</p>
                                                    </button>
                                                    :
                                                    <button onClick={() => signIn(provider.id)}
                                                        className="flex flex-row justify-center items-center space-x-2 w-full h-12.5  font-p15-CFD0E4-w500 border border-4C90FE   bg-black rounded-xl">
                                                        <Googlelogo />
                                                        <p>{t('header.login.loginMethodTwo')}</p>
                                                    </button>

                                                }
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col   justify-center items-center bg-paymentbg-right bg-cover h-full  w-1/2'>
                    <div className='flex flex-col justify-start  items-center  h-140 w-94.5 '>
                        <div className='w-110 h-77 '><img src='/login-rightimg.png' /></div>
                        <div className='flex flex-col items-center h-60 w-94.5 space-y-4 '>
                            <p className='font-p26-FFFFFF-row  w-114'>{t('header.loginRight.title')}</p>
                            <p className='font-p14-CFD0E4-row w-114'>{t('header.loginRight.content')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
})
// 注册 
const SingUpModle = () => {
    const { loginSignStore } = stores
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
            if (stores.loginSignStore.registerErr) {
                setEmailTip(3)
            }
        }
    }
    return (
        <>
            <div onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    submit()
                }
            }} className='flex flex-row justify-center  w-screen h-screen   flex flex-row '>
                <div className='bg-nb-191919 h-screen w-1/2'>
                    <div className='  bg-loginbg-left  bg-cover h-screen w-full'>
                        <div className='flex flex-row justify-center items-center w-full h-full '>
                            <div className='flex flex-col space-y-3 h-160 w-94.5  mt-5 '>
                                <div className='flex flex-col justify-center items-center space-y-2 w-full h-30 '>
                                    <img className='w-50' src='/Logo_awesomeImg.svg' />
                                    <p className='font-p15-C8C8C8-w400'>{t('header.login.title')}</p>
                                </div>
                                <div className='flex flex-col items-center  justify-start w-full h-18 '>
                                    <p className='relative  h-7 w-full font-p15-CFD0E4-w500'>{t('header.login.email')}</p>
                                    {/* <img src='/Vector.png' className='absolute'/> */}
                                    <input type="text" onChange={(e) => { setUserName(e.target.value) }} value={emailVal} className={`w-full h-10.5 rounded-xl border px-10  bg-email-logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D caretColor ${emailVal === '' ? "" : "font-p15-FFFFFF-w500"} `} placeholder="Name@xxxx.com" />
                                </div>
                                {
                                    emailTip !== 0 && router.locale === 'en' ? <p className="mt-2 font-p15-FAB300-w500">{emailTip === 1 ? 'Enter the email address' : emailTip === 2 ? 'Please enter the correct email address' : emailTip === 3 && 'The account already exists'}</p> : <p className="mt-2 font-p15-FAB300-w500">{emailTip === 1 ? '请输入邮箱地址' : emailTip === 2 ? '请输入正确的邮箱地址' : emailTip === 3 && '账号已经存在'}</p>
                                }
                                <div className='relative w-full h-24 '>
                                    <p className='h-7 w-full font-p15-CFD0E4-w500'>{t('header.login.passWord')}</p>
                                    <input type={showpassword ? 'password' : 'text'} onChange={(e) => { setPassword(e.target.value) }} value={password} className={`w-full h-10.5 rounded-xl border px-10  bg-password-logo logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D caretColor ${password === '' ? "" : "font-p15-FFFFFF-w500"} `} placeholder={t('header.register.passWordHint')} />
                                    <button type="button" onClick={() => setShowpassword(!showpassword)} className='absolute   w-5  right-3  top-10 cursor-pointer'>
                                        {
                                            showpassword ? <Showpassword /> : <Showpassword />
                                        }
                                    </button>
                                    {
                                        router.locale === 'en' ?
                                            pwdTip === 0 ? <p className="mt-2 font-p15-FAB300-w500"></p> : pwdTip === 1 ? <p className="mt-2 font-p15-FAB300-w500">{pwdTip === 1 && 'Enter a password'}</p> : pwdTip === 2 ? <p className="mt-2 font-p15-FAB300-w500">Wrong account or password</p> : ""
                                            :
                                            pwdTip === 0 ? <p className="mt-2 font-p15-FAB300-w500"></p> : pwdTip === 1 ? <p className="mt-2 font-p15-FAB300-w500">{pwdTip === 1 && '请输入密码'}</p> : pwdTip === 2 ? <p className="mt-2 font-p15-FAB300-w500">密码格式有问题,请重新输入</p> : ""
                                    }

                                </div>
                                <button onClick={() => {
                                    submit()
                                }} className="w-full h-12.5  font-p15-CFD0E4-w500   bg-nb-4C90FE rounded-xl">{t('header.register.creatUser')}</button>
                                <div className=' w-full  flex flex-row justify-center '><p className='font-p15-C8C8C8-w500 mt-2'>{t('header.register.haveMember')} <span onClick={() => loginSignStore.onchangeLogSignView(0)} className='font-p15-4C90FE-w500 cursor-pointer'>{t('header.register.signIn')} </span></p></div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col   justify-center items-center bg-paymentbg-right bg-cover h-full  w-1/2'>
                    <div className='flex flex-col justify-start  items-center  h-140 w-94.5 '>
                        <div className='w-110 h-77 '><img src='/login-rightimg.png' /></div>
                        <div className='flex flex-col items-center h-60 w-94.5 space-y-4 '>
                            <p className='font-p26-FFFFFF-row  w-114 mt-8 '>{t('header.loginRight.title')}</p>
                            <p className='font-p14-CFD0E4-row w-114' >{t('header.loginRight.content')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default observer(LogIn)


export const getServerSideProps: GetServerSideProps = async (context) => {
    // console.log(context.req)
    const providers = await getProviders()
    return {
        props: {
            providers,
            ...await serverSideTranslations(context.locale, ['common']),
        },
    }
}