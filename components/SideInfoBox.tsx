import React from 'react'

const SideInfoBox = () => {
  return (
    <div className="sideinfobox-container 
    flex flex-col w-full h-full bg-[url('/sideinfo-pic.png')] bg-cover p-6 rounded-2xl justify-between">

      <div className='flex flex-col'>
        <div className='flex w-full text-6xl text-fuchsia-800 font-bold py-4'>
            <h1 className='flex flex-wrap'>Device Entry Portal</h1>
        </div>
        <div className='flex w-full text-lg py-2'>
            <h2 className='flex flex-wrap'>The Smart Solution for Seamless Device Entry and Secure Exit Management</h2>
        </div>
      </div>

    </div>
  )
}

export default SideInfoBox
