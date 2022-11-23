import { ChoicePercentage1, ChoicePercentage2, ChoicePixel1, ChoicePixel2 } from "../Svg";
import stores from "../../lib/stores/stores";
import { NBString } from "../../lib/util/tools";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const Index = observer(() => {
    const [dataURL, setDataURL] = useState()
    const [Lock, setLock] = useState(true)
    const [choiceFunc, setChoiceFunc] = useState(true)
    const setImageWH = (files, widths, heights) => {
        for (let i = 0; i < files.length; i++) {
            NBString.setImgWidHeigth(files[i], widths[i], heights[i]).then(res => {
                let fileInfo = new FormData()
                if (files[i]) {
                    fileInfo.append('file', files[i])
                    fileInfo.append('fileType', 'policy')
                }
                stores.adjustStore.setImageSize(fileInfo)
            })

        }

    }
    return (
        <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
            <div className="outer-container">
                <div className="inner-container">
                    <div className='flex-none relative w-72.5 h-full px-4.5 bg-nb-2E2F30 text-left '>
                        {/* 标题 */}
                        <div>
                            <p className='py-5.25 font-p24-FFFFFF-w600 '>调整尺寸的选项</p>
                        </div>
                        {/* 选择调整方式 */}
                        <div className="flex flex-row  w-72.5 mt-5 ">
                            <div className={`flex flex-row items-center ${choiceFunc ? "font-p18-FFFFFF-sem" : "font-p15-A2A3BA-re"} space-x-2 cursor-default`}
                                onClick={() => setChoiceFunc(true)}>
                                {choiceFunc ? <div className="border border-dashed border-gray-500"><ChoicePixel1 /></div> : <div className="border border-dashed border-gray-500"> <ChoicePixel2 /></div>}
                                <p>按像素</p></div>
                            <div className={`flex flex-row items-center  ${!choiceFunc ? "font-p18-FFFFFF-sem" : "font-p15-A2A3BA-re"}  font-p15-A2A3BC-re space-x-2 ml-14 cursor-default`}
                                onClick={() => setChoiceFunc(false)}>{choiceFunc ? <div className="border border-dashed border-gray-500"><ChoicePercentage2 /></div> : <div className="border border-dashed border-gray-500"> <ChoicePercentage1 /></div>}
                                <p>按百分比</p></div>
                        </div>
                        {/* 选择框条 */}
                        <div className={`w-26 h-1 mt-1 bg-nb-4C90FE ${choiceFunc ? "" : "ml-40"}`} />
                        {/* 水平线 */}
                        <div className='w-full h-0.25  bg-nb-222325' />

                        {/* 图片列表 */}
                        <p className="mt-5 font-p13-FFFFFF-w400">把所有图片的尺寸调整为以下精确尺寸 ：</p>
                        <ul>
                            {stores.compressStore.imgListData.map((item, idx) => {
                                return (
                                    <li key={item.name + idx} className='h-14 w-full mt-4'>
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
                                                            console.log(e.target.value)
                                                        }}
                                                    />
                                                    <span className="font-p13-CFD0E4-sem mb-1 mr-1">px</span>
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
                                                    <span className="font-p13-CFD0E4-sem mb-1 mr-1">px</span>
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
                                    </li>
                                )
                            })}
                        </ul>

                        {/* 压缩按钮 */}
                        <button className={`absolute bottom-9 w-60.5 h-14.5  rounded-4.5 font-p20-FFFFFF-w700  ${stores.adjustStore.adjustButton ? "bg-gray-500 cursor-not-allowed" : "bg-nb-2F63AE hover:opacity-90"}`}
                            onClick={() => {
                                if (!stores.adjustStore.adjustButton) {
                                    setImageWH(stores.compressStore.imgListData, stores.adjustStore.dimensionsWidth, stores.adjustStore.dimensionsHeight)
                                } else {
                                    return
                                }
                            }}
                        >
                            <span>调整多个图像大小</span>
                        </button>
                        <canvas id="canvasImg" width='200px' height='200px' className="hidden">
                            <img src={dataURL} id="images" className="hidden" />
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
export default Index;