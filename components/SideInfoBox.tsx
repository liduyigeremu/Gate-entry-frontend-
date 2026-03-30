/*
SideinfoBox component - server side
*/

import Image from "next/image";

const SideInfoBox = () => {
  return (
    <div className="hidden-left-side
    hidden w-1/2 h-full p-5 pr-0 items-center justify-end
    lg:flex">

      <div className="side-info-box 
      bg-black relative flex flex-col w-full max-w-150 h-4/5 justify-between rounded-l-3xl
      shadow-[-3px_3px_5px_-3px_rgba(0,0,0,0.5)] duration-200">
        <div className="text-box
        flex flex-col h-1/3 justify-center p-2">
          
          <div className="text-5xl text-primary font-bold flex w-full h-fit p-3">
            <h2 className="flex flex-wrap w-full">
              Device Entry Portal
            </h2>
          </div>

          <div className="font-datatype text-lg text-white flex items-center w-full h-fit p-5">
            <h3 className="flex flex-wrap w-full">
              The Smart Solution for Seamless Device Entry and Secure Exit Management
            </h3>
          </div>

        </div>
        
        <div className="image-box
        relative w-full h-2/3">
          
          <Image src={'/sideinfo-box.png'} alt="sideinfo-box-img" sizes="" fill
          className='object-cover w-full h-full rounded-bl-3xl' />

          <div className="absolute top-0 left-0 right-0 h-7 bg-linear-to-t from-transparent to-black">
          </div>
          <div className="absolute top-10 right-0 bottom-0 w-7 bg-linear-to-r from-transparent to-white">
          </div>

        </div>
        
      </div>

    </div>
  )
}

export default SideInfoBox;