import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import stores from '../lib/stores/stores';
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next';


class TabNav {

    tabsMap = [
        {
            name: "首页",
            link: "/home",
            normalImage: "/icon_home.svg",
        },
        {
            name: "压缩图像文件",
            link: "/compress",
            normalImage: "/icon_zipIMG.svg",
        },
        {
            name: "调整图像大小",
            link: "/adjust",
            normalImage: "/icon_resize.svg",
        },
        {
            name: "裁剪图片",
            link: "/tailor",
            normalImage: "/icon_crop.svg",
        },
        {
            name: "转换至JPG文件",
            link: "/convertjpg",
            normalImage: "/icon_covertToJPG.svg",
        },
        {
            name: "JPG文件转换",
            link: "/jpgconvert",
            normalImage: "/icon_covertFromJPG.svg",
        },
        {
            name: "照片编辑器",
            link: "/imgedit",
            normalImage: "/icon_editIMG.svg",
        },
        {
            name: "给图片加水印",
            link: "/watermark",
            normalImage: "/icon_waterMark.svg",
        },
        {
            name: "搞笑创意图片生成",
            link: "/originality",
            normalImage: "/icon_MemeGenerator.svg",
        },
        {
            name: "旋转一个图片",
            link: "/rotate",
            normalImage: "/icon_rotation.svg",
        },
        {
            name: "HTML转图片",
            link: "/htmlconvert",
            normalImage: "/icon_html.svg",
        },

    ];

    isSelected(data, pathname: String) {
        return pathname.startsWith(data.link);
    }
}

