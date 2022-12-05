import { observer } from "mobx-react";
import { useEffect, useRef, Fragment, useState } from "react";
import stores from "../../lib/stores/stores";
import IconButton from "../IconButton";
import { IconDropbox, IconFolderGoogleDrive, IconLarge, IconSave, IconSmall, PlayChosen, RemoveAdsHint, Small } from "../Svg";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, } from '@heroicons/react/20/solid'
const Index = observer(() => {
    const [isShowHint, setIsShowHint] = useState(false)
    const [showScreenMethod, setShowScreenMethod] = useState(0)
    const [htmlWidth, setHtmlWidth] = useState(0)
    var screenMode = [
        { name: `你的屏幕（` + stores.htmlconvertStore.browserWidth + `px）` },
        { name: "HD桌面版（1920px）" },
        { name: "桌面版屏幕（1440px）" },
        { name: "平板电脑版（768px）" },
        { name: "移动端（340px）" }
    ]
    const [screenMethod, setScreenMethod] = useState(screenMode)
    useEffect(() => {
        var oDiv = document.getElementById('moveGIF')
        oDiv.onmouseover = () => setIsShowHint(true)
        oDiv.onmouseout = () => setIsShowHint(false)
    }, [])

    const imageMethod = [
        { name: "JPG" },
        { name: "SVG" },
        { name: "PNG" }
    ]
    const [screen, setScreen] = useState(screenMethod[0])
    const [image, setImage] = useState(imageMethod[0])

    const [showSmall, setShowSmall] = useState(false)
    const [showImageSmall, setShowImageSmall] = useState(false)
    const handleRefvalue = (evt: any) => {
        switch (evt.name) {
            case '你的屏幕' + webkitURL:
                setShowScreenMethod(0);
                break;
            case 'HD桌面版（1920px）':
                setShowScreenMethod(1);
                break;
            case '桌面版屏幕（1440px）':
                setShowScreenMethod(2);
                break;
            case '平板电脑版（768px）':
                setShowScreenMethod(3);
                break;
            case '移动端（340px）':
                setShowScreenMethod(4);
                break;
            default:
                setShowScreenMethod(0);
        }
    }
    return (
        <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
            <div className="outer-container">
                <div className="inner-container  bg-nb-2E2F30">
                    <div className='flex-none relative w-72.5 1600sc:h-full  px-4.5  text-left'>
                        {/* 标题 */}
                        <p className='py-5.25 font-p24-FFFFFF-w600it'>HTML转图片</p>
                        {/* 水平线 */}
                        <div className='w-full h-0.25 bg-nb-222325' />
                        <div className="mt-8 flex flex-row justify-between w-full">
                            <p className='font-p13-CFD0E4-w400'>网站URL</p>
                            <div><Refresh /></div>
                        </div>
                        <input className='w-64 h-12 bg-html-logo bg-no-repeat bg-nb-sidebar-grey bg-left-2 font-p15-F9F9F9-w400 px-10 focus:outline-none rounded-xl mt-3' value={stores.htmlconvertStore.htmlData}
                            onChange={(e) => stores.htmlconvertStore.setHtmlData(e.target.value)}
                        />
                        {/* 水平线 */}
                        <div className='w-full h-0.25 bg-nb-222325 mt-5' />
                        <div className="w-full mt-6 relative ">
                            <p className="font-p13-CFD0E4-w400">屏幕大小</p>
                            <div className=" w-full  ">
                                <Listbox value={screen} onChange={setScreen} >
                                    <div className="relative w-full    ">
                                        <Listbox.Button className="flex justify-start items-center w-64 h-12 bg-no-repeat bg-nb-sidebar-grey bg-left-2 font-p15-F9F9F9-w400 px-2 focus:outline-none rounded-xl mt-3"
                                            onClick={() => setShowSmall(!showSmall)}>
                                            <span className="  block truncate">{screen.name}
                                                {/* {selected.name === '你的屏幕（2513px）' && '你的屏幕（2513px）'}
                                                {selected.name === 'HD桌面版（1920px）' && 'HD桌面版（1920px）'}
                                                {selected.name === '桌面版屏幕（1440px）' && '桌面版屏幕（1440px）'}
                                                {selected.name === '平板电脑版（768px）' && '平板电脑版（768px）'}
                                                {selected.name === '移动端（340px）' && '移动端（340px）'} */}
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <div className="w-full  mr-1">{showSmall ? <SmallTop /> : <Small aria-hidden="true" />}</div>
                                            </span>
                                        </Listbox.Button>
                                        <Listbox.Options className="absolute border border-black mt-1 shadow-md h-50 z-[10] w-full overflow-auto rounded-md bg-nb-373838 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {screenMethod.map((method, personIdx) => (
                                                <Listbox.Option
                                                    key={personIdx}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-3 pr-4 ${active ? 'bg-nb-121212 text-amber-900' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={method}
                                                    onClick={() => {
                                                        handleRefvalue(method)
                                                        setShowSmall(false)
                                                    }}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <div className={`flex flex-row `}>
                                                                <span
                                                                    className={`ml-2 block truncate font-p15-CFD0E4-w500 ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {method.name}
                                                                </span>
                                                            </div>
                                                            {
                                                                selected ?
                                                                    <span className="absolute inset-y-0 right-2  flex items-center pl-3 ">
                                                                        <CheckIcon className="h-5 w-5 text-safe " aria-hidden="true" />
                                                                    </span>
                                                                    : null
                                                            }
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </div>
                                </Listbox>
                            </div>
                        </div>
                        <div className="relative mt-10">
                            <p className="font-p13-CFD0E4-w400">转换为</p>
                            <Listbox value={image} onChange={setImage} >
                                <div className="relative w-full    ">
                                    <Listbox.Button className="flex justify-start items-center w-64 h-12 bg-no-repeat bg-nb-sidebar-grey bg-left-2 font-p15-F9F9F9-w400 px-2 focus:outline-none rounded-xl mt-3"
                                        onClick={() => setShowImageSmall(!showImageSmall)}>
                                        <span className="  block truncate">{image.name}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <div className="w-full  mr-1">{showImageSmall ? <SmallTop /> : <Small aria-hidden="true" />}</div>
                                        </span>
                                    </Listbox.Button>
                                    <Listbox.Options className="absolute border border-black shadow-md mt-1 h-30 z-[10] w-full overflow-auto rounded-md bg-nb-373838 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {imageMethod.map((method, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-3 pr-4 ${active ? 'bg-nb-121212 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={method}
                                                onClick={() => {
                                                    handleRefvalue(method)
                                                    setShowImageSmall(false)
                                                }}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <div className={`flex flex-row ${selected ? "bg-red-700" : ""}`}>
                                                            <span
                                                                className={`ml-2 block truncate font-p15-CFD0E4-w500 ${selected ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                            >
                                                                {method.name}
                                                            </span>
                                                        </div>
                                                        {
                                                            selected ?
                                                                <span className="absolute inset-y-0 right-2  flex items-center pl-3 ">
                                                                    <CheckIcon className="h-5 w-5 text-safe " aria-hidden="true" />
                                                                </span>
                                                                : null
                                                        }
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                        {/* 水平线 */}
                        <div className='w-full h-0.25 bg-nb-222325 mt-5' />
                        <p className="font-p13-CFD0E4-w400 mt-5">HTML设置</p>
                        <div className=" mt-3 flex flex-row justify-between w-full">
                            <p className="font-p13-CFD0E4-w400 ">尝试屏蔽广告</p>
                            {
                                stores.htmlconvertStore.isShield ?
                                    <button onClick={() => stores.htmlconvertStore.setIsShield(false)}><PlayChosen /></button>
                                    :
                                    <button className={`selectBorder w-5.5 h-5.5 rounded-full`} onClick={() => stores.htmlconvertStore.setIsShield(true)}></button>
                            }
                        </div>
                        <div className="flex flex-row items-center justify-between mt-3 w-full h-5">
                            <div className="flex flex-row">
                                <div className="font-p13-CFD0E4-w400 relative">移除覆盖的弹出窗口
                                    {isShowHint ? <div className="absolute z-[10]"><RemoveAdsHint /></div> : ""}
                                </div>
                                <div id="moveGIF" className="border border-4C90FE rounded-xl flex justify-center items-center w-4  h-4 ml-1 "><RemoveAdsI />
                                </div>
                            </div>
                            <div>
                                {
                                    stores.htmlconvertStore.isRemovePop ?
                                        <button onClick={() => stores.htmlconvertStore.setIsRemovePop(false)}><PlayChosen /></button>
                                        :
                                        <button className={`selectBorder w-5.5 h-5.5 rounded-full `} onClick={() => stores.htmlconvertStore.setIsRemovePop(true)}></button>
                                }
                            </div>
                        </div>
                        {/* 存储 */}
                        {stores.tailorStore.isCropper &&
                            <div className="mt-8">
                                {/* 水平线 */}
                                <div className='w-full h-0.25 bg-nb-222325' />
                                <div>
                                    <div className="py-5.25 flex items-center">
                                        <IconSave />
                                        <span className="ml-3 font-p15-E4E4E4-w400">存储</span>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <IconButton icon={<IconFolderGoogleDrive />} />
                                        <IconButton className='ml-5' icon={<IconDropbox />} />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="1599sc-max:h-60 w-full"></div>
                        {/* 预览图片 */}
                        <button className="absolute bottom-26 w-60.5 h-7.5 bg-nb-181818  font-p13-4C90FE-w700 left-1/2 -translate-x-1/2 rounded-4.5 ">
                            <div className="absolute left-15 top-1.5"><Chakan /></div>
                            预览图片
                        </button>
                        {/* 调整按钮 */}
                        <button
                            onClick={() => {
                                if (stores.tailorStore.isCropper) {
                                    const link = document.createElement('a')
                                    link.style.display = 'none'
                                    link.href = URL.createObjectURL(stores.tailorStore.cropperImgData)
                                    link.setAttribute(
                                        'download', ''
                                    )
                                    document.body.appendChild(link)
                                    link.click()
                                } else {
                                    stores.tailorStore.setCropperImgData(
                                        stores.tailorStore.cropper.getCroppedCanvas({
                                            imageSmoothingQuality: 'high'
                                        }).toDataURL(stores.tailorStore.imgData.type)
                                    )

                                    stores.tailorStore.cropper.destroy();
                                    stores.tailorStore.onChangeIsCropper(true);
                                }

                            }}
                            className="absolute bottom-9 left-1/2 -translate-x-1/2 w-60.5 h-14.5 rounded-4.5 font-p20-FFFFFF-w700 hover:opacity-90 bg-nb-2F63AE">
                            转换图片
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})
const SmallTop = () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 7L4 1L0 7L8 7Z" fill="#CFD0E4" />
    </svg>
)
const Chakan = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.4985 7.85582C17.0542 6.99301 16.4869 6.19935 15.8143 5.49975C14.9285 4.58881 13.8691 3.86472 12.6987 3.37028C11.5282 2.87584 10.2706 2.62109 8.99998 2.62109C7.7294 2.62109 6.47171 2.87584 5.30129 3.37028C4.13086 3.86472 3.07145 4.58881 2.18569 5.49975C1.51308 6.19935 0.945719 6.99301 0.501404 7.85582C0.320784 8.21021 0.226624 8.60233 0.226624 9.0001C0.226624 9.39787 0.320784 9.78999 0.501404 10.1444C0.945719 11.0072 1.51308 11.8008 2.18569 12.5005C3.07145 13.4114 4.13086 14.1355 5.30129 14.6299C6.47171 15.1244 7.7294 15.3791 8.99998 15.3791C10.2706 15.3791 11.5282 15.1244 12.6987 14.6299C13.8691 14.1355 14.9285 13.4114 15.8143 12.5005C16.4869 11.8008 17.0542 11.0072 17.4985 10.1444C17.6792 9.78999 17.7733 9.39787 17.7733 9.0001C17.7733 8.60233 17.6792 8.21021 17.4985 7.85582ZM8.99998 11.893C8.42782 11.893 7.86852 11.7233 7.39279 11.4054C6.91706 11.0876 6.54628 10.6358 6.32732 10.1072C6.10837 9.57855 6.05108 8.99689 6.1627 8.43573C6.27432 7.87457 6.54984 7.35912 6.95442 6.95454C7.35899 6.54997 7.87445 6.27445 8.43561 6.16283C8.99677 6.05121 9.57842 6.1085 10.107 6.32745C10.6356 6.5464 11.0874 6.91719 11.4053 7.39292C11.7232 7.86864 11.8928 8.42795 11.8928 9.0001C11.8928 9.76734 11.588 10.5031 11.0455 11.0457C10.503 11.5882 9.76721 11.893 8.99998 11.893Z" fill="#4C90FE" />
    </svg>
)
const RemoveAdsI = () => (
    <svg width="4" height="10" viewBox="0 0 4 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.92425 8.71048C2.6524 9.0367 2.3126 9.1998 1.90483 9.1998C1.49706 9.1998 1.17538 9.0956 0.939781 8.88718C0.713244 8.67877 0.599976 8.40692 0.599976 8.07165C0.599976 7.95385 0.672468 7.46 0.817451 6.5901L1.266 4.15709H0.695121L0.722306 3.91243H1.30677C1.97732 3.91243 2.47117 3.88524 2.78833 3.83087L2.97862 3.7901L2.04075 8.92796C2.3126 8.90078 2.53913 8.77391 2.72036 8.54738L2.92425 8.71048ZM1.72813 2.48524C1.53784 2.29495 1.44269 2.06388 1.44269 1.79204C1.44269 1.52019 1.53784 1.28913 1.72813 1.09883C1.91842 0.899481 2.14949 0.799805 2.42133 0.799805C2.69318 0.799805 2.92425 0.899481 3.11454 1.09883C3.31389 1.28913 3.41357 1.52019 3.41357 1.79204C3.41357 2.06388 3.31389 2.29495 3.11454 2.48524C2.92425 2.67553 2.69318 2.77068 2.42133 2.77068C2.14949 2.77068 1.91842 2.67553 1.72813 2.48524Z" fill="#4C90FE" />
    </svg>
)
const Refresh = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="22" height="22" rx="6" fill="#2F63AE" />
        <path d="M18.5 10.9988C18.5 9.29698 17.9304 7.72695 16.97 6.46528C16.7534 6.18046 16.3344 6.15457 16.0802 6.40879C15.8707 6.61828 15.8472 6.95018 16.0284 7.18556C16.8335 8.2448 17.3137 9.56767 17.3137 10.9965C17.3137 14.2919 14.7738 17.0082 11.5514 17.2883C11.243 17.3142 10.9982 17.2836 10.9982 17.2836L10.9865 15.8007L7.39918 17.6014C7.39918 17.7568 11.0006 20 11.0006 20L11.0006 18.4982C11.3913 18.5053 11.5702 18.4794 11.6455 18.4723C15.48 18.1428 18.4976 14.9157 18.5 10.9988ZM4.68282 10.9988C4.68282 7.5151 7.51687 4.68341 10.9982 4.68341L11.0053 4.68341L11.0218 6.18282L14.5996 4.40094L11.0006 2L11.0006 3.49941C6.79188 3.49706 3.49647 7.07729 3.49647 10.9988C3.49647 12.7642 4.11083 14.3907 5.13476 15.6736C5.35602 15.949 5.76795 15.9702 6.01746 15.7207C6.23166 15.5065 6.25049 15.1675 6.06218 14.9321C5.19831 13.8517 4.68282 12.4841 4.68282 10.9988Z" fill="white" />
    </svg>
)
export default Index;