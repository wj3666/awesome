
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const Payfailure = () => {
    return (
        <>
            <div className='flex flex-row justify-center items-center w-screen h-screen  bg-bg-succeed'>
                <div className='flex flex-col items-center h-140 w-94.5 '>
                    <div className='h-20'><img src='/Logo_AwesomeImg.svg' /></div>
                    <div className='w-74 h-62'></div>
                    <div className='flex flex-col h-20 w-full justify-center  items-center  space-y-3'>
                        <p className='font-p26-FFFFFF-w400 font-sans'>Sign up succeed!</p>
                        <p className='font-p26-FFFFFF-w400 font-sans'>Welcome to AwesomeIMG</p>
                    </div>
                    <div className='flex flex-row justify-center items-center w-full h-20'>
                        <button className='h-10.5 w-74.5 bg-nb-2F63AE rounded-2xl font-p16-FFFFFF-w700'>Start using AwesomeIMG</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'subscrible']),
    },
})
export default Payfailure