'use client'

import LaptopBrandsSelect from "./LaptopBrandsSelect";
import { FileUp } from "lucide-react";

const DeviceRegistrationForm = () => {

  return (
    <form className="min-w-fit w-full h-fit bg-white rounded-4xl shadow-md p-4">
        <div className="flex w-full h-fit">

          <div className="flex flex-col w-1/2 pr-4">

            <label className="brand-label
            font-semibold text-sm w-fit py-2 tracking-wider">
              BRAND
            </label>
            <LaptopBrandsSelect />
            
            <label className="model-label
            font-semibold text-sm w-fit py-2 tracking-wider">
              MODEL
            </label>
            <input placeholder="e.g. MacBook Pro M3" type="text" required
            className="model-input
            w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200"
            />

            <label className="serial-number-label
            font-semibold text-sm flex w-fit py-2 tracking-wider">
              SERIAL NUMBER
            </label>
            <input placeholder="e.g. SN-8293-XAQ-2024" type="text" required 
            className="w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200"
            />

          </div>
          <div className="flex flex-col w-1/2 pl-4">

            <label className="mac-address-label
            font-semibold text-sm w-fit py-2 tracking-wider">
              MAC ADDRESS
            </label>
            <input placeholder="e.g. 00:00:00:00:00:00" type="text"
            className="mac-address-input
            w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200"
            />

            <label className="asset-tag-label
            font-semibold text-sm w-fit py-2 tracking-wider">
              ASSET TAG
            </label>
            <input placeholder="e.g. sAURA-2024-001" type="text"
            className="asset-tag-input
            w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200"
            />
            
          </div>

        </div>

        <div className="pic-field
        flex flex-col w-full h-fit px-4 py-4 items-center">
          <div className="font-semibold text-sm w-fit pb-4 tracking-wider">
            PHOTO VERIFICATION
          </div>
          <div className="flex w-full justify-center">
            <label className="flex flex-col min-w-50 h-50 mr-5 border-2 border-dashed border-fuchsia-300 items-center justify-center rounded-4xl">

              <div className="size-10 p-2 bg-fuchsia-100 rounded-full">
                <FileUp className="size-full text-primary" />
              </div>
              <div className="font-semibold p-1">
                Front View
              </div>
              <div className="text-xs text-gray-400">
                DROP IMAGE OR BROWSE
              </div>
              <input type="file"
              className="hidden"
              accept="image/*"
              />

            </label>
            <label className="flex flex-col min-w-50 h-50 ml-5 border-2 border-dashed border-fuchsia-300 items-center justify-center rounded-4xl">

              <div className="size-10 p-2 bg-fuchsia-100 rounded-full">
                <FileUp className="size-full text-primary" />
              </div>
              <div className="font-semibold p-1">
                Back View
              </div>
              <div className="text-xs text-gray-400">
                DROP IMAGE OR BROWSE
              </div>
              
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn
        text-white text-lg font-bold bg-primary flex w-full py-4 my-4 justify-center rounded-4xl shadow-md shadow-purple-300 duration-200
        hover:opacity-70 hover:cursor-pointer hover:duration-200
        active:shadow-none active:opacity-30">
          Register Device
        </button>

    </form>
  )
}

export default DeviceRegistrationForm;