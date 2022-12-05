import { ChoicePercentage1, ChoicePercentage2, ChoicePixel1, ChoicePixel2, IconAdd, IconDesktop, IconDropbox, IconFolderGoogleDrive, PixelAdd, PixleReduce, SaveSvg, SaveToGoogleDrive } from "../Svg";
import stores from "../../lib/stores/stores";
import { NBString } from "../../lib/util/tools";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Circle } from 'rc-progress';
import { Tab } from '@headlessui/react'
import Dropzone from 'react-dropzone';
import { toJS } from "mobx";
const Index = observer(() => {
    const [multiple, setMultiple] = useState(1) //1：25% 2：50% 3:75%
    const categories = [
        {
            id: 0,
            name: "缩小25%"
        },
        {
            id: 1,
            name: "缩小50%"
        },
        {
            id: 2,
            name: "缩小75%"
        }
    ]
    const [choiceMode, setchoiceMode] = useState(true)  //true像素,false百分比
    const [lock, setLock] = useState(false)  //锁的提示信息
    const [saveGoogleDrive, setSaveGoogleDrive] = useState(false)
    const setImageWH = (files, widths, heights, multiple) => {
        stores.adjustStore.onChangeStartAdjust(true)
        for (let i = 0; i < files.length; i++) {
            NBString.setImgWidHeigth(files[i], widths[i], heights[i], multiple).then(data => {
                if (data == 'err') {
                    alert('转换失败，请返回重新添加图片')
                    setTimeout(()=>{
                        location.reload()
                    },1000)
                }
                let fileInfo = new FormData()
                if (data) {
                    fileInfo.append('file', data)
                    fileInfo.append('fileType', 'policy')
                }
                // console.log("fileInfo",fileInfo)
                stores.adjustStore.adjustUpload(fileInfo, i)
                stores.adjustStore.setImgListAdjustData(data, i)
            })
        }
    }
    useEffect(() => {
        for (let i = 0; i < stores.adjustStore.imgListAdjustData.length; i++) {
            stores.adjustStore.imgListAdjustData[i].lock = true
            stores.adjustStore.imgListAdjustData[i].lockHint = false
        }
    }, [])
    return (
        <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
            <div className="relative outer-container bg-nb-2E2F30">
                <div className="inner-container ">
                    <div className='relative flex-none  w-72.5  px-4.5 h-full text-left '>
                        {/* 标题 */}
                        <div className="">
                            <p className="py-5.25 font-p24-FFFFFF-w600it py-5.25">{stores.adjustStore.process.length != 0 ? `图片尺寸调整完成！` : stores.adjustStore.isStartAdjust ? "正在调整图片尺寸…" : "调整尺寸的选项"}</p>
                            <p className="font-p14-CFD0E4-w400 pr-7">{stores.adjustStore.process.length != 0 ? `所有图片尺寸调整完成，同时保持最佳质量和大小比例！` : stores.adjustStore.isStartAdjust ? "正在调整您的图片尺寸，可能需要一些时间，请您耐心等待，请勿退出。" : ""}</p>
                        </div>
                        {/* 选择调整方式 */}
                        {
                            stores.adjustStore.process.length != 0 ?
                                <>
                                    <div className="relative">
                                        <div className='flex items-center cursor-pointer py-5.25'>
                                            <div><SaveSvg /></div>

                                            <p className='font-p15-E4E4E4-w400 ml-3'>存储</p>
                                        </div>
                                        {/* 按钮 */}
                                        <div className="flex flex-row w-full justify-start ">
                                            <button className="w-10.5 h-10.5  flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all"
                                                onMouseEnter={() => setSaveGoogleDrive(true)} onMouseLeave={() => setSaveGoogleDrive(false)}>
                                                <IconFolderGoogleDrive />
                                            </button>
                                            <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                                <IconDropbox />
                                            </button>
                                        </div>
                                        <div className="absolute top-27 left-1 ">
                                            {saveGoogleDrive ? <SaveToGoogleDrive /> : ""}
                                        </div>
                                    </div>
                                    {/* 水平线 */}
                                    <div className='w-full h-0.25  bg-nb-222325 mt-4' />
                                </>
                                :
                                stores.adjustStore.isStartAdjust ?
                                    <>
                                        <div>
                                            <div className='flex items-center cursor-pointer py-5.25'>
                                                <div><SaveSvg /></div>
                                                <p className='font-p15-E4E4E4-w400 ml-3'>存储</p>
                                            </div>
                                            {/* 按钮 */}
                                            <div className="flex flex-row w-full justify-start ">
                                                <div className="w-10.5 h-10.5  flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all opacity-50">
                                                    <IconFolderGoogleDrive />
                                                </div>
                                                <div className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all opacity-50">
                                                    <IconDropbox />
                                                </div>
                                            </div>
                                        </div>
                                        {/* 水平线 */}
                                        <div className='w-full h-0.25  bg-nb-222325 mt-4' />
                                    </>
                                    :
                                    <>
                                        <div className="flex flex-row  w-72.5 mt-4 ">
                                            <div className={`flex flex-row items-center ${choiceMode ? "font-p18-FFFFFF-w500" : "font-p15-A2A3BA-w400"} space-x-2 cursor-default`}
                                                onClick={() => setchoiceMode(true)}>
                                                {choiceMode ? <div ><ChoicePixel1 /></div> : <div> <ChoicePixel2 /></div>}
                                                <p>按像素</p></div>
                                            <div className={`flex flex-row items-center  ${!choiceMode ? "font-p18-FFFFFF-w500" : "font-p15-A2A3BA-w400"}  font-p15-A2A3BA-w400 space-x-2 ml-14 cursor-default`}
                                                onClick={() => setchoiceMode(false)}>{choiceMode ? <div><ChoicePercentage2 /></div> : <div> <ChoicePercentage1 /></div>}
                                                <p>按百分比</p></div>
                                        </div>
                                        {/* 选择框条 */}
                                        <div className={`w-26 h-1 mt-1 bg-nb-4C90FE ${choiceMode ? "" : "ml-40"}`} />
                                        {/* 水平线 */}
                                        <div className='w-full h-0.25  bg-nb-222325' />
                                        {
                                            choiceMode ?
                                                "" :
                                                <>
                                                    <div className="w-full relative  ">
                                                        <div className="w-72.5 max-w-md  py-3 absolute   -left-4.25  ">
                                                            <Tab.Group
                                                                onChange={(indexs) => setMultiple(indexs + 1)}
                                                            >
                                                                <Tab.List className="flex flex-col  w-72.5 ">
                                                                    {categories.map((category, index) => {
                                                                        return (
                                                                            <>
                                                                                <Tab  >
                                                                                    {({ selected }) => (
                                                                                        <div className={`${selected ? 'bg-nb-222325 ' : ''} flex flex-row justify-between items-center w-full  h-12 '`} >
                                                                                            <p className="ml-4 font-p16-FFFFFF-w600">{category.name}</p>
                                                                                            <div className="mr-5">{selected ? <SelectMult /> : ""}</div>
                                                                                        </div>

                                                                                    )}
                                                                                </Tab>
                                                                            </>
                                                                        )
                                                                    }
                                                                    )}
                                                                </Tab.List>

                                                            </Tab.Group>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                        {/* 图片列表 */}
                                        {choiceMode ? <p className="mt-5 font-p13-FFFFFF-w400">把所有图片的尺寸调整为以下精确尺寸 ：</p> : ""}
                                    </>
                        }
                        <ul>
                            {stores.adjustStore.imgListAdjustData.map((item, idx) => {
                                return (<>
                                    {stores.adjustStore.process.length != 0 ?
                                        <li key={item.name + idx} className='h-14 w-full flex flex-row items-center mt-4'>
                                            <p className='font-p13-FFFFFF-w400 w-2.75'>{idx + 1}.</p>
                                            <div className='w-9 h-9 bg-nb-222325 ml-2'>
                                                <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                                            </div>
                                            <div className='ml-2.5 flex flex-col w-full '>
                                                <p className='font-p12-FFFFFF-w400'>{NBString.truncateString(item.name, 18, 6)}</p>
                                                {
                                                    item.imgURL != undefined ?
                                                        <div className="mt-1 flex flex-row items-center justify-between">
                                                            <p className="font-p13-5FE483-w400">完成</p>
                                                            <a href={item.imgURL} download id={`download${idx}`} className="font-p13-4C90FE-w400 underline">下载</a>
                                                        </div>
                                                        :
                                                        <>
                                                            {
                                                                stores.adjustStore.isStartAdjust ?
                                                                    <div className='w-4 h-4 mt-1'>
                                                                        <Circle strokeWidth={6} percent={item.process} />
                                                                    </div>
                                                                    :
                                                                    <p className='font-p13-A2A3BA-w400 mt-1'>
                                                                        等待中
                                                                    </p>
                                                            }
                                                        </>
                                                }
                                            </div>
                                        </li>
                                        :
                                        stores.adjustStore.isStartAdjust ?
                                            <li key={item.name + idx} className='h-14 w-full flex flex-row items-center mt-4'>
                                                <p className='font-p13-FFFFFF-w400 w-2.75'>{idx + 1}.</p>
                                                <div className='w-9 h-9 bg-nb-222325 ml-2'>
                                                    <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                                                </div>
                                                <div className='ml-2.5 flex flex-col w-full '>
                                                    <p className='font-p12-FFFFFF-w400'>{NBString.truncateString(item.name, 18, 6)}</p>
                                                    {
                                                        item.imgURL != undefined ?
                                                            <div className="mt-1 flex flex-row items-center justify-between">
                                                                <p className="font-p13-5FE483-w400">完成</p>
                                                                <a href={item.imgURL} download id={`download${idx}`} className="font-p13-4C90FE-w400 underline">下载</a>
                                                            </div>
                                                            :
                                                            <>
                                                                {
                                                                    stores.adjustStore.isStartAdjust ?
                                                                        <div className='w-4 h-4 mt-1'>
                                                                            <Circle strokeWidth={6} percent={item.process} />
                                                                        </div>
                                                                        :
                                                                        <p className='font-p13-A2A3BA-w400 mt-1'>
                                                                            等待中
                                                                        </p>
                                                                }
                                                            </>
                                                    }
                                                </div>
                                            </li>
                                            :
                                            <li key={item.name + idx} className='h-14 w-full mt-4'>
                                                {
                                                    choiceMode ?
                                                        <>
                                                            <p className='font-p13-FFFFFF-w400 w-2.75'>{idx + 1}.</p>
                                                            <div className="w-full relative ">
                                                                <div className="flex flex-row space-x-30 font-p13-A2A3BA-w400">
                                                                    <p>宽度</p>
                                                                    <p>高度</p>
                                                                </div>
                                                                <div className="flex flex-row justify-around space-x-3 items-center w-full h-7 mt-2 ">
                                                                    <div className="flex flex-row items-center  justify-center w-30 rounded-lg bg-nb-464546 h-7 ">
                                                                        <input className="w-16 bg-nb-464546 rounded-lg px-1 focus:outline-none font-p13-A2A3BA-w400"
                                                                            type="text" value={stores.adjustStore.dimensionsWidth[idx]}
                                                                            onChange={(e) => {
                                                                                stores.adjustStore.adjustWidth(idx, e.target.value)
                                                                            }}
                                                                        />
                                                                        <span className="font-p13-CFD0E4-w400 mb-1 mr-1">px</span>
                                                                        <div className="flex flex-col ">
                                                                            <button className=" w-2.5 cursor-default"
                                                                                onClick={() => stores.adjustStore.addWidth(idx)}
                                                                            ><PixelAdd /></button>
                                                                            <button className=" w-2.5 cursor-default"
                                                                                onClick={() => stores.adjustStore.subtractWidth(idx)}
                                                                            ><PixleReduce /></button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-5 flex justify-center itmens-center ">
                                                                        <button className=" cursor-default " id={idx.toString()} onMouseEnter={() => {
                                                                            stores.adjustStore.setLockHint(true, idx)
                                                                            setLock(!lock)
                                                                        }} onMouseLeave={() => {
                                                                            stores.adjustStore.setLockHint(false, idx)
                                                                            setLock(!lock)
                                                                        }}
                                                                            onClick={() => {
                                                                                stores.adjustStore.setAdjustLock(!item.lock, idx)
                                                                                setLock(!lock)
                                                                            }}
                                                                        >{item.lock ? <AdjustLock /> : <AdjustUnlock />}</button>
                                                                        <div className="absolute top-14 left-28 z-[10]">{item.lockHint ? <AspectRatio /> : ""}</div>
                                                                    </div>
                                                                    <div className="flex flex-row items-center  justify-center w-30 rounded-lg bg-nb-464546 h-7 ">
                                                                        <input className="w-16 bg-nb-464546 rounded-lg px-1 focus:outline-none font-p13-A2A3BA-w400"
                                                                            type="text" value={stores.adjustStore.dimensionsHeight[idx]}
                                                                            onChange={(e) => stores.adjustStore.adjustHeight(idx, e.target.value)}
                                                                        />
                                                                        <span className="font-p13-CFD0E4-w400 mb-1 mr-1">px</span>
                                                                        <div className="flex flex-col ">
                                                                            <button className=" w-2.5 cursor-default"
                                                                                onClick={() => stores.adjustStore.addHeight(idx)}
                                                                            ><PixelAdd /></button>
                                                                            <button className=" w-2.5 cursor-default"
                                                                                onClick={() => stores.adjustStore.subtractHeight(idx)}
                                                                            ><PixleReduce /></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        ""
                                                }

                                            </li>
                                    }
                                </>
                                )
                            })}
                        </ul>

                        {/* 压缩按钮 */}
                        <button className={`fixed bottom-9 w-60.5 h-14.5  rounded-4.5 font-p20-FFFFFF-w700  ${stores.adjustStore.adjustButton ? " cursor-not-allowed" : " hover:opacity-90"} 
                        ${stores.adjustStore.isStartAdjust ? "bg-nb-191919" : "bg-nb-2F63AE"}
                        `}
                            onClick={() => {
                                if (stores.adjustStore.process.length != 0) {
                                    for (let i = 0; i < stores.adjustStore.imgURL.length; i++) {
                                        const link = document.createElement('a')
                                        link.style.display = 'none'
                                        console.log(stores.adjustStore.imgURL[i])
                                        link.href = stores.adjustStore.imgURL[i]
                                        link.setAttribute(
                                            'download', ''
                                        )
                                        document.body.appendChild(link)
                                        link.click()
                                    }
                                } else {
                                    if (!stores.adjustStore.adjustButton) {
                                        if (choiceMode) {
                                            setImageWH(stores.adjustStore.imgListData, stores.adjustStore.dimensionsWidth, stores.adjustStore.dimensionsHeight, 0)
                                        } else {
                                            setImageWH(stores.adjustStore.imgListData, 0, 0, multiple)
                                        }
                                    } else {
                                        return
                                    }
                                }
                            }}
                        >
                            <span>{stores.adjustStore.process.length ==stores.adjustStore.imgListAdjustData.length ? `下载全部图像（${stores.adjustStore.process.length}）` : stores.adjustStore.isStartAdjust ? "加载中..." : "调整多个图像大小"}</span>
                        </button>
                        <canvas id="canvasImg" className="hidden">

                        </canvas>
                    </div>
                </div>
            </div>
        </div>
    )
})


const AdjustLock = () => (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33957 6.4034H4.69786V4.38217C4.69786 3.66879 4.90374 3.11677 5.31551 2.72611C5.72727 2.33546 6.27005 2.14013 6.94385 2.14013C7.69251 2.14013 8.2852 2.33546 8.72192 2.72611C9.15865 3.11677 9.37701 3.66879 9.37701 4.38217V6.4034H11.6417V3.90658C11.6417 3.36306 11.5138 2.85633 11.258 2.38641C11.0022 1.91649 10.6591 1.50318 10.2286 1.1465C9.79813 0.789809 9.30526 0.509554 8.75 0.305732C8.19474 0.101911 7.61765 0 7.01872 0C6.34492 0 5.72415 0.101911 5.15642 0.305732C4.58868 0.509554 4.09581 0.789809 3.67781 1.1465C3.2598 1.50318 2.93226 1.91649 2.69519 2.38641C2.45811 2.85633 2.33957 3.36306 2.33957 3.90658V6.4034ZM13.635 7.75372C13.3917 7.53291 13.1016 7.42251 12.7647 7.42251H11.6417H9.37701H4.69786H2.33957H1.21658C0.879679 7.42251 0.592692 7.53291 0.355615 7.75372C0.118538 7.97452 0 8.23779 0 8.54352V13.9278C0 14.2109 0.0530303 14.477 0.159091 14.7261C0.265152 14.9752 0.414884 15.1932 0.608289 15.38C0.801693 15.5669 1.03565 15.7169 1.31016 15.8301C1.58467 15.9434 1.89037 16 2.22727 16H11.6791C12.016 16 12.3249 15.9434 12.6056 15.8301C12.8864 15.7169 13.1297 15.5612 13.3356 15.3631C13.5414 15.1649 13.7037 14.9328 13.8222 14.6667C13.9407 14.4006 14 14.1146 14 13.8089V8.54352C14 8.23779 13.8783 7.97452 13.635 7.75372Z" fill="#CFD0E4" />
    </svg>
)
const AdjustUnlock = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.33957 6.4034H8.69786V4.38217C8.69786 3.66879 8.90374 3.11677 9.31551 2.72611C9.72727 2.33546 10.2701 2.14013 10.9439 2.14013C11.6925 2.14013 12.2852 2.33546 12.7219 2.72611C13.1586 3.11677 13.377 3.66879 13.377 4.38217V6.4034H15.6417V3.90658C15.6417 3.36306 15.5138 2.85633 15.258 2.38641C15.0022 1.91649 14.6591 1.50318 14.2286 1.1465C13.7981 0.789809 13.3053 0.509554 12.75 0.305732C12.1947 0.101911 11.6176 0 11.0187 0C10.3449 0 9.72415 0.101911 9.15642 0.305732C8.58868 0.509554 8.09581 0.789809 7.67781 1.1465C7.2598 1.50318 6.93226 1.91649 6.69519 2.38641C6.45811 2.85633 6.33957 3.36306 6.33957 3.90658V6.4034ZM11.6872 7.75372C11.4786 7.53291 11.2299 7.42251 10.9412 7.42251H9.97861H8.03743H4.02674H2.00535H1.04278C0.754011 7.42251 0.508021 7.53291 0.304813 7.75372C0.101604 7.97452 0 8.23779 0 8.54352V13.9278C0 14.2109 0.0454545 14.477 0.136364 14.7261C0.227273 14.9752 0.355615 15.1932 0.52139 15.38C0.687166 15.5669 0.887701 15.7169 1.12299 15.8301C1.35829 15.9434 1.62032 16 1.90909 16H10.0107C10.2995 16 10.5642 15.9434 10.8048 15.8301C11.0455 15.7169 11.254 15.5612 11.4305 15.3631C11.607 15.1649 11.746 14.9328 11.8476 14.6667C11.9492 14.4006 12 14.1146 12 13.8089V8.54352C12 8.23779 11.8957 7.97452 11.6872 7.75372Z" fill="#CFD0E4" />
    </svg>
)
const SelectMult = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="11" fill="#2F63AE" />
        <path d="M6.02905 11.0784L10.141 15.3413L16.0291 7.34131" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)
