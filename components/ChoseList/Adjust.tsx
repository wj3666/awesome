import { ChoicePercentage1, ChoicePercentage2, ChoicePixel1, ChoicePixel2, IconAdd, IconDesktop, IconDropbox, IconFolderGoogleDrive } from "../Svg";
import stores from "../../lib/stores/stores";
import { NBString } from "../../lib/util/tools";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Circle } from 'rc-progress';
import { Tab } from '@headlessui/react'
import Dropzone from 'react-dropzone';

const Index = observer(() => {
    const [multiple, setMultiple] = useState(0) //1：25% 2：50% 3:75%
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
    const [Lock, setLock] = useState(true)
    const [choiceMode, setchoiceMode] = useState(true)  //true像素,false百分比
    const setImageWH = (files, widths, heights,multiple) => {
        for (let i = 0; i < files.length; i++) {
            NBString.setImgWidHeigth(files[i], widths[i], heights[i],multiple).then(data => {
                console.log(data)
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

    return (
        <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
            <div className="outer-container">
                <div className="inner-container">
                    <div className='flex-none relative w-72.5 h-full px-4.5 bg-nb-2E2F30 text-left '>
                        {/* 标题 */}
                        <div className="">
                            <p className="py-5.25 font-p24-FFFFFF-w600 py-5.25">{stores.adjustStore.process.length != 0 ? `图片尺寸调整完成！` : stores.adjustStore.isStartAdjust ? "正在调整图片尺寸…" : "调整尺寸的选项"}</p>
                            <p className="font-p14-CFD0E4-w400 pr-7">{stores.adjustStore.process.length != 0 ? `所有图片尺寸调整完成，同时保持最佳质量和大小比例！` : stores.adjustStore.isStartAdjust ? "正在调整您的图片尺寸，可能需要一些时间，请您耐心等待，请勿退出。" : ""}</p>
                        </div>
                        {/* 选择调整方式 */}
                        {
                            stores.adjustStore.process.length != 0 ?
                                <>
                                    <div>
                                        <div className='flex items-center cursor-pointer py-5.25'>
                                            <div className="border border-dashed border-gray-500"><SaveSvg /></div>

                                            <p className='font-p15-E4E4E4-w400 ml-3'>存储</p>
                                        </div>
                                        {/* 按钮 */}
                                        <div className="flex flex-row w-full justify-start ">
                                            <button className="w-10.5 h-10.5  flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                                <IconFolderGoogleDrive />
                                            </button>
                                            <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                                <IconDropbox />
                                            </button>
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
                                                <div className="border border-dashed border-gray-500"><SaveSvg /></div>
                                                <p className='font-p14-CFD0E4-w400 pr-7'>所有图片尺寸调整完成，同时保持最佳质量和大小比例</p>
                                                <p className='font-p15-E4E4E4-w400 ml-3'>存储</p>
                                            </div>
                                            {/* 按钮 */}
                                            <div className="flex flex-row w-full justify-start ">
                                                <button className="w-10.5 h-10.5  flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                                    <IconFolderGoogleDrive />
                                                </button>
                                                <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                                    <IconDropbox />
                                                </button>
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
                                                {choiceMode ? <div className="border border-dashed border-gray-500"><ChoicePixel1 /></div> : <div className="border border-dashed border-gray-500"> <ChoicePixel2 /></div>}
                                                <p>按像素</p></div>
                                            <div className={`flex flex-row items-center  ${!choiceMode ? "font-p18-FFFFFF-w500" : "font-p15-A2A3BA-w400"}  font-p15-A2A3BA-w400 space-x-2 ml-14 cursor-default`}
                                                onClick={() => setchoiceMode(false)}>{choiceMode ? <div className="border border-dashed border-gray-500"><ChoicePercentage2 /></div> : <div className="border border-dashed border-gray-500"> <ChoicePercentage1 /></div>}
                                                <p>按百分比</p></div>
                                        </div>
                                        {/* 选择框条 */}
                                        <div className={`w-26 h-1 mt-1 bg-nb-4C90FE ${choiceMode ? "" : "ml-40"}`} />
                                        {/* 水平线 */}
                                        <div className='w-full h-0.25  bg-nb-222325' />
                                        {/* 图片列表 */}
                                        {choiceMode ? <p className="mt-5 font-p13-FFFFFF-w400">把所有图片的尺寸调整为以下精确尺寸 ：</p> : ""}
                                    </>
                        }
                        <ul>
                            {stores.adjustStore.imgListAdjustData.map((item, idx) => {
                                return (<>
                                    {
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
                                                {choiceMode ?
                                                    <>
                                                        <p className='font-p13-FFFFFF-w400 w-2.75'>{idx + 1}.</p>
                                                        <div className="w-full ">
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
                                                                    <span className="ffont-p13-CFD0E4-w400 mb-1 mr-1">px</span>
                                                                    <div className="flex flex-col ">
                                                                        <button className="border border-dashed w-2.5 cursor-default"
                                                                            onClick={() => stores.adjustStore.addWidth(idx)}
                                                                        ><PixelAdd /></button>
                                                                        <button className="border border-dashed w-2.5 cursor-default"
                                                                            onClick={() => stores.adjustStore.subtractWidth(idx)}
                                                                        ><PixleReduce /></button>
                                                                    </div>
                                                                </div>
                                                                <div className="w-5 flex justify-center itmens-center border border-dashed border-gray-500 ">
                                                                    <button className=" cursor-default "
                                                                        onClick={() => {
                                                                            setLock(!Lock)
                                                                            stores.adjustStore.setAdjustLock(!Lock)
                                                                        }}
                                                                    >{Lock ? <AdjustLock /> : <AdjustUnlock />}</button>
                                                                </div>
                                                                <div className="flex flex-row items-center  justify-center w-30 rounded-lg bg-nb-464546 h-7 ">
                                                                    <input className="w-16 bg-nb-464546 rounded-lg px-1 focus:outline-none font-p13-A2A3BA-w400"
                                                                        type="text" value={stores.adjustStore.dimensionsHeight[idx]}
                                                                        onChange={(e) => stores.adjustStore.adjustHeight(idx, e.target.value)}
                                                                    />
                                                                    <span className="font-p13-CFD0E4-w400 mb-1 mr-1">px</span>
                                                                    <div className="flex flex-col ">
                                                                        <button className="border border-dashed w-2.5 cursor-default"
                                                                            onClick={() => stores.adjustStore.addHeight(idx)}
                                                                        ><PixelAdd /></button>
                                                                        <button className="border border-dashed w-2.5 cursor-default"
                                                                            onClick={() => stores.adjustStore.subtractHeight(idx)}
                                                                        ><PixleReduce /></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="w-full  ">
                                                            <div className="w-70 max-w-md  py-3 ">
                                                                <Tab.Group
                                                                    onChange={(indexs) => setMultiple(indexs+1)}
                                                                >
                                                                    <Tab.List className="flex flex-col  w-70 ">
                                                                        {categories.map((category, index) => {
                                                                            return (
                                                                                <>
                                                                                    <Tab  >
                                                                                        {({ selected }) => (

                                                                                            <div className={`${selected ? 'bg-nb-222325 ' : ''} flex flex-row justify-between items-center w-70  h-12 '`} >
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

                                            </li>
                                    }
                                </>
                                )
                            })}
                        </ul>

                        {/* 压缩按钮 */}
                        <button className={`absolute bottom-9 w-60.5 h-14.5  rounded-4.5 font-p20-FFFFFF-w700  ${stores.adjustStore.adjustButton ? "bg-gray-500 cursor-not-allowed" : "bg-nb-2F63AE hover:opacity-90"}`}
                            onClick={() => {
                                if (stores.adjustStore.process.length != 0) {
                                    for (let i = 0; i < stores.adjustStore.imgURL.length; i++) {
                                        const link = document.createElement('a')
                                        link.style.display = 'none'
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
                                            setImageWH(stores.adjustStore.imgListData, stores.adjustStore.dimensionsWidth, stores.adjustStore.dimensionsHeight,0)
                                        } else {
                                            setImageWH(stores.adjustStore.imgListData,0,0,multiple)
                                        }
                                        stores.adjustStore.onChangeStartAdjust(true)
                                    } else {
                                        return
                                    }
                                }
                            }}
                        >
                            <span>{stores.adjustStore.process.length != 0 ? `下载全部图像（${stores.adjustStore.process.length}）` : stores.adjustStore.isStartAdjust ? "加载中..." : "压缩多个图像文件"}</span>
                        </button>
                        <canvas id="canvasImg"  className="hidden">

                        </canvas>
                    </div>
                </div>
            </div>
        </div>
    )
})
const PixelAdd = () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7L4 1L8 7H0Z" fill="#CFD0E4" />
    </svg>
)
const PixleReduce = () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1L4 7L8 1H0Z" fill="#CFD0E4" />
    </svg>
)
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
const SaveSvg = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0909 4.04545C13.9909 4.04545 14.7273 4.78182 14.7273 5.68182V6.5H0V3.63636C0 2.73636 0.736364 2 1.63636 2H5.72727C5.97273 2 6.21818 2.12273 6.38182 2.28636L7.52727 3.71818C7.69091 3.92273 7.93636 4.04545 8.18182 4.04545H13.0909ZM11.0864 7.72727C10.0636 8.62727 9.40909 9.93636 9.40909 11.4091C9.40909 12.8818 10.0636 14.1909 11.0864 15.0909H1.63636C0.736364 15.0909 0 14.3545 0 13.4545V7.72727H11.0864Z" fill="#E4E4E4" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3182 7.72729C12.2727 7.72729 10.6364 9.36366 10.6364 11.4091C10.6364 13.4546 12.2727 15.0909 14.3182 15.0909C16.3636 15.0909 18 13.4546 18 11.4091C18 9.36366 16.3636 7.72729 14.3182 7.72729ZM14.7273 9.36366V9.77275C14.7273 10.0182 14.5636 10.1818 14.3182 10.1818C14.0727 10.1818 13.9091 10.0182 13.9091 9.77275V9.36366H14.7273ZM15.5454 13.4546C15.9954 13.4546 16.3636 13.0864 16.3636 12.6364V10.1818C16.3636 9.73184 15.9954 9.36366 15.5454 9.36366H15.1364V10.5909C15.1364 10.8364 14.9727 11 14.7273 11H13.9091C13.6636 11 13.5 10.8364 13.5 10.5909V9.36366H13.0909C12.6409 9.36366 12.2727 9.73184 12.2727 10.1818V12.6364C12.2727 13.0864 12.6409 13.4546 13.0909 13.4546H15.5454Z" fill="#E4E4E4" />
        <path d="M15.5455 11.8181H13.0909C12.8455 11.8181 12.6818 11.9818 12.6818 12.2272C12.6818 12.4727 12.8455 12.6363 13.0909 12.6363H15.5455C15.7909 12.6363 15.9546 12.4727 15.9546 12.2272C15.9546 11.9818 15.7909 11.8181 15.5455 11.8181Z" fill="#E4E4E4" />
    </svg>

)
export default Index;