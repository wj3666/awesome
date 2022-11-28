import { IconAdd, IconDesktop, IconDropbox, IconFolderGoogleDrive, } from "../Svg";
import Dropzone from 'react-dropzone';
import stores from "../../lib/stores/stores";
import { NBString } from "../../lib/util/tools";
import { observer } from "mobx-react-lite";
import { Circle } from 'rc-progress';

const Index = observer(() => {
    const convertJpg =() => {
        stores.convertJpgStore.onChangeStartConvert(true)
        for (let i = 0; i < stores.convertJpgStore.imgListData.length; i++) {
            let data=stores.convertJpgStore.imgListData[i]
            console.log(data)
            let fileInfo = new FormData()
                if (data) {
                    fileInfo.append('file', data)
                    fileInfo.append('fileType', 'policy')
                }
            stores.convertJpgStore.uploadImage(fileInfo,i)
        }
        
    }
    return (
        <>
        
        <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
            <div className="outer-container">
                <div className="inner-container">
                    <div className='flex-none relative w-72.5 h-full px-4.5 bg-nb-2E2F30 text-left '>
                        {/* 标题 */}
                        <div>
                            <p className='py-5.25 font-p24-FFFFFF-w600'>转换图片</p>
                            <p className='font-p14-CFD0E4-w400 pr-7'>所有图片都将转换为<span className="font-p13-4C90FE-w400">JPG</span>格式</p>
                        </div>
                        {/* 水平线 */}
                        <div className='w-full h-0.25 mt-7.5 bg-nb-222325' />
                        {/* 选择添加更多图片 */}
                        <div>
                            <div className='flex items-center cursor-pointer py-5.25'>
                                <IconAdd />
                                <p className='font-p15-E4E4E4-w400 ml-3'>选择添加更多图片</p>
                            </div>
                            {/* 按钮 */}
                            <div className="flex items-center">
                                <button className="w-10.5 h-10.5 flex items-center justify-center bg-nb-2F63AE rounded-full hover:bg-white svg-2F63AE transition-all">
                                    <Dropzone noDrag={true} onDrop={(e) => { }}>
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
                        <div className='w-full h-0.25 my-4.375 bg-nb-222325' />

                        {/* 图片列表 */}
                        <ul>
                            {stores.convertJpgStore.imgListConvertData.map((item, idx) => {
                                return (
                                    // <ImgInfoList key={item.name + idx} item={item} idx={idx} />
                                    <li key={item.name + idx} className='h-14 w-full flex flex-row items-center'>
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
                                                        {(NBString.getImgSizeMb(item.size) < 5 && stores.convertJpgStore.isStartConvert) ?
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
                                if (stores.convertJpgStore.process.length != 0) {
                                    for (let i = 0; i < stores.convertJpgStore.jpgUrl.length; i++) {
                                        const link = document.createElement('a')
                                        link.download='defaultName'
                                        link.style.display = 'none'
                                        console.log(stores.convertJpgStore.jpgUrl[i])
                                        link.href = stores.convertJpgStore.jpgUrl[i]
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
                            className={`absolute bottom-9 left-1/2 -translate-x-1/2 w-60.5 h-14.5 rounded-4.5 font-p20-FFFFFF-w700 hover:opacity-90 ${stores.convertJpgStore.isStartConvert ? "bg-nb-191919" : "bg-nb-2F63AE"}`}>
                            <span>{stores.convertJpgStore.process.length != 0 ? `下载全部图像（${stores.convertJpgStore.process.length}）` : stores.convertJpgStore.isStartConvert ? "加载中..." : "转换至JPG图片"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )

})

export default Index;