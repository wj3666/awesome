import { IconAdd, IconDesktop, IconDropbox, IconFolderGoogleDrive, StaticGIF1, StaticGIF2, MoveGIF1, MoveGIF2, Vector, PixelAdd, PixleReduce } from "../Svg";
import Dropzone from 'react-dropzone';
import stores from "../../lib/stores/stores";
import { NBString } from "../../lib/util/tools";
import { observer } from "mobx-react-lite";
import { Circle } from 'rc-progress';
import { useEffect, useState } from "react";

const Index = observer(() => {
    return (
        stores.jpgConvertStore.isShowGiFMode ? <GifMode /> : <PngMode />
    )
})
//PNG模块
const PngMode = observer(() => {

    const onDrop = (e) => {
        let fileFormat=e[0].name.split('.')[1]
        if(fileFormat=='jpg'||fileFormat=='jpeg'){
            stores.convertJpgStore.setImgListData(e);
        }else{
            alert('请导入正确格式的图片')
            return
        }
    }
    const jpgConvertPNG = () => {
        stores.jpgConvertStore.onChangeStartConvert(true)
        for (let i = 0; i < stores.jpgConvertStore.imgListData.length; i++) {
            let data = stores.jpgConvertStore.imgListData[i]
            console.log(data)
            let fileInfo = new FormData()
            if (data) {
                fileInfo.append('file', data)
                fileInfo.append('fileType', 'policy')
            }
            stores.jpgConvertStore.uploadJPG(fileInfo, i)
        }
    }
    return (
        <>

            <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
                <div className="outer-container">
                    <div className="inner-container">
                        <div className='flex-none relative w-72.5 h-full  bg-nb-2E2F30 text-left '>
                            {/* 标题 */}
                            <div>
                                <p className='py-5.25 font-p24-FFFFFF-w600 px-4.5'>转换图片</p>
                                <p className='font-p14-CFD0E4-w400 pr-7 px-4.5'>将<span className="font-p13-4C90FE-w400">JPG图片</span>转换为</p>
                            </div>
                            <div className="w-full h-35 mt-11 relative">
                                <button className={`w-full px-4.5 h-17.5 flex flex-col items-start justify-center ${stores.jpgConvertStore.isShowGiFMode ? "" : "bg-nb-222325"}`}
                                    onClick={() => { stores.jpgConvertStore.setIsShowGiFMode(false) }}>
                                    <p className="font-p16-FFFFFF-w600">转换至<span className="font-p16-4C90FE-w600">PNG</span></p>
                                    <p className="font-p13-FFFFFF-w400 leading-10" >所有图片都将转换至PNG格式</p>
                                </button>
                                <button className={`w-full px-4.5 h-17.5 flex flex-col items-start justify-center ${stores.jpgConvertStore.isShowGiFMode ? "bg-nb-222325" : ""}`}
                                    onClick={() => { stores.jpgConvertStore.setIsShowGiFMode(true) }}>
                                    <p className="font-p16-FFFFFF-w600">转换至<span className="font-p16-4C90FE-w600">GIF</span></p>
                                    <p className="font-p13-FFFFFF-w400 leading-10">所有图片都将转换至PNG格式</p>
                                </button>
                                <div className="border border-dashed border-gray-500 w-3 absolute right-4.5 bottom-8  "><Vector /></div>
                            </div>
                            {/* 水平线 */}
                            <div className='w-63.5 mx-auto h-0.25 mt-4 bg-nb-222325' />
                            {/* 选择添加更多图片 */}
                            <div>
                                <div className='flex items-center cursor-pointer py-5.25 px-4.5'>
                                    <IconAdd />
                                    <p className='font-p15-E4E4E4-w400 ml-3'>选择添加更多图片</p>
                                </div>
                                {/* 按钮 */}
                                <div className="flex items-center px-4.5">
                                    <button className="w-10.5 h-10.5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                        <Dropzone noDrag={true} onDrop={(e) => { onDrop(e) }}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <IconDesktop />
                                                </div>
                                            )}
                                        </Dropzone>
                                    </button>
                                    <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                        <IconFolderGoogleDrive />
                                    </button>
                                    <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                        <IconDropbox />
                                    </button>
                                </div>
                            </div>
                            {/* 水平线 */}
                            <div className='w-63.5 mx-auto h-0.25 my-4.375 bg-nb-222325 ' />

                            {/* 图片列表 */}
                            <ul>
                                {stores.jpgConvertStore.imgListConvertData.map((item, idx) => {
                                    return (
                                        // <ImgInfoList key={item.name + idx} item={item} idx={idx} />
                                        <li key={item.name + idx} className='h-14 w-full flex flex-row items-center px-4.5'>
                                            <p className='font-p13-FFFFFF-w400 w-2.75 flex-none'>{idx + 1}.</p>
                                            <div className='w-9 h-9 bg-nb-222325 ml-2 flex-none'>
                                                <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                                            </div>
                                            <div className='ml-2.5 flex-grow'>
                                                <p className='font-p12-FFFFFF-w400'>{NBString.truncateString(item.name, 18, 7)}</p>
                                                {
                                                    item.imgUrl != undefined ?
                                                        <div className="mt-1 flex items-center justify-between">
                                                            <p className="font-p13-5FE483-w400">完成</p>
                                                            <a href={item.imgUrl} download id={`download${idx}`} className="font-p13-4C90FE-w600 underline">下载</a>
                                                        </div>
                                                        :
                                                        <>
                                                            {(NBString.getImgSizeMb(item.size) < 5 && stores.jpgConvertStore.isStartConvert) ?
                                                                <div className='w-4 h-4 mt-1'>
                                                                    <Circle strokeWidth={6} percent={item.process} />
                                                                </div>
                                                                :
                                                                <div className='font-p13-A2A3BA-w400 mt-1'>
                                                                    <p>等待中</p>
                                                                </div>
                                                            }
                                                        </>
                                                }
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                            {/* 压缩按钮 */}
                            <button
                                onClick={() => {
                                    if (stores.jpgConvertStore.process.length != 0) {
                                        for (let i = 0; i < stores.jpgConvertStore.jpgUrl.length; i++) {
                                            const link = document.createElement('a')
                                            link.download = 'defaultName'
                                            link.style.display = 'none'
                                            console.log(stores.jpgConvertStore.jpgUrl[i])
                                            link.href = stores.jpgConvertStore.jpgUrl[i]
                                            link.setAttribute(
                                                'download', ''
                                            )
                                            document.body.appendChild(link)
                                            link.click()
                                        }

                                    } else {
                                        jpgConvertPNG()
                                    }
                                }}
                                className={`absolute bottom-9 left-1/2 -translate-x-1/2 w-60.5 h-14.5 rounded-4.5 font-p20-FFFFFF-w700 hover:opacity-90 ${stores.jpgConvertStore.isStartConvert ? "bg-nb-191919" : "bg-nb-2F63AE"}`}>
                                <span>{stores.jpgConvertStore.process.length != 0 ? `下载全部图像（${stores.jpgConvertStore.process.length}）` : stores.jpgConvertStore.isStartConvert ? "加载中..." : "转换至PNG图片"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

})
//GIF模块
const GifMode = observer(() => {
    const [playBack, setPlayBack] = useState(false) //是否循环播放
    const [toolBox, setToolBox] = useState(false)   //提示图片必须在2张以上的弹窗
    const [choiceMode, setchoiceMode] = useState(false)  //false：静态 true：动态
    const onDrop = (e) => {
        // console.log(e)
        stores.jpgConvertStore.setImgListData(e);
    }
    const convertJpg = () => {
        stores.jpgConvertStore.onChangeStartConvert(true)
        for (let i = 0; i < stores.jpgConvertStore.imgListData.length; i++) {
            let data = stores.jpgConvertStore.imgListData[i]
            console.log(data)
            let fileInfo = new FormData()
            if (data) {
                fileInfo.append('file', data)
                fileInfo.append('fileType', 'policy')
            }
            stores.jpgConvertStore.uploadJPG(fileInfo, i)
        }
    }
    useEffect(() => {

        var oDiv = document.getElementById('moveGIF')
        oDiv.onmouseover = () => setToolBox(true)
        oDiv.onmouseout = () => setToolBox(false)

    }, [])
    console.log(toolBox)
    return (
        <>

            <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
                <div className="outer-container">
                    <div className="inner-container">
                        <div className='flex-none relative w-72.5 h-full px-4.5 bg-nb-2E2F30 text-left '>
                            {/* 标题 */}
                            <div className="flex flex-row space-x-4">
                                <div className="mt-4 w-8.5 h-8.5 bg-nb-2F63AE rounded-lg flex justify-center items-center"><div className="border-2 border-dashed border-gray-500 "><BackPNG/></div></div>
                                <p className='py-5.25 font-p24-FFFFFF-w600 '>转换GIF格式</p>
                            </div>
                            <div className="flex flex-row  w-72.5 mt-4 ">
                                <div className={`flex flex-row items-center ${!choiceMode ? "font-p18-FFFFFF-w500" : "font-p15-A2A3BA-w400"} space-x-2 cursor-default`}
                                    onClick={() => setchoiceMode(false)}>
                                    {!choiceMode ? <div className="border-2 border-dashed border-gray-500"><StaticGIF1 /></div> : <div className="border-2 border-dashed border-gray-500"><StaticGIF2 /></div>}
                                    <p>静态GIF</p></div>
                                <div id="moveGIF" className={`flex flex-row items-center  ${choiceMode ? "font-p18-FFFFFF-w500" : "font-p15-A2A3BA-w400"}  font-p15-A2A3BA-w400 space-x-2 ml-14 cursor-default
                                ${stores.jpgConvertStore.imgListConvertData.length < 2 ? "cursor-not-allowed" : ""}`}
                                    onClick={() => {
                                        if (stores.jpgConvertStore.imgListConvertData.length < 2) {
                                            return
                                        } else {
                                            setchoiceMode(true)
                                        }
                                    }}>{choiceMode ? <div className="border-2 border-dashed border-gray-500"><MoveGIF1 /></div> : <div className="border-2 border-dashed border-gray-500"><MoveGIF2 /></div>}
                                    <p>动态GIF</p>
                                </div>
                                {toolBox ? <div className=" rounded-2xl bg-nb-sidebar-grey shadow-card fixed right-1 top-54 font-p13-FFFFFF-w400 ">选择2个或更多图片来激活</div> : ""}
                            </div>

                            {/* 选择框条 */}
                            <div className={`w-26 h-1 mt-1 bg-nb-4C90FE ${!choiceMode ? "" : "ml-36"}`} />
                            {/* 水平线 */}
                            <div className='w-full h-0.25  bg-nb-222325' />
                            {/* 选静态或者动态的内容展示 */}
                            {
                                choiceMode ?
                                    <div className="w-full flex flex-col h-31 ">
                                        <div className="w-full flex flex-row h-15 items-center justify-between">
                                            <p className="font-p13-FFFFFF-w400">每张图都秒数</p>
                                            <div className="flex flex-row items-center justify-around  w-28 rounded-lg bg-nb-464546 h-7 ">
                                                <input className="w-16 bg-nb-464546 rounded-lg px-1 focus:outline-none font-p13-A2A3BA-w400"
                                                    type="text" value={"1"}
                                                    onChange={(e) => {

                                                    }}
                                                />
                                                <span className="font-p13-CFD0E4-w400 mb-1 ml-4">s</span>
                                                <div className="flex flex-col  ">
                                                    <button className="border border-dashed w-2.5 cursor-default"
                                                        onClick={() => { }}
                                                    ><PixelAdd /></button>
                                                    <button className="border border-dashed w-2.5 cursor-default"
                                                        onClick={() => { }}
                                                    ><PixleReduce /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-row h-15 items-center justify-between">
                                            <p className="font-p13-FFFFFF-w400">循环播放</p>
                                            {
                                                playBack ?
                                                    <button onClick={() => setPlayBack(false)}><PlayChosen /></button>
                                                    : <button className={`selectBorder w-5.5 h-5.5 rounded-full`}
                                                        onClick={() => setPlayBack(true)}></button>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="h-17 mt-5 w-full font-p15-E4E4E4-w500"><p>你选择的所有 JPG 图片都将转换为 GIF 格式。</p></div>
                            }
                            {/* 水平线 */}
                            <div className='w-full h-0.25  bg-nb-222325' />
                            {/* 选择添加更多图片 */}
                            <div>
                                <div className='flex items-center cursor-pointer py-5.25 '>
                                    <IconAdd />
                                    <p className='font-p15-E4E4E4-w400 ml-3'>选择添加更多图片</p>
                                </div>
                                {/* 按钮 */}
                                <div className="flex items-center ">
                                    <button className="w-10.5 h-10.5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                        <Dropzone noDrag={true} onDrop={(e) => { onDrop(e) }}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <IconDesktop />
                                                </div>
                                            )}
                                        </Dropzone>
                                    </button>
                                    <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                        <IconFolderGoogleDrive />
                                    </button>
                                    <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                        <IconDropbox />
                                    </button>
                                </div>
                            </div>
                            {/* 水平线 */}
                            <div className='w-full h-0.25 my-4.375 bg-nb-222325 ' />

                            {/* 图片列表 */}
                            <ul>
                                {stores.jpgConvertStore.imgListConvertData.map((item, idx) => {
                                    return (
                                        // <ImgInfoList key={item.name + idx} item={item} idx={idx} />
                                        <li key={item.name + idx} className='h-14 w-full flex flex-row items-center '>
                                            <p className='font-p13-FFFFFF-w400 w-2.75 flex-none'>{idx + 1}.</p>
                                            <div className='w-9 h-9 bg-nb-222325 ml-2 flex-none'>
                                                <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                                            </div>
                                            <div className='ml-2.5 flex-grow'>
                                                <p className='font-p12-FFFFFF-w400'>{NBString.truncateString(item.name, 18, 7)}</p>
                                                {
                                                    item.imgUrl != undefined ?
                                                        <div className="mt-1 flex items-center justify-between">
                                                            <p className="font-p13-5FE483-w400">完成</p>
                                                            <a href={item.imgUrl} download id={`download${idx}`} className="font-p13-4C90FE-w600 underline">下载</a>
                                                        </div>
                                                        :
                                                        <>
                                                            {(NBString.getImgSizeMb(item.size) < 5 && stores.jpgConvertStore.isStartConvert) ?
                                                                <div className='w-4 h-4 mt-1'>
                                                                    <Circle strokeWidth={6} percent={item.process} />
                                                                </div>
                                                                :
                                                                <div className='font-p13-A2A3BA-w400 mt-1'>
                                                                    <p>等待中</p>
                                                                </div>
                                                            }
                                                        </>
                                                }
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                            {/* 压缩按钮 */}
                            <button
                                onClick={() => {
                                    if (stores.jpgConvertStore.process.length != 0) {
                                        for (let i = 0; i < stores.jpgConvertStore.jpgUrl.length; i++) {
                                            const link = document.createElement('a')
                                            link.download = 'defaultName'
                                            link.style.display = 'none'
                                            console.log(stores.jpgConvertStore.jpgUrl[i])
                                            link.href = stores.jpgConvertStore.jpgUrl[i]
                                            link.setAttribute(
                                                'download', ''
                                            )
                                            document.body.appendChild(link)
                                            link.click()
                                        }

                                    } else {
                                        convertJpg()
                                    }
                                }}
                                className={`absolute bottom-9 left-1/2 -translate-x-1/2 w-60.5 h-14.5 rounded-4.5 font-p20-FFFFFF-w700 hover:opacity-90 ${stores.jpgConvertStore.isStartConvert ? "bg-nb-191919" : "bg-nb-2F63AE"}`}>
                                <span>{stores.jpgConvertStore.process.length != 0 ? `下载全部图像（${stores.jpgConvertStore.process.length}）` : stores.jpgConvertStore.isStartConvert ? "加载中..." : "转换至GIF图片"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

})
const PlayChosen = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="11" fill="#2F63AE" />
        <path d="M6.02899 11.0784L10.1409 15.3413L16.029 7.34131" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
)
const BackPNG = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5081 6.72064C14.5618 6.72064 17.9447 11.4067 18 15.571C18 15.9028 17.7283 15.9966 17.471 15.571C16.1631 13.234 14.0232 12.0222 11.2173 12.0222H10.5898V14.7968C10.5898 15.6263 9.63289 16.1937 8.93803 15.6359L2.52325 10.4882C1.82599 9.93044 1.82599 9.01679 2.52084 8.45898L8.98371 3.25838C9.67857 2.69817 10.4936 3.08527 10.4936 4.06865L10.5081 6.72064H10.6259H10.5081Z" stroke="white" stroke-width="1.5" />
    </svg>
)
export default Index;