const tabNav = new TabNav();
function Sidebar() {
    const { appStore } = stores
    const { t } = useTranslation('common')

    var pathName: string = "";
    const router = useRouter();
    pathName = router.pathname;

    return (
        // <div className={`h-full  overflow-hidden bg-nb-sidebar-grey  ${appStore.showMenu ? " transition-width duration-300 1279sc-max:w-17  w-20 " : " transition-width duration-500  1279sc-max:w-17  w-60.5"}`}>
        // <div className={ `mt-23 h-full overflow-x-auto  1279sc-max:22   bg-nb-sidebar-grey  ${appStore.showMenu ? " transition-width duration-300 12879sc-max:w-22 w-22 " : " transition-width duration-500  1279sc-max:w-22  w-60.5"}`}>


        //     <div className=' h-full  w-full   bg-nb-sidebar-grey items-center flex flex-col'>

        //         {tabNav.tabsMap.map(function (data, index) {
        //             return (
        //                 <Link href={data.link} key={data.name}>
        //                     <div className={`w-full flex flex-row justify-center items-center h-20 1599sc-max:h-15 833sc-max:w-20 `}>
        //                         <button
        //                             className={`flex flex-row 1599sc-max:h-15 h-20  justify-start 1279sc-max:justify-center  w-full items-center   ${tabNav.isSelected(data, pathName)
        //                                 ? "bg-nb-2F63AE"
        //                                 : "bg-transparent hover:bg-nb-0E0E12"
        //                                 }`}
        //                         >
        //                             <img
        //                                 src={
        //                                     data.normalImage
        //                                 }
        //                                 className={`ml-7 1279sc-max:ml-5  ${appStore.showMenu ? " transition-ml duration-500   h-6 w-6   " : " transition-ml   duration-300  w-6 h-6 mr-4  "}`}
        //                             />
        //                             <p
        //                                 className={` 
        //                                     overflow-hidden text-left h-7 font-p15-f9f9f9-re   leading-7  1599sc-max:leading-8    1279sc-max:hidden
        //                                         ${appStore.showMenu ? " transition-width duration-300 w-0" : " transition-width duration-300 w-40"}
        //                                 `}
        //                             >
        //                                 {t(`sidebar.${index}`)}
        //                             </p>
        //                         </button>
        //                     </div>
        //                 </Link>
        //             );
        //         })}
        //         <div className='bg-nb-0E0E12 w-full h-1'></div>
        //         <div className='w-full h-85 mt-5  items-center flex flex-col '>
        //             <Link href={`/setting`}>
        //                 <button className={`flex flex-row 1599sc-max:h-18 h-20  justify-start 1279sc-max:justify-center  w-full items-center ${pathName.startsWith('/setting') ? "bg-nb-2F63AE" : "bg-transparent hover:bg-nb-0E0E12"} `}>
        //                     <img src='/icon_setting.svg' className={`   ${appStore.showMenu ? " transition-ml duration-500 h-6 w-6 ml-7" : " transition-ml   duration-150 w-6 h-6 mr-4 ml-7 "}`} />
        //                     <p className={`overflow-hidden text-left 1279sc-max:hidden   h-7  font-p15-f9f9f9-re  ${appStore.showMenu ? " transition-width duration-300 w-0" : " transition-width duration-300 w-40"}`} >{t('sidebar.11')}</p>
        //                 </button>

        //             </Link>
        //             <Link href={`/help`}>
        //                 <button className={`flex flex-row 1599sc-max:h-18 h-20  1279sc-max:justify-center justify-start  w-full items-center ${pathName.startsWith('/help') ? "bg-nb-2F63AE" : "bg-transparent hover:bg-nb-0E0E12"} `}>
        //                     <img src='/icon_setting.svg' className={`   ${appStore.showMenu ? " transition-ml duration-500 h-6 w-6 ml-7" : " transition-ml   duration-150 w-6 h-6 mr-4 ml-7 "}`} />
        //                     <p className={`overflow-hidden text-left 1279sc-max:hidden  h-7 font-p15-f9f9f9-re  ${appStore.showMenu ? " transition-width duration-300 w-0" : " transition-width duration-300 w-40"}`} >{t('sidebar.12')}</p>
        //                 </button>

        //             </Link>
        //         </div>
        //     </div>
        // </div>
        // </div>
        <div className={`outer-container bg-nb-sidebar-grey ${appStore.showMenu ? " transition-width duration-300 1279sc-max:w-17 w-20 " : " transition-width duration-500  1279sc-max:w-17 w-60.5"}`}>
            <div className='inner-container pt-23'>
                <div className='pb-5'>
                    {tabNav.tabsMap.map(function (data, index) {
                        return (
                            <Link href={data.link} key={data.name}>
                                <button
                                    className={`flex flex-row h-15 justify-start 1279sc-max:justify-center items-center w-full pl-7.75 1279sc-max:pl-0 ${appStore.showMenu && 'pl-0 justify-center'}  ${tabNav.isSelected(data, pathName)
                                        ? "bg-nb-2F63AE"
                                        : "bg-transparent hover:bg-nb-0E0E12"
                                        }`}
                                >
                                    <img
                                        src={
                                            data.normalImage
                                        }
                                        className={`w-6 h-6 transition-ml ${appStore.showMenu ? "duration-500" : "duration-300"}`}
                                    />
                                    <p className={` text-left 1279sc-max:hidden  ${tabNav.isSelected(data,pathName) ? "font-p15-FFFFFF-w500" : "font-p15-FFFFFF-w400"} ${appStore.showMenu ? "hidden" : "ml-5"}`}>
                                        {t(`sidebar.${index}`)}
                                    </p>
                                </button>
                            </Link>
                        );
                    })}
                </div>
                <div className='bg-nb-0E0E12 w-full h-0.25'></div>
                <div className='w-full py-5'>
                    <Link href={`/setting`}>
                        <button className={`flex flex-row items-center w-full h-15 1280sc:pl-7.75 1279sc-max:justify-center ${pathName.startsWith('/setting') ? "bg-nb-2F63AE" : "bg-transparent hover:bg-nb-0E0E12"} `}>
                            <img src='/icon_setting.svg' className={`w-6 h-6 transition-ml ${appStore.showMenu ? "duration-500" : "duration-300"}`} />
                            <p className={`ml-5 overflow-hidden text-left 1279sc-max:hidden ${pathName.startsWith('/help') ? "font-p15-FFFFFF-w500" : "font-p15-FFFFFF-w400"} ${appStore.showMenu ? " transition-width duration-300 hidden" : " transition-width duration-300 w-40"}`} >{t('sidebar.11')}</p>
                        </button>

                    </Link>
                    <Link href={`/help`}>
                        <button className={`flex flex-row h-15 1280sc:pl-7.75 1279sc-max:justify-center w-full items-center ${pathName.startsWith('/help') ? "bg-nb-2F63AE" : "bg-transparent hover:bg-nb-0E0E12"} `}>
                            <img src='/icon_help.svg' className={`w-6 h-6 transition-ml ${appStore.showMenu ? "duration-500" : "duration-300"}`} />
                            <p className={`ml-5 overflow-hidden text-left 1279sc-max:hidden ${pathName.startsWith('/help') ? "font-p15-FFFFFF-w500" : "font-p15-FFFFFF-w400"}  ${appStore.showMenu ? " transition-width duration-300 hidden" : " transition-width duration-300 w-40"}`} >{t('sidebar.12')}</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default observer(Sidebar)


