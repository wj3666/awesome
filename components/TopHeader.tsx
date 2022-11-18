import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import stores from '../lib/stores/stores';
import { observer } from 'mobx-react'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { signOut, useSession } from 'next-auth/react';
function TopHeader() {
    const { t } = useTranslation('common')
    const [rctangle, setRctangle] = useState(true)
    const router = useRouter()
    const { pathname, asPath, query } = router;
    const [isShowSwitchLanguage, setIsShowSwitchLanguage] = useState(false);
    const [headerUser, setHanderUser] = useState(false)
    const { appStore, loginSignStore } = stores
    const [showUserModel, setShowUserModel] = useState(false)
    const elementRef = useRef(null)
    const elementUserRef = useRef(null)
    const avatarImgRef = useRef<any>();
    const { data: seesion } = useSession()
    // console.log("111",appStore.user.id)
    const avatarUpload = (e) => {
        let file = e.target.files[0];
        let fileSize = (file.size) / 1024;
        if (fileSize > 1024 * 5) {
            alert('文件大小不得超过 5M')
            return
        }
        let fileNameType = file.name.split('.').pop();
        let fileType = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'PNG', 'gif', 'GIF']
        if (fileType.indexOf(fileNameType) < 0) {
            alert('文件格式必须为 jpg、png、gif')
            return
        }

        let fileInfo = new FormData()
        if (file) {
            fileInfo.append('file', file)
            fileInfo.append('fileType', 'policy')
            // console.log(fileInfo.get('file'));
        }
        console.log("1111", file)
        appStore.uploadAvatar(fileInfo, appStore.user.id)
    }
    console.log("头像信息：", appStore.user.header_img)
    const handleChange = (e: any) => {
        e.stopPropagation()
        if (rctangle) {
            setRctangle(false)
        } else {
            setRctangle(true)
        }
    }
    const handleExit = () => {
        loginSignStore.setShowUserModel(false)
        setShowUserModel(false)
        setHanderUser(false)
        localStorage.removeItem("token")
        loginSignStore.setTokenMessage(false)
    }
    const GoogleLoginOut=()=>{
        signOut()
        localStorage.removeItem("token")
    }
    
    useEffect(() => {
        console.log(loginSignStore.tokenMessage)
        if (localStorage.getItem("token") == null) {
            loginSignStore.setTokenMessage(false)
            // setHanderUser(false)
        } else {
            appStore.getUsers()

        }
        addEventListener('click', (e) => {
            setIsShowSwitchLanguage(false);
            setHanderUser(false)
        })
        return () => {
            removeEventListener('click', (e) => {
                setIsShowSwitchLanguage(false);
                setHanderUser(false)
            })
        }
    }, [loginSignStore.tokenMessage, isShowSwitchLanguage, headerUser])
    const stopPropagation = (e) => {//阻止冒泡
        e.stopPropagation();
    }

    return (
        <>
            {
                headerUser ? seesion ? <div ref={elementRef} className={`fixed rounded-2xl ${rctangle ? 'h-41' : 'h-29'} w-59 h-55 right-10 top-20 `}>
                    <div className='absolute w-16 h-16  rounded-full left-20 top-6 border border-222325 overflow-hidden'>
                        <button
                            onClick={(e) => {
                                stopPropagation(e)
                                avatarImgRef.current.click()
                            }}
                            className="relative">
                            {appStore.user.header_img !== null ? <img className='w-16 h-16 object-over ' src={seesion.user.image} /> : <img className='w-16 h-16' src='/NFTelk.png' />}
                            <div>
                                <input ref={avatarImgRef} type="file" name='file' className='hidden' onClick={(e) => {
                                    stopPropagation(e)
                                    e.currentTarget.value = null
                                }} onChange={(e) => avatarUpload(e)} />
                            </div>
                        </button>
                    </div>
                    <div className='h-14  rounded-t-2xl  w-full bg-black  '></div>
                    <div className={`flex flex-col   bg-nb-292A2D items-center rounded-b-2xl w-full`}>
                        <div className='w-full h-9 bg-white invisible  '></div>
                        <div className='flex flex-col w-59 h-16 '>
                            <div className='flex flex-row justify-center space-x-1 '><span className=' '>{seesion.user.email}</span>
                                {appStore.userAthor ? <div className='h-5 flex flex-col justify-end'><VIPlogo /></div> : ""}
                            </div>
                            <p>{seesion.user.name}</p>
                        </div>
                        <div> </div>
                        <div className='w-4/5 border border-black '></div>
                        {rctangle ?
                            <div className=' rounded-b-2xl w-59 h-16'>
                                <div className='flex felx-row justify-around space-x-15  items-center w-full h-13 '>
                                    <div className='  flex felx-row space-x-1'><Userseting /><p className='font-p13-CFD0E4-sem'>{t('header.userHeader.userSetting')}</p></div>
                                    <div className='  flex felx-row space-x-1 curcos-pointer' onClick={() => GoogleLoginOut()}><Userexit /><p className='font-p13-CFD0E4-sem cursor-default'>{t('header.userHeader.logout')}</p></div>
                                </div>
                                <button className='flex flec-row justify-center items-start w-full h-3 ' onClick={(e) => {
                                    handleChange(e)
                                }
                                }><RctangleTop /></button>
                            </div>
                            : <button className='flex flec-row justify-center items-end w-full h-3 ' onClick={(e) => {
                                handleChange(e)
                            }}><RctangleDown /></button >
                        }
                    </div>
                </div> : <div ref={elementRef} className={`fixed rounded-2xl ${rctangle ? 'h-41' : 'h-29'} w-59 h-55 right-10 top-20 `}>
                    <div className='absolute w-16 h-16  rounded-full left-20 top-6 border border-222325 overflow-hidden'>
                        <button
                            onClick={(e) => {
                                stopPropagation(e)
                                avatarImgRef.current.click()
                            }}
                            className="relative">
                            {appStore.user.header_img !== null ? <img className='w-16 h-16 object-over ' src={`${appStore.user.header_img}`} /> : <img className='w-16 h-16' src='/NFTelk.png' />}
                            <div>
                                <input ref={avatarImgRef} type="file" name='file' className='hidden' onClick={(e) => {
                                    stopPropagation(e)
                                    e.currentTarget.value = null
                                }} onChange={(e) => avatarUpload(e)} />
                            </div>
                        </button>
                    </div>
                    <div className='h-14  rounded-t-2xl  w-full bg-black  '></div>
                    <div className={`flex flex-col   bg-nb-292A2D items-center rounded-b-2xl w-full`}>
                        <div className='w-full h-9 bg-white invisible  '></div>
                        <div className='flex flex-col w-59 h-16 '>
                            <div className='flex flex-row justify-center space-x-1 '><span className=' '>{appStore.user.email}</span>
                                {appStore.userAthor ? <div className='h-5 flex flex-col justify-end'><VIPlogo /></div> : ""}
                            </div>
                            <p>1543872008@qq.com</p>
                        </div>
                        <div> </div>
                        <div className='w-4/5 border border-black '></div>
                        {rctangle ?
                            <div className=' rounded-b-2xl w-59 h-16'>
                                <div className='flex felx-row justify-around space-x-15  items-center w-full h-13 '>
                                    <div className='  flex felx-row space-x-1'><Userseting /><p className='font-p13-CFD0E4-sem'>{t('header.userHeader.userSetting')}</p></div>
                                    <div className='  flex felx-row space-x-1 curcos-pointer' onClick={() => handleExit()}><Userexit /><p className='font-p13-CFD0E4-sem cursor-default'>{t('header.userHeader.logout')}</p></div>
                                </div>
                                <button className='flex flec-row justify-center items-start w-full h-3 ' onClick={(e) => {
                                    handleChange(e)
                                }
                                }><RctangleTop /></button>
                            </div>
                            : <button className='flex flec-row justify-center items-end w-full h-3 ' onClick={(e) => {
                                handleChange(e)
                            }}><RctangleDown /></button >
                        }
                    </div>
                </div> : ""
            }
            <div className='flex flex-row justify-between  min-w-full  bg-nb-sidebar-grey h-23'>
                <div className='h-23 pr-6.75 flex flex-row justify-start items-center bg-nb-sidebar-grey w-60.75 border-r border-nb-191919'>
                    <button className='h-23 ml-7.75 ' onClick={() => appStore.setShowMenu()}><img className={` ${appStore.showMenu ? " transition-rotate duration-500 rotate-90" : " transition-rotate duration-300 rotate-0"} `} src='/icon_menu.png' /></button>

                    <h1 className={`cursor-pointer ml-5 `}><img className='w-40' src='/Logo_AwesomeImg.svg' /></h1>
                    
                </div>

                <div className='  1279sc-max:w-60 w-80   flex flex-row justify-around items-center'>
                    <button className=' 519sc-max:hidden 640sc 1280sc:w-15 1600sc:w-15  '><Link href={'subscribe'}><div className='flex flex-row justify-between  w-15  items-center space-x-1'><div><Subscribe /></div><p className=' font-p15-f9f9f9-re'>{t('header.subscribe')}</p></div></Link></button>
                    <button className='519sc-max:hidden 1279sc:w-15 w-12' onClick={(e) => {
                        setIsShowSwitchLanguage(!isShowSwitchLanguage)
                        setHanderUser(false)
                        stopPropagation(e)
                    }}><p className={`flex flex-row justify-between font-p15-f9f9f9-re items-center ${router.locale == 'en' ? "ml-4" : ""} `}><span className='mr-2'><Language /></span>{router.locale === 'en' ? "EN" : "ZH"}</p></button>
                    <div className={`fixed  top-16 rigth-0 ${!isShowSwitchLanguage && 'hidden'}`}>
                        <div className="w-24 rounded-2xl bg-nb-sidebar-grey shadow-card">
                            <button onClick={() => { router.push({ pathname, query }, asPath, { locale: 'en' }) }} className="w-full h-11 font-p15-f9f9f9-re hover:bg-nb-23232B rounded-t-2xl">
                                English
                            </button>
                            <button onClick={() => { router.push({ pathname, query }, asPath, { locale: 'zh' }) }} className="w-full h-11 font-p15-f9f9f9-re hover:bg-nb-23232B rounded-b-2xl">
                                简体中文
                            </button>
                        </div>
                    </div>
                    {
                        loginSignStore.tokenMessage ? <div className='rounded-full w-10  h-10 cursor-default border border-222325 overflow-hidden ' onClick={(e) => {
                            stopPropagation(e)
                            setHanderUser(!headerUser)
                            setIsShowSwitchLanguage(false)
                        }} ref={elementUserRef}>
                            {appStore.user.header_img !== null ? <img className='w-10 h-10 ' src={`${appStore.user.header_img}`} /> : <img className='w-10 h-10 ' src='/NFTelk.png' />}
                        </div> : seesion ? <div className='rounded-full w-10  h-10 cursor-default border border-222325 overflow-hidden '
                            onClick={(e) => {
                                stopPropagation(e)
                                setHanderUser(!headerUser)
                                setIsShowSwitchLanguage(false)
                            }}
                        ><img className='w-10 h-10 ' src={seesion.user.image} /></div>
                            : <div className='1279sc-max:hidden w-26 rounded-full h-10 bg-nb-2F63AE flex flex-row items-center justify-center cursor-pointer active:bg-blue-700'> <Link href={'login'}><p className='font-p15-f9f9f9-re items-center'>{t('header.registerLogin')}</p></Link></div>
                    }

                    {/* <div className='1024sc:hidden w-15'><img src='/icon_menu.png' /></div> */}
                </div>
            </div>

        </>
    )
}

