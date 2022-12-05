import { Dialog, Transition } from '@headlessui/react'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import React, { Fragment, useState } from 'react'
import stores from '../lib/stores/stores'

function Contact() {
  const { appStore } = stores
  const [isOpen, setIsOpen] = useState(true)
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [contents, setContents] = useState('')
  const [showSccess, setShowSccess] = useState(false)
  const {t}=useTranslation('subscrible')
  return (
    <Transition show={appStore.showContactModel} as={Fragment}
    enter="transform transition duration-400"
    enterFrom="opacity-0  "
    enterTo="opacity-100  "
   
    >
      <Dialog
        as="div"
        className={`fixed inset-0 z-[100]  `}
        onClose={() => appStore.setShowContactModel(false)}
      >
        <div className='fixed inset-0 overflow-y-auto '>
          <div className='flex h-full  overflow-hidden items-center justify-center '>
            <Dialog.Panel className="w-163 h-154 relative mx-auto mt-20 rounded-2xl  bg-nb-sidebar-grey">
              <div className='h-12 w-full flex flex-row justify-end items-center '><button className='mr-2' onClick={() => appStore.setShowContactModel(false)}><Cancel /></button></div>
              <div className='w-full h-22 flex flex-col justify-center  items-center space-y-3 '>
                <img src='/Logo_AwesomeImg.svg' />
                <p className='font-p15-C8C8C8-w400'>{t('contact.connect')}</p>
              </div>
              {
                !showSccess ?
                  <div>
                    <div className='flex flex-row justify-around h-24 w-full '>
                      <div className='flex flex-col h-full w-74  justify-center space-y-2'>
                        <p className='font-p15-CFD0E4-w500'>{t('contact.email')}</p>
                        <input type="text" onChange={(e) => { setEmail(e.target.value) }} value={email} className={`w-full h-10.5 rounded-xl border px-10  bg-email-logo bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D caretColor ${email === '' ? "" : "font-p15-FFFFFF-w500"} `} placeholder="AwesomeIMG@gmail.com" />
                      </div>
                      <div className='flex flex-col h-full w-74  justify-center space-y-2'>
                        <p className='font-p15-CFD0E4-w500'>{t('contact.name')}</p>
                        <input type="text" onChange={(e) => { setUserName(e.target.value) }} value={userName} className={`w-full h-10.5 rounded-xl border px-4  bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D caretColor ${userName === '' ? "" : "font-p15-FFFFFF-w500"} `} placeholder={t('contact.nameHint')} />
                      </div>
                    </div>
                    <div className='w-full h-70 flex flex-row justify-center '>
                      <textarea onChange={(e) => { setContents(e.target.value) }} value={contents} className={`w-156 px-3 h-70 py-3 rounded-xl border   bg-no-repeat bg-left-2 border-nb-CFD0E466 bg-nb-CFD0E44D caretColor ${contents === '' ? "" : "font-p15-FFFFFF-w500"} `} placeholder={t('contact.content')} ></textarea>
                    </div>
                    <div className='flex flex-row justify-end items-center h-24  w-full'>
                      <button className='w-49 h-13.25 bg-nb-4C90FE rounded-2xl mr-4 font-p16-FFFFFF-w500' onClick={() => setShowSccess(true)}>{t('contact.send')}</button>
                    </div>
                  </div> :
                  <Transition.Child
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0 "
                    enterTo="opacity-100 "
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className='flex flex-row justify-center items-center  w-full h-70  '><Succeed /></div>
                    <p className='font-p26-FFFFFF-row  text-center' >{t('contact.succeed')}</p>
                    <button className='font-p16-FFFFFF-w700 w-74.5 h-10.5 bg-nb-2F63AE rounded-2xl mt-10 ml-45 ' onClick={()=>{appStore.setShowContactModel(false);setShowSccess(false)}}>{t('contact.closed')}</button>
                  </Transition.Child>
              }
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>

    </Transition>
  )
}
const Cancel = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="#0E0E0E" />
    <path d="M21 9L9 21" stroke="#A2A3BC" stroke-width="2" />
    <path d="M9 9L21 21" stroke="#A2A3BC" stroke-width="2" />
  </svg>

)
const Succeed = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="70" cy="70" r="65" stroke="#4AC96C" stroke-width="10" />
    <path d="M32.0835 68.9002L63.0259 100.917L107.333 40.8334" stroke="#4AC96C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

)
export default observer(Contact)