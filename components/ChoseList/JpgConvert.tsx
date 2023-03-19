import { IconAdd, IconDesktop, IconDropbox, IconFolderGoogleDrive, StaticGIF1, StaticGIF2, MoveGIF1, MoveGIF2, Vector, PixelAdd, PixleReduce, Unstorage, Undrpobox, SaveSvg, PlayChosen, BackAddimage, SaveToGoogleDrive } from "../Svg";
import Dropzone from 'react-dropzone';
import stores from "../../lib/stores/stores";
import { NBString } from "../../lib/util/tools";
import { observer } from 'mobx-react'
import { Circle } from 'rc-progress';
import { useEffect, useState } from "react";
const Index = observer(() => {
    return (
        stores.jpgConvertStore.isShowGiFMode ? <GifMode /> : <PngMode />
    )
})
//PNG模块
const PngMode = observer(() => {
    const [saveGoogleDrive, setSaveGoogleDrive] = useState(false)
    const onDrop = (e) => {
        let fileFormat = e[0].name.split('.')[1]
        if (fileFormat == 'jpg' || fileFormat == 'jpeg') {
            stores.jpgConvertStore.setImgListData(e);
        } else {
            alert('请导入正确格式的图片')
            return
        }
    }
    const jpgConvertPNG = () => {
        stores.jpgConvertStore.onChangeStartConvert(true)
        for (let i = 0; i < stores.jpgConvertStore.imgListData.length; i++) {
            let data = stores.jpgConvertStore.imgListData[i]
            let fileInfo = new FormData()
            if (data) {
                fileInfo.append('file', data)
                fileInfo.append('fileType', 'policy')
            }
            stores.jpgConvertStore.uploadJPG(fileInfo, i)
        }
    }
    //清除文件夹
    const MkdirFile = (filePath: string) => {
        stores.appStore.MkdirFile(filePath)
    }
    return (
        <>
            <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
                <div className="outer-container  bg-nb-2E2F30">
                    <div className="inner-container">
                        <div className='flex-none relative w-72.5 h-full  text-left '>
                            {/* 标题 */}
                            <div>
                                {stores.jpgConvertStore.process.length != 0 ? <p className='py-5.25 font-p24-FFFFFF-w600it px-4.5'>图片格式转换完成！</p> : stores.jpgConvertStore.isStartConvert ? <p className='py-5.25 font-p24-FFFFFF-w600 px-4.5'>转换图片至 PNG 格式</p> : <p className='py-5.25 font-p24-FFFFFF-w600 px-4.5'>转换图片</p>}
                                {stores.jpgConvertStore.process.length != 0 ? <p className="font-p14-CFD0E4-w400 px-4.5">可以点击下载！</p> : stores.jpgConvertStore.isStartConvert ? <p className="font-p14-CFD0E4-w400 px-4.5">正在转换您的图片，可能需要一些时间，请您耐心等待，请勿退出。</p> : <p className='font-p14-CFD0E4-w400 pr-7 px-4.5'>将<span className="font-p13-4C90FE-w400">JPG图片</span>转换为</p>}
                            </div>
                            {
                                stores.jpgConvertStore.process.length != 0 ?
                                    <div className="w-full h-35 mt-11 relative opacity-50">
                                        <button className={`w-full px-4.5 h-17.5 flex flex-col items-start justify-center`}>
                                            <p className="font-p16-FFFFFF-w600">转换至<span className="font-p16-4C90FE-w600">PNG</span></p>
                                            <p className="font-p13-FFFFFF-w400 leading-10" >所有图片都将转换至PNG格式</p>
                                        </button>
                                        <button className={`w-full px-4.5 h-17.5 flex flex-col items-start justify-center`}>
                                            <p className="font-p16-FFFFFF-w600">转换至<span className="font-p16-4C90FE-w600">GIF</span></p>
                                            <p className="font-p13-FFFFFF-w400 leading-10">所有图片都将转换至GIF格式</p>
                                        </button>
                                        <div className=" w-3 absolute right-4.5 bottom-8  "><Vector /></div>
                                    </div>
                                    :
                                    <div className="w-full h-35 mt-11 relative">
                                        <button className={`w-full px-4.5 h-17.5 flex flex-col items-start justify-center ${stores.jpgConvertStore.isShowGiFMode ? "" : "bg-nb-222325"}`}
                                            onClick={() => { stores.jpgConvertStore.setIsShowGiFMode(false) }}>
                                            <p className="font-p16-FFFFFF-w600">转换至<span className="font-p16-4C90FE-w600">PNG</span></p>
                                            <p className="font-p13-FFFFFF-w400 leading-10" >所有图片都将转换至PNG格式</p>
                                        </button>
                                        <button className={`w-full px-4.5 h-17.5 flex flex-col items-start justify-center ${stores.jpgConvertStore.isShowGiFMode ? "bg-nb-222325" : ""}`}
                                            onClick={() => { stores.jpgConvertStore.setIsShowGiFMode(true) }}>
                                            <p className="font-p16-FFFFFF-w600">转换至<span className="font-p16-4C90FE-w600">GIF</span></p>
                                            <p className="font-p13-FFFFFF-w400 leading-10">所有图片都将转换至GIF格式</p>
                                        </button>
                                        <div className=" w-3 absolute right-4.5 bottom-8  "><Vector /></div>
                                    </div>
                            }
                            {/* 水平线 */}
                            <div className='w-63.5 mx-auto h-0.25 mt-4 bg-nb-222325' />
                            {/* 选择添加更多图片 */}
                            {stores.jpgConvertStore.process.length != 0 ?
                                <div className="relative">
                                    <div className='flex items-center cursor-pointer py-5.25  ml-5.25 '>
                                        <SaveSvg />
                                        <p className='font-p15-E4E4E4-w400 ml-3'>存储</p>
                                    </div>
                                    {/* 按钮 */}
                                    <div className="flex items-center ">
                                        <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all"
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
                                :
                                stores.jpgConvertStore.isStartConvert ?
                                    <div>
                                        <div className='flex items-center cursor-pointer py-5.25 ml-5.25'>
                                            <SaveSvg />
                                            <p className='font-p15-E4E4E4-w400 ml-3'>存储</p>
                                        </div>
                                        {/* 按钮 */}
                                        <div className="flex items-center ">
                                            <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                                <Unstorage />
                                            </button>
                                            <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                                <Undrpobox />
                                            </button>
                                        </div>
                                    </div>
                                    :
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
                            }
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
    const [toolBox, setToolBox] = useState(false)   //提示图片必须在2张以上的弹窗
    const [saveGoogleDrive, setSaveGoogleDrive] = useState(false)
    const [refresh,setRefresh]=useState(false)
    const onDrop = (e) => {
        let fileFormat = e[0].name.split('.')[1]
        if (fileFormat == 'jpg' || fileFormat == 'jpeg') {
            stores.jpgConvertStore.setImgListData(e);
        } else {
            alert('请导入正确格式的图片')
            return
        }
    }
    //清除文件夹
    const MkdirFile = (filePath: string) => {
        stores.appStore.MkdirFile(filePath)
    }
    //静态gif
    const jpgConvertStaticGIF = () => {
        stores.jpgConvertStore.onChangeStartConvert(true)
        for (let i = 0; i < stores.jpgConvertStore.imgListData.length; i++) {
            let data = stores.jpgConvertStore.imgListData[i]
            let fileInfo = new FormData()
            if (data) {
                fileInfo.append('file', data)
                fileInfo.append('GIFMode', stores.jpgConvertStore.isShowGiFMode.toString())
                fileInfo.append('fileType', 'policy')
            }
            stores.jpgConvertStore.uploadJPG(fileInfo, i)
        }
    }
    //动态gif
    const jpgConvertMoveGIF = async () => {
        stores.jpgConvertStore.onChangeStartConvert(true)
        let seconds = stores.jpgConvertStore.GIFSeconds
        let playBack = stores.jpgConvertStore.isPlayBack
        let width = await NBString.getImgWidth(stores.jpgConvertStore.imgListData[0])
        let height = await NBString.getImgHeight(stores.jpgConvertStore.imgListData[0])
        for (let i = 0; i < stores.jpgConvertStore.imgListConvertData.length; i++) {
            let data = stores.jpgConvertStore.imgListData[i]
            let fileInfo = new FormData()
            if (data) {
                fileInfo.append('file', data)
                fileInfo.append('fileType', 'policy')
            }
            stores.jpgConvertStore.uploadGIF(fileInfo, i)

        }
        var t = setInterval(() => {
            if (stores.jpgConvertStore.moveUrl.length != 0) {
                stores.jpgConvertStore.createMoveGIF(stores.jpgConvertStore.moveUrl, seconds, playBack, width, height)
                window.clearInterval(t)
            }
        }, 1000)
    }

    return (
        <>
            <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
                <div className="outer-container">
                    <div className="inner-container">
                        <div className='flex-none relative w-72.5 h-full px-4.5 bg-nb-2E2F30 text-left '>
                            {/* 标题 */}
                            <div className="flex flex-row space-x-4">
                                <button className="mt-4 w-8.5 h-8.5 bg-nb-2F63AE rounded-lg flex justify-center items-center"
                                    onClick={() => {
                                        stores.jpgConvertStore.pngInit()
                                    }}
                                ><BackAddimage /></button>
                                <p className='py-5.25 font-p24-FFFFFF-w600it '>{stores.jpgConvertStore.process.length != 0 ? "正在转换 GIF 格式" : stores.jpgConvertStore.isStartConvert ? "正在转换GIF格式" : "转换GIF格式"}</p>
                            </div>
                            <div className="flex flex-row  w-72.5 mt-4 ">
                                <div className={`flex flex-row items-center ${!stores.jpgConvertStore.choiceMode ? "font-p18-FFFFFF-w500" : "font-p15-A2A3BA-w400"} space-x-2 cursor-default`}
                                    onClick={() => {
                                        if (stores.jpgConvertStore.process.length != 0) {
                                            return
                                        }
                                        stores.jpgConvertStore.setChoiceMode(false)
                                    }}>
                                    {!stores.jpgConvertStore.choiceMode ? <div><StaticGIF1 /></div> : <div><StaticGIF2 /></div>}
                                    <p>静态GIF</p></div>
                                <div onMouseEnter={()=>setToolBox(true)} onMouseLeave={() => setToolBox(false)}
                                 className={`flex flex-row items-center  ${stores.jpgConvertStore.choiceMode ? "font-p18-FFFFFF-w500" : "font-p15-A2A3BA-w400"}  font-p15-A2A3BA-w400 space-x-2 ml-14 cursor-default
                                ${stores.jpgConvertStore.imgListConvertData.length < 2 ? "cursor-not-allowed" : ""}`}
                                    onClick={() => {
                                        if (stores.jpgConvertStore.imgListConvertData.length < 2) {
                                            return
                                        } else {
                                            if (stores.jpgConvertStore.process.length != 0) {
                                                return
                                            }
                                            stores.jpgConvertStore.setChoiceMode(true)
                                        }
                                    }}>{stores.jpgConvertStore.choiceMode ? <div><MoveGIF1 /></div> : <div><MoveGIF2 /></div>}
                                    <p>动态GIF</p>
                                </div>
                                {toolBox ? <div className=" rounded-2xl bg-nb-sidebar-grey shadow-card fixed right-1 top-54 font-p13-FFFFFF-w400 ">选择2个或更多图片来激活</div> : ""}
                            </div>

                            {/* 选择框条 */}
                            <div className={`w-26 h-1 mt-1 bg-nb-4C90FE ${!stores.jpgConvertStore.choiceMode ? "" : "ml-36"}`} />
                            {/* 水平线 */}
                            <div className='w-full h-0.25  bg-nb-222325' />
                            {/* 选静态或者动态的内容展示 */}
                            {
                                stores.jpgConvertStore.choiceMode ?
                                    <div className="w-full flex flex-col h-31 ">
                                        <div className="w-full flex flex-row h-15 items-center justify-between">
                                            <p className="font-p13-FFFFFF-w400">每张图都秒数</p>
                                            <div className="flex flex-row items-center justify-around  w-28 rounded-lg bg-nb-464546 h-7 ">
                                                <input className="w-16 bg-nb-464546 rounded-lg px-1 focus:outline-none font-p13-A2A3BA-w400"
                                                    type="text" value={stores.jpgConvertStore.GIFSeconds}
                                                    onChange={(e) => {
                                                        stores.jpgConvertStore.inputGIFSeconds(e.target.value)
                                                    }}
                                                />
                                                <span className="font-p13-CFD0E4-w400 mb-1 ml-4">s</span>
                                                <div className="flex flex-col  ">
                                                    <button className=" w-2.5 cursor-default"
                                                        onClick={() => stores.jpgConvertStore.addGIFSeccons()}
                                                    ><PixelAdd /></button>
                                                    <button className=" w-2.5 cursor-default"
                                                        onClick={() => stores.jpgConvertStore.reduceGIFSeconds()}
                                                    ><PixleReduce /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-row h-15 items-center justify-between">
                                            <p className="font-p13-FFFFFF-w400">循环播放</p>
                                            {
                                                stores.jpgConvertStore.isPlayBack ?
                                                    <button onClick={() => stores.jpgConvertStore.changeIsPlayBack(false)}><PlayChosen /></button>
                                                    : <button className={`selectBorder w-5.5 h-5.5 rounded-full`}
                                                        onClick={() => stores.jpgConvertStore.changeIsPlayBack(true)}></button>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="h-17 mt-5 w-full font-p15-E4E4E4-w500"><p>你选择的所有 JPG 图片都将转换为 GIF 格式。</p></div>
                            }
                            {/* 水平线 */}
                            <div className='w-full h-0.25  bg-nb-222325' />
                            {/* 选择添加更多图片 */}
                            {stores.jpgConvertStore.process.length != 0 ?
                                <div className="relative">
                                    <div className='flex items-center cursor-pointer py-5.25'>
                                        <div><SaveSvg /></div>
                                        <p className='font-p15-E4E4E4-w400 ml-3 '>存储</p>
                                    </div>
                                    {/* 按钮 */}
                                    <div className="flex items-center ">
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
                                :
                                stores.jpgConvertStore.isStartConvert ?
                                    <div>
                                        <div className='flex items-center cursor-pointer py-5.25 '>
                                            <SaveSvg />
                                            <p className='font-p15-E4E4E4-w400 ml-3'>存储</p>
                                        </div>
                                        {/* 按钮 */}
                                        <div className="flex items-center ">
                                            <button className="w-10.5 h-10.5  flex items-center justify-center bg-nb-2F63AE rounded-full ">
                                                <Unstorage />
                                            </button>
                                            <button className="w-10.5 h-10.5 ml-5 flex items-center justify-center bg-nb-2F63AE rounded-full ">
                                                <Undrpobox />
                                            </button>
                                        </div>
                                    </div>
                                    :
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
                            }
                            {/* 水平线 */}
                            <div className='w-full h-0.25 my-4.375 bg-nb-222325' />
                            {/* 图片列表 */}
                            <ul>
                                {
                                    stores.jpgConvertStore.choiceMode ?
                                        <>
                                            <div className="w-full ">
                                                <p className="font-p15-E4E4E4-w500">合并以下图片为 GIF 格式</p>
                                                <p className="font-p12-FFFFFF-w400 mt-4">名称：Group1.gif</p>
                                            </div>
                                            {
                                                stores.jpgConvertStore.isFinish ?
                                                    <div className="mt-1 flex items-center justify-between">
                                                        <p className="font-p13-5FE483-w400">完成</p>
                                                    </div>
                                                    :
                                                    <>
                                                        {stores.jpgConvertStore.isStartConvert ?
                                                            <div className='w-4 h-4 mt-1'>
                                                                <Circle strokeWidth={6} percent={stores.jpgConvertStore.imgListConvertData[0].process} />
                                                            </div>
                                                            :
                                                            <div className='font-p13-A2A3BA-w400 mt-4'>
                                                                <p>等待中</p>
                                                            </div>
                                                        }
                                                    </>
                                            }
                                            <div className="relative w-full h-9 mt-2 overflow-hidden ">
                                                <div className="flex flex-row w-full  overflow-x-scroll   h-20  ">
                                                    {
                                                        stores.jpgConvertStore.imgListConvertData.map((item, idx) => {
                                                            return (
                                                                <div className='w-9 h-9 bg-nb-222325 ml-2 flex-none '>
                                                                    <img className='w-full h-full object-contain' src={URL.createObjectURL(item)} />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </>
                                        :
                                        stores.jpgConvertStore.imgListConvertData.map((item, idx) => {

                                            return (
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
                                        })
                                }
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
                                        MkdirFile('public/jpgConvert')
                                    } else {
                                        if (stores.jpgConvertStore.choiceMode) {
                                            jpgConvertMoveGIF()
                                        } else {
                                            jpgConvertStaticGIF()
                                        }
                                    }
                                }}
                                className={`absolute bottom-9 left-1/2 -translate-x-1/2 w-60.5 h-14.5 rounded-4.5 font-p20-FFFFFF-w700 hover:opacity-90 ${stores.jpgConvertStore.isStartConvert ? "bg-nb-191919" : "bg-nb-2F63AE"}`}>
                                {
                                    stores.jpgConvertStore.choiceMode ?
                                    <span>{stores.jpgConvertStore.process.length !=0 ? "下载GIF图像" : stores.jpgConvertStore.isStartConvert ? "加载中..." : "转换至GIF图片"}</span>
                                    : 
                                    <span>{stores.jpgConvertStore.process.length != 0 ? `下载GIF图像（${stores.jpgConvertStore.process.length}）` : stores.jpgConvertStore.isStartConvert ? "加载中..." : "转换至GIF图片"}</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

})


export default Index;