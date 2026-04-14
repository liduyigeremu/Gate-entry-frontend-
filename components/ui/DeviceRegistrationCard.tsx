'use client'

import SubmitBtn from "./SubmitBtn";
import CustomListBox from "./CustomListBox";
import CustomImageDropzone from "./CustomImageDropzone";
import { Camera, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deviceRegisterSchema, type RegisterDeviceInput } from "@/schemas/deviceRegister.schema";
import { LaptopBrands } from "../lib/constants/brands";

const DeviceRegistrationCard = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<RegisterDeviceInput>({
    resolver: zodResolver(deviceRegisterSchema),
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: {
      laptopBrand: "",
    }
  })

  const onSubmit = async (data: RegisterDeviceInput) => {
    
  }

  return (
    <div className="bg-white flex min-w-fit w-full items-center justify-center rounded-4xl shadow-md p-5 duration-200
    md:w-180
    lg:min-w-fit lg:w-full lg:max-w-200">
      
      <form noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="device-register-form
      min-w-fit w-full h-fit">
        <div className="instruct-label
        text-md font-bold flex w-full py-2 justify-center">
            <div className="size-5 bg-fuchsia-100 p-0.5 mr-2 rounded-full">
              <Info className="size-full text-primary" />
            </div>
            Devices Details
          </div>

        <div className="text-field
        flex w-full h-fit">

          <div className="flex flex-col w-1/2 pr-4">

            <CustomListBox
            name="laptopBrand"
            label="LAPTOP BRAND"
            control={control}
            options={LaptopBrands}
            placeholder="Select your laptop brand"
            />
            {errors.laptopBrand
            && <div className="text-red-500 text-sm w-full pl-6">
                    {errors.laptopBrand.message}
                </div>
                }
                      
            <label
            htmlFor="model"
            className="model-label
            font-semibold text-sm w-fit py-2 tracking-wider">
              MODEL
            </label>
            <input {...register("model")}
            id="model"
            type="text"
            placeholder="e.g. MacBook Pro M3"
            className="model-input
            w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200"
            />
            {errors.model
            && <div className="text-red-500 text-sm w-full pl-6">
                    {errors.model.message}
                </div>
                }

            <label
            htmlFor="serialNumber"
            className="serial-number-label
            font-semibold text-sm flex w-fit py-2 tracking-wider">
              SERIAL NUMBER
            </label>
            <input {...register("serialNumber")}
            id="serialNumber"
            type="text"
            placeholder="e.g. SN-8293-XAQ-2024"
            className="w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200"
            />
            {errors.serialNumber
            && <div className="text-red-500 text-sm w-full pl-6">
                    {errors.serialNumber.message}
                </div>
                }

          </div>
          <div className="flex flex-col w-1/2 pl-4">

            <label
            htmlFor="macAddress"
            className="mac-address-label
            font-semibold text-sm w-fit py-2 tracking-wider">
              MAC ADDRESS
            </label>
            <input {...register("macAddress")}
            id="macAddress"
            type="text"
            placeholder="e.g. 00:00:00:00:00:00"
            className="mac-address-input
            w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200"
            />

            <label
            htmlFor="assetTag"
            className="asset-tag-label
            font-semibold text-sm w-fit py-2 tracking-wider">
              ASSET TAG
            </label>
            <input {...register("assetTag")}
            id="assetTag"
            type="text"
            placeholder="e.g. sAURA-2024-001"
            className="asset-tag-input
            w-full py-3 px-6 border-2 border-gray-200 rounded-4xl placeholder-gray-500
            focus:outline-none focus:border-fuchsia-200"
            />
            
          </div>

        </div>

        <div className="pic-field
        flex flex-col w-full h-fit px-4 py-2 items-center">

          <div className="instruct-label
          text-md font-bold flex w-full py-2 justify-center">
            <div className="size-5 bg-fuchsia-100 p-0.5 mr-2 rounded-full">
              <Camera className="size-full text-primary" />
            </div>
            Photo Verification
          </div>
          <div className="img-inputs
          flex w-full justify-center">
            
            <div className="flex flex-col mr-3 items-center">
              <CustomImageDropzone
              name="frontImage"
              control={control}
              placeholder="Front View"
              />
              {errors.frontImage
                && <div className="text-red-500 text-sm w-fit p-2">
                        {errors.frontImage.message}
                    </div>
                    }
            </div>

            <div className="flex flex-col ml-3 items-center">
              <CustomImageDropzone
              name="backImage"
              control={control}
              placeholder="Back View"
              />
              {errors.backImage
                && <div className="text-red-500 text-sm w-fit p-2">
                        {errors.backImage.message}
                    </div>
                    }
            </div>

          </div>

        </div>

        <SubmitBtn
        label={isSubmitting ? "Registering Device" : "Register Device"}
        isDisable={isSubmitting ? true : false}
        />

      </form>
      
    </div>
    
  )
}

export default DeviceRegistrationCard;