/*
AuthSideCard component - server side
*/

import Image from "next/image";
import sidePic from "@/public/images/sideinfo-box.jpeg";

const AuthSideCard = () => {
  return (
    <div className="hidden-left-side
    hidden w-1/2 h-full p-5 items-center justify-end
    lg:flex lg:pr-7">

      <div className="side-info-box
      relative flex flex-col w-full max-w-150 h-4/5 items-center justify-center duration-200">
        
        <div className="text-box
        flex flex-col h-fit justify-center">
          
          <h2 className="text-accent text-6xl font-extrabold flex flex-wrap w-full h-fit p-3">
            Device Entry Portal
          </h2>

          <h3 className="text-muted/70 text-lg text-center font-semibold flex flex-wrap w-full h-fit py-5 px-10 items-center">
            The Smart Solution for Seamless Device Entry and Secure Exit Management
          </h3>

        </div>
        
        <div className="image-box
        relative w-full h-100 shadow-md shadow-accent/70">
          
          <Image src={sidePic} alt="sideinfo-box-img" sizes="" fill
          className="object-fill w-full h-full rounded-sm" />

        </div>
        
      </div>

    </div>
  )
}

export default AuthSideCard;