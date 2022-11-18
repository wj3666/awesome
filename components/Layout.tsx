import React, { ReactNode, useEffect } from 'react'
import Sidebar from './Sidebar'
import TopHeader from './TopHeader'
import useStore from '../lib/stores/stores';
import { observer } from 'mobx-react'
import axios from 'axios';
import Contact from './Contact';


type Props = {
  currenTal?: string;
  children?: ReactNode
}
const Layout = ({ currenTal = "HOME", children }: Props) => {
  const { appStore, homeStore } = useStore()
  useEffect(() => {

  }, [])
  return (
    <div className="flex flex-col w-full min-h-screen bg-nb-0E0E12 ">
      <div className='flex flex-col  items-center w-full h-screen  text-center '>
        {/* 导航栏 */}
        <div className='fixed top-0 w-full z-[51]'>
          <TopHeader />
        </div>
        <div className={`flex flex-row w-full`}>

          {/* 侧边栏 */}
          <div className={`flex-none sticky top-0 h-screen ${appStore.showMenu ? " transition-width duration-300 1279sc-max:w-17  w-20 " : " transition-width duration-500  1279sc-max:w-17  w-60.5"}`}>
            <Sidebar />
          </div>
          <div className="flex-grow flex flex-col bg-nb-0E0E12 ">
            {children}
          </div>
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default observer(Layout)