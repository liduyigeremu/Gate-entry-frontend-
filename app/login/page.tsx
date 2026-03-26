import React from 'react'
import LoginBox from '@/components/LoginBox'
import SideInfoBox from '@/components/SideInfoBox'
const page = () => {
  return (
    <div className='login-page-container font-roboto bg-fuchsia-50
    flex w-full h-screen items-center justify-center'>
      <div className='leftside hidden text-gray-300
      w-full h-full items-center justify-end
      lg:flex lg:w-1/2'>
        <div className='sideinfo-component
        flex min-w-120 max-w-180 min-h-150 w-full h-4/5 px-8 items-center duration-200
        '>
          <SideInfoBox />
        </div>
      </div>
      <div className='rightside text-gray-600
      flex flex-col w-full h-full items-center justify-center
      lg:w-1/2 lg:justify-start lg:flex-row'>
        <div className='flex w-full justify-center text-4xl text-white font-bold py-10
        lg:hidden'>
          <h1 className='flex flex-wrap'>Device Entry Portal</h1>
        </div>
        <div className='login-component bg-white
        flex w-full h-4/5 min-h-150 p-8 mx-4 items-center rounded-3xl shadow-md duration-200
        md:w-150 md:h-3/5
        lg:min-w-120 lg:max-w-150 lg:w-full lg:h-4/5'>
          <LoginBox />
        </div>
      </div>
    </div>
  )
}

export default page