const AspectRatio = () => (
    <svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2_482)">
            <g filter="url(#filter0_b_2_482)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.9323C0 7.6054 2.68678 4.90841 6.0011 4.90841H9.9304L13.4642 0.711754C14.2669 -0.241595 15.7325 -0.236456 16.5286 0.722497L20.0037 4.90841H123.999C127.313 4.90841 130 7.6054 130 10.9323V21.9761C130 25.303 127.313 28 123.999 28H6.0011C2.68678 28 0 25.303 0 21.9761V10.9323Z" fill="black" fill-opacity="0.5" />
            </g>
            <path d="M17.358 14.056V22.134H18.422V14.056H17.358ZM13.27 16.114V17.08H22.356V16.114H13.27ZM18.716 16.492L17.904 16.8C18.828 18.662 20.452 20.552 21.978 21.532C22.16 21.28 22.496 20.902 22.72 20.706C21.194 19.866 19.556 18.172 18.716 16.492ZM17.12 16.422C16.238 18.13 14.516 19.866 12.878 20.678C13.102 20.888 13.424 21.252 13.606 21.504C15.272 20.538 17.008 18.662 17.946 16.73L17.12 16.422ZM15.314 10.85H20.536V13.412H15.314V10.85ZM14.32 9.912V14.364H21.572V9.912H14.32ZM12.864 9.282C12.052 11.41 10.708 13.496 9.308 14.826C9.504 15.078 9.798 15.624 9.91 15.862C11.436 14.308 12.906 11.956 13.858 9.59L12.864 9.282ZM11.408 12.894V22.092H12.416V11.914L12.402 11.9L11.408 12.894ZM28.782 11.06V12.026H35.768V11.06H28.782ZM28.222 16.324V17.304H36.342V16.324H28.222ZM28.054 13.804V14.77H36.44V13.804H28.054ZM31.764 9.31V14.308H32.758V9.31H31.764ZM33.612 14.56V20.846C33.612 21.042 33.556 21.098 33.332 21.112C33.122 21.126 32.394 21.126 31.61 21.098C31.736 21.392 31.876 21.812 31.918 22.106C32.968 22.106 33.654 22.106 34.06 21.938C34.48 21.784 34.62 21.49 34.62 20.86V14.56H33.612ZM29.258 18.158C29.874 18.914 30.546 19.964 30.798 20.65L31.68 20.104C31.386 19.432 30.686 18.424 30.07 17.682L29.258 18.158ZM23.378 16.688L23.658 17.71C24.848 17.318 26.416 16.814 27.886 16.324L27.746 15.358C26.136 15.876 24.484 16.38 23.378 16.688ZM23.574 12.068V13.048H27.844V12.068H23.574ZM25.38 9.254V20.86C25.38 21.056 25.31 21.112 25.142 21.112C24.974 21.126 24.442 21.126 23.826 21.098C23.966 21.392 24.092 21.826 24.134 22.078C25.016 22.092 25.562 22.05 25.884 21.896C26.234 21.728 26.374 21.434 26.374 20.86V9.254H25.38ZM38.162 9.856V22.134H39.184V10.822H48.774V22.134H49.824V9.856H38.162ZM38.764 20.594V21.532H49.39V20.594H38.764ZM42.236 17.108C43.37 17.346 44.798 17.836 45.568 18.214L46.016 17.514C45.232 17.15 43.804 16.688 42.684 16.464L42.236 17.108ZM42.796 11.102C42.082 12.236 40.878 13.328 39.688 14.042C39.898 14.196 40.262 14.504 40.416 14.672C41.592 13.888 42.866 12.684 43.664 11.396L42.796 11.102ZM46.534 12.208V12.362C45.33 14.238 42.18 15.624 39.436 16.156C39.618 16.352 39.828 16.772 39.926 17.024C42.768 16.366 46.03 14.84 47.472 12.53L46.884 12.166L46.716 12.208H46.534ZM42.18 12.978L41.396 13.342C42.782 15.022 45.372 16.31 47.934 16.856C48.06 16.604 48.326 16.254 48.522 16.058C45.974 15.596 43.412 14.462 42.18 12.978ZM42.474 12.208L41.914 13.034H46.842V12.208H42.474ZM40.85 18.886C42.782 19.124 45.204 19.684 46.534 20.16L47.01 19.376C45.638 18.914 43.23 18.382 41.34 18.158L40.85 18.886ZM54.066 12.866V13.958H63.642V12.866H54.066ZM58.588 9.268V13.37H59.694V9.268H58.588ZM53.506 9.604V14.28C53.506 16.758 53.31 19.348 51.532 21.336C51.784 21.518 52.176 21.91 52.344 22.148C54.36 19.95 54.598 17.066 54.598 14.28V9.604H53.506ZM54.024 16.184V17.276H60.338V22.134H61.472V16.184H54.024ZM71.44 12.446V16.114H72.518V12.446H71.44ZM67.044 13.412V14.308H77.04V13.412H67.044ZM65.658 15.554V16.478H78.37V15.554H65.658ZM66.106 17.71V18.634H78.006V17.71H66.106ZM74.296 16.296V20.874C74.296 21.07 74.24 21.126 73.988 21.126C73.722 21.154 72.896 21.154 71.944 21.126C72.098 21.406 72.28 21.812 72.336 22.12C73.498 22.12 74.282 22.106 74.744 21.952C75.234 21.784 75.374 21.504 75.374 20.888V16.296H74.296ZM67.282 10.43V11.312H71.832V10.43H67.282ZM72.686 10.43V11.312H78.23V10.43H72.686ZM67.59 9.184C67.128 10.416 66.344 11.648 65.448 12.46C65.7 12.6 66.134 12.894 66.33 13.048C67.198 12.18 68.052 10.822 68.598 9.45L67.59 9.184ZM73.092 9.184C72.686 10.36 71.93 11.494 71.048 12.222C71.286 12.362 71.72 12.656 71.916 12.824C72.784 12.012 73.624 10.752 74.1 9.422L73.092 9.184ZM68.122 11.102C68.43 11.676 68.738 12.432 68.836 12.908L69.774 12.572C69.648 12.096 69.312 11.354 69.004 10.794L68.122 11.102ZM73.946 11.102C74.408 11.69 74.912 12.474 75.108 12.978L76.004 12.6C75.794 12.082 75.262 11.312 74.8 10.766L73.946 11.102ZM68.122 19.25C69.032 19.852 70.04 20.748 70.488 21.406L71.3 20.734C70.824 20.076 69.788 19.208 68.892 18.648L68.122 19.25ZM82.024 13.566V14.602H85.65V13.566H82.024ZM81.408 9.324V21L82.486 20.734V9.324H81.408ZM79.532 20.734L79.868 21.812C81.604 21.406 83.97 20.846 86.196 20.3L86.084 19.292C83.732 19.838 81.212 20.412 79.532 20.734ZM91.236 12.306C90.228 13.104 88.52 14.042 86.994 14.686C87.134 14.91 87.302 15.274 87.372 15.526C88.954 14.854 90.732 14.028 92.02 13.188L91.236 12.306ZM86.7 9.324V19.894C86.7 21.42 87.064 21.826 88.45 21.826C88.716 21.826 90.508 21.826 90.802 21.826C92.132 21.826 92.412 21.028 92.552 18.746C92.258 18.676 91.824 18.48 91.558 18.284C91.474 20.314 91.39 20.832 90.732 20.832C90.34 20.832 88.856 20.832 88.548 20.832C87.89 20.832 87.764 20.692 87.764 19.908V9.324H86.7ZM93.966 18.452C93.966 18.256 94.638 17.948 94.638 17.948V17.934C95.842 16.562 97.06 14.672 98.04 12.796L97.2 12.32C96.36 14.168 95.044 16.142 94.624 16.632C94.232 17.15 93.924 17.5 93.644 17.542C93.756 17.794 93.91 18.256 93.966 18.452ZM93.966 18.452C94.204 18.298 94.624 18.158 97.452 17.444C97.424 17.234 97.396 16.87 97.41 16.59L94.344 17.276L93.896 17.626L93.966 18.452ZM93.868 15.092C93.868 14.882 94.484 14.56 94.484 14.56V14.532C95.45 13.258 96.388 11.452 97.102 9.716L96.178 9.296C95.618 10.976 94.624 12.796 94.33 13.272C94.022 13.748 93.798 14.084 93.546 14.14C93.672 14.406 93.812 14.882 93.868 15.092ZM93.868 15.092C94.106 14.98 94.484 14.896 96.682 14.644C96.682 14.434 96.71 14.056 96.766 13.79L94.344 14.014L93.854 14.322L93.868 15.092ZM93.616 20.258L93.868 21.252C95.03 20.818 96.542 20.216 97.984 19.656L97.802 18.788C96.248 19.348 94.68 19.922 93.616 20.258ZM102.8 13.37C102.716 14.084 102.492 15.134 102.31 15.792L103.178 15.988C103.388 15.358 103.626 14.42 103.85 13.566L102.8 13.37ZM98.166 10.598V12.88H99.118V11.494H105.306V12.684H106.3V10.598H98.166ZM99.608 12.446C99.244 13.93 98.446 15.764 97.41 16.926C97.578 17.094 97.844 17.43 97.956 17.626C99.132 16.352 100.028 14.378 100.532 12.67L99.608 12.446ZM100.658 13.062V13.93H106.104V13.062H100.658ZM101.302 17.92V18.76H105.39V17.92H101.302ZM100.854 15.358V22.106H101.764V16.212H104.956V22.036H105.908V15.358H100.854ZM98.852 15.26V22.12H99.762V14.448L99.706 14.406L98.852 15.26ZM101.246 9.506C101.54 10.01 101.876 10.696 102.03 11.116L102.954 10.766C102.8 10.346 102.45 9.688 102.128 9.198L101.246 9.506ZM101.33 20.608V21.462H105.39V20.608H101.33ZM107.602 11.508V12.502H113.832V11.508H107.602ZM109.87 14.364V15.33H112.558V14.364H109.87ZM110.164 9.268V11.984H111.2V9.268H110.164ZM112.194 14.364V14.574C112.11 19.068 111.998 20.622 111.76 20.958C111.648 21.112 111.522 21.154 111.326 21.14C111.102 21.14 110.584 21.14 109.996 21.098C110.15 21.364 110.248 21.77 110.276 22.064C110.864 22.092 111.466 22.092 111.802 22.064C112.18 22.008 112.404 21.91 112.628 21.602C113.006 21.112 113.09 19.516 113.188 14.84C113.202 14.7 113.202 14.364 113.202 14.364H112.194ZM115.148 11.858V12.838H120.468V11.858H115.148ZM115.47 9.24C115.064 11.648 114.336 14 113.216 15.484C113.468 15.638 113.93 15.988 114.112 16.17C115.26 14.546 116.072 12.04 116.548 9.394L115.47 9.24ZM118.452 12.39C117.808 16.87 116.324 19.684 112.866 21.238C113.076 21.462 113.384 21.924 113.482 22.162C117.122 20.356 118.718 17.374 119.488 12.502L118.452 12.39ZM115.554 12.754L114.644 12.922C115.414 17.178 116.87 20.552 119.824 22.092C119.978 21.812 120.314 21.406 120.566 21.196C117.724 19.866 116.24 16.632 115.554 12.754ZM109.268 11.998V15.414C109.268 17.388 109.058 19.614 107.336 21.434C107.602 21.616 107.938 21.896 108.12 22.106C109.982 20.132 110.262 17.738 110.262 15.414V11.998H109.268Z" fill="white" />
        </g>
        <defs>
            <filter id="filter0_b_2_482" x="-2.71828" y="-2.71828" width="135.437" height="33.4366" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.35914" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2_482" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2_482" result="shape" />
            </filter>
            <clipPath id="clip0_2_482">
                <rect width="130" height="28" fill="white" />
            </clipPath>
        </defs>
    </svg>
)
export default Index;