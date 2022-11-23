import stores from "../../lib/stores/stores";
import { IconLarge, IconSmall } from "../Svg";

const Index = () => {
    return (
        <div className='flex-none w-72.5 pt-23 sticky top-0 h-screen'>
            <div className="outer-container">
                <div className="inner-container">
                    <div className='flex-none relative w-72.5 h-full px-4.5 bg-nb-2E2F30 text-left'>
                        {/* 标题 */}

                        <p className='py-5.25 font-p24-FFFFFF-w600'>裁剪选项</p>

                        {/* 水平线 */}
                        <div className='w-full h-0.25 bg-nb-222325' />
                        <p className='py-5.25 font-p13-CFD0E4-w400'>裁剪图片为以下尺寸 ：</p>
                        {/* 参数 */}
                        <div className="mt-2 grid grid-cols-1 gap-y-6.5">
                            {/* 宽度 */}
                            <div className="flex justify-between items-center">
                                <span className="font-p13-FFFFFF-w400">宽度：</span>
                                <div className=" h-7.5 p-1.5 bg-nb-464546 flex items-center rounded-md">
                                    <input value={stores.tailorStore.cropperBoxWidth} type="number" className="w-23 h-full bg-nb-464546 outline-none focus:text-white font-p13-A2A3BA-w400" />
                                    <div className="ml-2 flex items-center">
                                        <span className="font-p13-CFD0E4-w400">px</span>
                                        <div className="flex flex-col ml-1.5">
                                            <button className=""><IconLarge /></button>
                                            <button className="mt-1"><IconSmall /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 高度 */}
                            <div className="flex justify-between items-center">
                                <span className="font-p13-FFFFFF-w400">高度：</span>
                                <div className=" h-7.5 p-1.5 bg-nb-464546 flex items-center rounded-md">
                                    <input value={stores.tailorStore.cropperBoxHeight} type="number" className="w-23 h-full bg-nb-464546 outline-none focus:text-white font-p13-A2A3BA-w400" />
                                    <div className="ml-2 flex items-center">
                                        <span className="font-p13-CFD0E4-w400">px</span>
                                        <div className="flex flex-col ml-1.5">
                                            <button className=""><IconLarge /></button>
                                            <button className="mt-1"><IconSmall /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 位置X */}
                            <div className="flex justify-between items-center">
                                <span className="font-p13-FFFFFF-w400">位置X：</span>
                                <div className=" h-7.5 p-1.5 bg-nb-464546 flex items-center rounded-md">
                                    <input value={stores.tailorStore.cropperBoxX} type="number" className="w-23 h-full bg-nb-464546 outline-none focus:text-white font-p13-A2A3BA-w400" />
                                    <div className="ml-2 flex items-center">
                                        <span className="font-p13-CFD0E4-w400">px</span>
                                        <div className="flex flex-col ml-1.5">
                                            <button className=""><IconLarge /></button>
                                            <button className="mt-1"><IconSmall /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 位置Y */}
                            <div className="flex justify-between items-center">
                                <span className="font-p13-FFFFFF-w400">位置Y：</span>
                                <div className=" h-7.5 p-1.5 bg-nb-464546 flex items-center rounded-md">
                                    <input value={stores.tailorStore.cropperBoxY} type="number" className="w-23 h-full bg-nb-464546 outline-none focus:text-white font-p13-A2A3BA-w400" />
                                    <div className="ml-2 flex items-center">
                                        <span className="font-p13-CFD0E4-w400">px</span>
                                        <div className="flex flex-col ml-1.5">
                                            <button className=""><IconLarge /></button>
                                            <button className="mt-1"><IconSmall /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 调整按钮 */}
                        <button className="absolute bottom-9 left-1/2 -translate-x-1/2 w-60.5 h-14.5 rounded-4.5 font-p20-FFFFFF-w700 hover:opacity-90 bg-nb-2F63AE">
                            调整图像大小
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;