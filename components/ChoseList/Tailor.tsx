import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import stores from "../../lib/stores/stores";
import IconButton from "../IconButton";
import { IconDropbox, IconFolderGoogleDrive, IconLarge, IconSave, IconSmall } from "../Svg";

const Index = observer(() => {

    return (
        <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
            <div className="outer-container">
                <div className="inner-container">
                    <div className='flex-none relative w-72.5 h-full px-4.5 bg-nb-2E2F30 text-left'>
                        {/* 标题 */}

                        <p className='py-5.25 font-p24-FFFFFF-w600'>裁剪选项</p>

                        {/* 水平线 */}
                        <div className='w-full h-0.25 bg-nb-222325' />
                        <p className='py-5.25 font-p13-CFD0E4-w400'>裁剪图片为以下尺寸：</p>
                        {/* 参数 */}
                        <div className="mt-2 grid grid-cols-1 gap-y-6.5">
                            {/* 宽度 */}
                            <div className="flex justify-between items-center">
                                <span className="font-p13-FFFFFF-w400">宽度：</span>
                                <div className=" h-7.5 p-1.5 bg-nb-464546 flex items-center rounded-md">
                                    <input
                                        value={stores.tailorStore.cropperBoxWidth}
                                        onChange={(e) => {
                                            stores.tailorStore.setCropperBoxWidth(Number(e.target.value));
                                        }}
                                        readOnly={false}
                                        type="number"
                                        className="w-23 h-full bg-nb-464546 outline-none focus:text-white font-p13-A2A3BA-w400"
                                    />
                                    <div className="ml-2 flex items-center">
                                        <span className="font-p13-CFD0E4-w400">px</span>
                                        <div className="flex flex-col ml-1.5">
                                            <button
                                                onClick={() => { stores.tailorStore.onChangeCropperBoxWidth(true) }}
                                            >
                                                <IconLarge />
                                            </button>
                                            <button onClick={() => { stores.tailorStore.onChangeCropperBoxWidth(false) }} className="mt-1"><IconSmall /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 高度 */}
                            <div className="flex justify-between items-center">
                                <span className="font-p13-FFFFFF-w400">高度：</span>
                                <div className=" h-7.5 p-1.5 bg-nb-464546 flex items-center rounded-md">
                                    <input
                                        value={stores.tailorStore.cropperBoxHeight}
                                        onChange={(e) => {
                                            stores.tailorStore.setCropperBoxHeight(Number(e.target.value));
                                        }}
                                        readOnly={false}
                                        type="number"
                                        className="w-23 h-full bg-nb-464546 outline-none focus:text-white font-p13-A2A3BA-w400"
                                    />
                                    <div className="ml-2 flex items-center">
                                        <span className="font-p13-CFD0E4-w400">px</span>
                                        <div className="flex flex-col ml-1.5">
                                            <button className=""><IconLarge /></button>
                                            <button onClick={() => { stores.tailorStore.onChangeCropperBoxHeight(false) }} className="mt-1"><IconSmall /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 位置X */}
                            <div className="flex justify-between items-center">
                                <span className="font-p13-FFFFFF-w400">位置X：</span>
                                <div className=" h-7.5 p-1.5 bg-nb-464546 flex items-center rounded-md">
                                    <input
                                        value={stores.tailorStore.cropperBoxX}
                                        onChange={(e) => {
                                            stores.tailorStore.setCropperBoxX(Number(e.target.value));
                                        }}
                                        readOnly={false}
                                        type="number"
                                        className="w-23 h-full bg-nb-464546 outline-none focus:text-white font-p13-A2A3BA-w400"
                                    />
                                    <div className="ml-2 flex items-center">
                                        <span className="font-p13-CFD0E4-w400">px</span>
                                        <div className="flex flex-col ml-1.5">
                                            <button onClick={() => { stores.tailorStore.onChangeCropperBoxX(true) }} className=""><IconLarge /></button>
                                            <button onClick={() => { stores.tailorStore.onChangeCropperBoxX(false) }} className="mt-1"><IconSmall /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 位置Y */}
                            <div className="flex justify-between items-center">
                                <span className="font-p13-FFFFFF-w400">位置Y：</span>
                                <div className=" h-7.5 p-1.5 bg-nb-464546 flex items-center rounded-md">
                                    <input
                                        value={stores.tailorStore.cropperBoxY}
                                        onChange={(e) => {
                                            stores.tailorStore.setCropperBoxY(Number(e.target.value));
                                        }}
                                        readOnly={false}
                                        type="number"
                                        className="w-23 h-full bg-nb-464546 outline-none focus:text-white font-p13-A2A3BA-w400"
                                    />
                                    <div className="ml-2 flex items-center">
                                        <span className="font-p13-CFD0E4-w400">px</span>
                                        <div className="flex flex-col ml-1.5">
                                            <button onClick={() => { stores.tailorStore.onChangeCropperBoxY(true) }} className=""><IconLarge /></button>
                                            <button onClick={() => { stores.tailorStore.onChangeCropperBoxY(false) }} className="mt-1"><IconSmall /></button>
                                        </div>
                                    </div>
                                </div>
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
                            {stores.tailorStore.isCropper ? "下载该图像" : "裁剪图片"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})



export default Index;