const Subscribe = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M21.256 3.53674C20.7718 3.04106 20.1105 2.75806 19.4176 2.75H2.58204C1.88917 2.75806 1.22788 3.04106 0.743682 3.53674C0.259479 4.03242 -0.00797014 4.70016 0.000180999 5.39306V6.875H21.9995V5.39306C22.0076 4.70016 21.7402 4.03242 21.256 3.53674ZM21.9995 8.25H0.000180999V16.6069C-0.00798488 17.3051 0.263642 17.9775 0.754453 18.474C1.24526 18.9706 1.91441 19.25 2.6126 19.25H19.4176C20.1105 19.2419 20.7718 18.9589 21.256 18.4633C21.7402 17.9676 22.0076 17.2998 21.9995 16.6069V8.25ZM12.0845 14.1778H10.8318L9.56376 16.7139H10.8318L12.0845 14.1778ZM13.597 14.1778H14.8344L13.597 16.7139H12.3289L13.597 14.1778ZM19.9676 14.1778H16.301L15.0789 16.7139H18.7454L19.9676 14.1778Z" fill="#E4E4E4" />
    </svg>

)
const Language = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.9894 0H11C17.0764 0 22 4.92356 22 11C22 17.0764 17.0764 22 11 22H10.9736C4.90769 21.9841 0 17.0659 0 11C0 4.93413 4.90769 0.0158654 10.9736 0H10.9894ZM10.9894 21.1221H11C16.5899 21.1221 21.1221 16.5899 21.1221 11.0053C21.1221 5.41538 16.5899 0.883173 11 0.883173H10.9736C5.39423 0.89375 0.877885 5.42067 0.877885 11C0.877885 16.5793 5.39952 21.1063 10.9736 21.1221H10.9894Z" fill="#E4E4E4" />
        <path fillRule="evenodd" clipRule="evenodd" d="M7.6896 5.76973C8.61508 5.99185 9.57229 6.12406 10.5559 6.15579V1.81396C9.48238 2.12598 8.38767 3.56445 7.6896 5.76973ZM11.4391 6.15579V1.82454C12.5127 2.14714 13.5915 3.5856 14.2843 5.77502C13.3694 5.99714 12.4175 6.12406 11.4391 6.15579ZM11.4444 6.95964C12.4968 6.92791 13.5175 6.78512 14.5064 6.54714C14.8026 7.72646 14.9877 9.07502 15.0194 10.5611H11.4444V6.95964ZM13.1526 2.00435C14.866 2.41156 16.3944 3.30002 17.5896 4.51637C16.791 4.94473 15.9449 5.29377 15.0617 5.56348C14.591 4.05098 13.9353 2.81348 13.1526 2.00435ZM15.8285 10.5611H20.2338C20.1386 8.50916 19.3718 6.62646 18.1449 5.13512C17.2406 5.63223 16.2833 6.03945 15.2838 6.34089C15.6064 7.61012 15.7968 9.04329 15.8285 10.5611ZM10.5612 10.5611H6.9545C6.98623 9.07502 7.17133 7.72118 7.47277 6.54185C8.467 6.78512 9.49825 6.92791 10.5612 6.95964V10.5611ZM15.0194 11.439H11.4391V15.0351C12.4915 15.0668 13.5175 15.2043 14.5064 15.4476C14.8026 14.2736 14.9877 12.9197 15.0194 11.439ZM10.5612 15.0351C9.49825 15.0668 8.467 15.2096 7.47277 15.4529C7.17133 14.2789 6.98623 12.925 6.9545 11.439H10.5612V15.0351ZM10.5612 20.1808V15.839C9.57758 15.8707 8.61508 16.0029 7.6896 16.225C8.38767 18.4303 9.48238 19.8741 10.5612 20.1808ZM17.5949 17.4784C16.3944 18.7 14.866 19.5832 13.1526 19.9957C13.9353 19.1813 14.5963 17.9491 15.067 16.4313C15.9502 16.701 16.7963 17.05 17.5949 17.4784ZM8.81604 2.01493C7.11844 2.42743 5.60065 3.3106 4.41075 4.52166C5.20402 4.94473 6.0396 5.29377 6.91219 5.5582C7.38286 4.05098 8.03863 2.82406 8.81604 2.01493ZM18.1502 16.8649C17.2458 16.3678 16.2886 15.9606 15.2838 15.6592C15.6064 14.3846 15.7968 12.9568 15.8338 11.439H20.2391C20.1439 13.4909 19.3771 15.3736 18.1502 16.8649ZM11.4391 15.839V20.1755C12.5127 19.8529 13.5915 18.4144 14.2843 16.2197C13.3694 15.9976 12.4175 15.8707 11.4391 15.839ZM3.85546 5.13512C4.74921 5.63223 5.70113 6.03416 6.69537 6.3356C6.37277 7.60483 6.1771 9.038 6.15065 10.5611H1.76652C1.86171 8.50916 2.62854 6.62646 3.85546 5.13512ZM6.14537 11.439H1.76123C1.85642 13.4909 2.62325 15.3736 3.85017 16.8649C4.74392 16.3731 5.69585 15.9659 6.69008 15.6644C6.37277 14.3952 6.1771 12.962 6.14537 11.439ZM8.81604 19.9851C7.11315 19.5726 5.59537 18.6894 4.40546 17.4784C5.19873 17.0553 6.0396 16.7063 6.91219 16.4366C7.38286 17.9438 8.03863 19.176 8.81604 19.9851Z" fill="#E4E4E4" />
    </svg>
)
const VIPlogo = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.84639 2.14668L9.93745 4.65595L12.244 2.95263C12.4265 2.81786 12.6461 2.74271 12.8729 2.73743C13.0996 2.73216 13.3225 2.79702 13.511 2.92315C13.6995 3.04929 13.8445 3.23055 13.9262 3.44218C14.0078 3.65381 14.0221 3.88548 13.9672 4.10555L11.7733 12.8806H2.2268L0.0329363 4.10592C-0.0221295 3.88582 -0.00788849 3.65409 0.073713 3.44239C0.155315 3.23069 0.300295 3.04936 0.488843 2.92316C0.67739 2.79697 0.900306 2.73207 1.12713 2.73735C1.35395 2.74262 1.5736 2.81781 1.75608 2.95263L4.06267 4.65595L6.15372 2.14668C6.24631 2.03549 6.35989 1.94363 6.48799 1.87634C6.61608 1.80906 6.75618 1.76767 6.90027 1.75454C7.04437 1.74142 7.18964 1.75681 7.32778 1.79983C7.52968 1.86272 7.71105 1.9842 7.84639 2.14668ZM9.57027 9.74755H4.42984V10.9225H9.57027V9.74755Z" fill="#FFB400" />
    </svg>
)
const RctangleTop = () => (
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 0L11.6569 5.65685L10.9026 6.4111L6 1.50849L1.09739 6.4111L0.343146 5.65685L6 0Z" fill="#CFD0E4" />
    </svg>

)
const RctangleDown = () => (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 7.31372L0.343146 1.65687L1.09739 0.902619L6 5.80523L10.9026 0.902619L11.6569 1.65687L6 7.31372Z" fill="#CFD0E4" />
    </svg>

)
const Userseting = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.8427 8.80195C16.8492 8.83445 16.9887 9.58895 16.9887 10.1835C16.9887 10.79 16.8447 11.557 16.8427 11.5645C16.7607 11.9995 16.4967 12.282 16.1587 12.282H16.0997C15.1557 12.282 14.3892 13.0565 14.3892 14.0095C14.3892 14.3165 14.5367 14.666 14.5382 14.669C14.7072 15.0525 14.5767 15.5225 14.2132 15.777L12.4287 16.7705C12.2467 16.8449 12.0463 16.8622 11.8542 16.8201C11.6621 16.7779 11.4874 16.6783 11.3532 16.5345C11.1592 16.3205 10.4872 15.7075 9.96224 15.7075C9.47824 15.7075 8.82324 16.2535 8.58124 16.519C8.40874 16.7085 8.14174 16.8215 7.87024 16.8215C7.74024 16.8215 7.61724 16.7965 7.48224 16.7365L5.76224 15.763C5.59546 15.6414 5.47487 15.4668 5.42019 15.2678C5.36551 15.0688 5.37998 14.8572 5.46124 14.6675C5.46274 14.6645 5.61024 14.318 5.61024 14.0095C5.61024 13.058 4.84374 12.282 3.90024 12.282H3.82874C3.50274 12.282 3.23874 12.001 3.15674 11.5645C3.15024 11.532 3.01074 10.7745 3.01074 10.1835C3.01074 9.59045 3.15074 8.83345 3.15674 8.80195C3.23874 8.36595 3.50124 8.08495 3.83924 8.08495H3.89824C4.84224 8.08495 5.60874 7.30995 5.60874 6.35745C5.60874 6.04545 5.46124 5.70095 5.45974 5.69745C5.29074 5.31445 5.42124 4.84245 5.78574 4.58795L7.60324 3.58395C7.71524 3.53545 7.83624 3.51245 7.96324 3.51245C8.23524 3.51245 8.50024 3.62245 8.67424 3.80895C8.86524 4.01045 9.52474 4.58795 10.0342 4.58795C10.5382 4.58795 11.1947 4.02295 11.3842 3.82445C11.5582 3.64295 11.8217 3.53445 12.0902 3.53445C12.2207 3.53445 12.3452 3.55895 12.4802 3.61795L14.2337 4.60495C14.5752 4.84545 14.7057 5.31595 14.5367 5.70095C14.5352 5.70395 14.3877 6.04995 14.3877 6.35895C14.3877 7.31045 15.1557 8.08645 16.0977 8.08645H16.1692C16.4967 8.08495 16.7607 8.36595 16.8427 8.80195ZM12.4782 10.3725C12.4782 8.99445 11.3672 7.87395 10.0032 7.87395C8.63824 7.87395 7.52724 8.99395 7.52724 10.3725C7.52724 11.751 8.63724 12.8715 10.0027 12.8715C11.3687 12.8715 12.4782 11.751 12.4782 10.3725Z" fill="#CFD0E4" />
    </svg>

)
const Userexit = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.66667 9.16671L6.58333 8.25004L5.41667 7.08337L2.5 10L5.41667 12.9167L6.58333 11.6667L5.75 10.8334H10V9.16671H5.66667ZM5.83333 6.66671H7.5V5.00004H13.3333V15H7.5V13.3334H5.83333V16.6667H15V3.33337H5.83333V6.66671Z" fill="#CFD0E4" />
    </svg>
)

export default observer(TopHeader)