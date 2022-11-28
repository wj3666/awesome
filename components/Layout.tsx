import React, { ReactNode, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'
import stores from '../lib/stores/stores';
import { observer } from 'mobx-react'
import Contact from './Contact';
import { useRouter } from 'next/router';
import CompressChoseList from './ChoseList/Compress';
import TailorChoseList from './ChoseList/Tailor';
import Adjust from './ChoseList/Adjust';
import ConvertJpg from './ChoseList/ConvertJpg'

type Props = {
  currenTal?: string;
  children?: ReactNode
}
const Layout = ({ currenTal = "HOME", children }: Props) => {
  const router = useRouter();
  const { appStore, loginSignStore } = stores
  useEffect(() => {
    appStore.getUsers()
    if (localStorage.getItem("token") == null) {
      loginSignStore.setTokenMessage(false)
    }
  }, [])
  return (
    <div className="flex flex-col w-full min-h-screen bg-nb-0E0E12 ">
      <div className='flex flex-col  items-center w-full h-screen  text-center '>
        {/* 导航栏 */}
        <div className='fixed top-0 w-full z-[51]'>
          <TopHeader />
        </div>
        <div className={`flex flex-row w-full`}>

          {/* 左侧边栏 */}
          <div className={`flex-none sticky top-0 h-screen ${appStore.showMenu ? " transition-width duration-300 1279sc-max:w-17  w-20 " : " transition-width duration-500  1279sc-max:w-17  w-60.5"}`}>
            <Sidebar />
          </div>
          {/* 内容 */}
          <div className="flex-grow flex flex-col bg-nb-0E0E12 pt-23">
            {children}
          </div>
          {/* 右侧边栏 */}
          {
            router.pathname != "/home" &&
              router.pathname === "/compress" ?  // 压缩
              stores.compressStore.isShowChoseList && <CompressChoseList />
              :
              router.pathname === "/tailor" ?  // 裁剪
                stores.tailorStore.isShowChoseList && <TailorChoseList />
                :
                router.pathname === "/adjust" ?  // 调整
                  stores.adjustStore.isShowChoseList && <Adjust />
                  :
                  router.pathname === "/convertjpg" ?  // 调整
                    stores.convertJpgStore.isShowChoseList && <ConvertJpg />
                    :
                    <div></div>
          }
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default observer(Layout);