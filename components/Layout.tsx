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
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-nb-0E0E12 ">
      <div className='flex flex-col  items-center  w-screen h-screen  text-center '>
        {/* 导航栏 */}
        <div className='fixed w-full  z-[51]'> 
          <TopHeader />
        </div>
        <div className={`flex flex-row w-full h-full  `}>
        
          {/* 侧边栏 */}          
            <div className={`h-full  1599sc-max:h-1024`}>
              <Sidebar />
          </div>
          <div className=" flex flex-col h-full w-full bg-nb-0E0E12 1599sc-max:h-1024 ">
            {children}
          
          </div>
        </div>
      </div>
      <Contact/>
    </div>
  )
}

export default observer(Layout)