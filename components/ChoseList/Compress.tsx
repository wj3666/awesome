import { IconAdd, IconDesktop, IconDropbox, IconFolderGoogleDrive, } from "../Svg";
import Dropzone from 'react-dropzone';
import stores from "../../lib/stores/stores";
import { NBString } from "../../lib/util/tools";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import Compressor from 'compressorjs';
import { Circle } from 'rc-progress';


const Index = observer(() => {
    const onDrop = (e) => {
        // console.log(e)
        stores.compressStore.setImgListData(e);
        stores.compressStore.changeIsShowChoseList(true);
    }
    const compressImg = () => {
        stores.compressStore.onChangeStartCompress(true);
        for (let i = 0; i < stores.compressStore.imgListData.length; i++) {
            if (stores.appStore.userPrivilege) {
                new Compressor(stores.compressStore.imgListData[i], {
                    quality: 0.6,
                    success(result: any) {
                        const formData = new FormData();
                        console.log(result)
                        formData.append('file', result, result.name);
                        stores.compressStore.upload(formData, i)
                        stores.compressStore.setImgListCompressData(formData.get("file"), i);
                    },
                    error(err) {
                        console.log(err.message);
                    },
                })
            } else {
                if (NBString.getImgSizeMb(stores.compressStore.imgListData[i].size) < 5) {
                    new Compressor(stores.compressStore.imgListData[i], {
                        quality: 0.6,
                        success(result: any) {
                            const formData = new FormData();
                            formData.append('file', result, result.name);
                            stores.compressStore.upload(formData, i)
                            stores.compressStore.setImgListCompressData(formData.get("file"), i);
                        },
                        error(err) {
                            console.log(err.message);
                        },
                    })
                }
            }
        }
    }

    return (
        <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
            <div className="outer-container">
                <div className="inner-container">
                    <div className='flex-none relative w-72.5 h-full px-4.5 bg-nb-2E2F30 text-left '>
                        {/* 标题 */}
                        <div>
                            <p className='py-5.25 font-p24-FFFFFF-w600'>{stores.compressStore.isStartCompress ? "正在压缩图片…" : "压缩图像文件"}</p>
                            <p className='font-p14-CFD0E4-w400 pr-7'>所有图片都将被压缩，同时保持最佳质量和大小比例</p>
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
                        <div className='w-full h-0.25 my-4.375 bg-nb-222325' />

                        {/* 图片列表 */}
                        <ul>
                            {stores.compressStore.imgListCompressData.map((item, idx) => {
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
                                                        {(NBString.getImgSizeMb(item.size) < 5 && stores.compressStore.isStartCompress) ?
                                                            <div className='w-4 h-4 mt-1'>
                                                                <Circle strokeWidth={6} percent={item.process} />
                                                            </div>
                                                            :
                                                            <div className='font-p13-A2A3BA-w400 mt-1'>
                                                                {!stores.appStore.userPrivilege ? NBString.getImgSizeMb(item.size) >= 5 && <p>(图片超过5MB<Link href={'/subscribe'} ><span className="font-p13-4C90FE-w600">升级</span></Link>继续压缩)</p> : <p>等待中</p>}
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
                                if (stores.compressStore.process.length != 0) {
                                    for (let i = 0; i < stores.compressStore.imgUrl.length; i++) {
                                        const link = document.createElement('a')
                                        link.style.display = 'none'
                                        link.href = stores.compressStore.imgUrl[i]
                                        link.setAttribute(
                                            'download', ''
                                        )
                                        document.body.appendChild(link)
                                        link.click()
                                    }
                                } else {
                                    if (stores.compressStore.imgListCompressData.length == 1) {
                                        if (NBString.getImgSizeMb(stores.compressStore.imgListCompressData[0].size) >= 5) {
                                            if (!stores.appStore.userPrivilege) {
                                                return
                                            }
                                        }
                                    }
                                    compressImg()
                                }
                            }}
                            className={`absolute bottom-9 left-1/2 -translate-x-1/2 w-60.5 h-14.5 rounded-4.5 font-p20-FFFFFF-w700 hover:opacity-90 ${stores.compressStore.isStartCompress ? "bg-nb-191919" : "bg-nb-2F63AE"}`}>
                            <span>{stores.compressStore.process.length != 0 ? `下载全部图像（${stores.compressStore.process.length}）` : stores.compressStore.isStartCompress ? "加载中..." : "压缩多个图像文件"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})

type ImgInfoListProps = {
    item: any,
    idx: number
}

const ImgInfoList = observer(({ item, idx }: ImgInfoListProps) => {
    return (
        <li className='h-14 w-full flex flex-row items-center'>
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
                            <a href={item.imgUrl} download className="font-p13-4C90FE-w600 underline">下载</a>
                        </div>
                        :
                        <>
                            {(NBString.getImgSizeMb(item.size) < 5 && stores.compressStore.isStartCompress) ?
                                <div className='w-4 h-4 mt-1'>
                                    <Circle strokeWidth={6} percent={item.process} />
                                </div>
                                :
                                <div className='font-p13-A2A3BA-w400 mt-1'>
                                    {NBString.getImgSizeMb(item.size) >= 5 ? <p>(图片超过5MB<Link href={'/subscribe'} ><span className="font-p13-4C90FE-w600">升级</span></Link>继续压缩)</p> : <p>等待中</p>}
                                </div>
                            }
                        </>
                }
            </div>
        </li>
    )
})

export default Index;


