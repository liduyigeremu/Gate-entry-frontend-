'use client'

import SubmitBtn from "./SubmitBtn";
import CustomListBox from "./CustomListBox";
import CustomImageDropzone from "./CustomImageDropzone";
import { Camera, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deviceRegisterSchema, type RegisterDeviceInput } from "@/schemas/deviceRegister.schema";
import { DeviceTypes, DeviceBrands } from "../lib/constants/devices";
import { useEffect } from "react";

const DeviceRegistrationCard = () => {
  //initializing RHF
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<RegisterDeviceInput>({
    resolver: zodResolver(deviceRegisterSchema),
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: {
      deviceType: "laptop",
      brand: "",
    }
  });

  //use watch() to get the current selected deviceType and reset the brand value upon changing
  const selectedDeviceType = watch("deviceType");

  useEffect(() => {
    setValue("brand", "");
  }, [selectedDeviceType, setValue])

  const onSubmit = async (data: RegisterDeviceInput) => {
    console.log("submitted data:", data)
  }

  //save the currently selected brand lists on currentBrands, to use for ListBox props
  const currentBrands = selectedDeviceType ? DeviceBrands[selectedDeviceType] : [];

  return (
    <div className="bg-card flex min-w-fit w-full p-5 items-center justify-center rounded-4xl 
    shadow-input duration-200
    md:w-180
    lg:min-w-fit lg:w-full lg:max-w-200">
      
      <form noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="device-register-form bg-amber-40
      min-w-fit w-full h-fit
      md:w-150
      lg:max-w-170 lg:w-full">
        <div className="instruct-label
        text-md font-bold flex w-full py-3 items-center justify-center">
            <div className="size-7 bg-icon p-1.5 mr-2 rounded-full">
              <Info className="size-full text-accent" />
            </div>
            Devices Details
          </div>

        <div className="text-field
        flex w-full h-fit">

          <div className="left-side-field
          flex flex-col w-1/2 pr-4">

            <CustomListBox
            name="deviceType"
            label="DEVICE TYPE"
            control={control}
            options={DeviceTypes}
            placeholder="Select your device type"
            />
          
            <CustomListBox
            name="brand"
            label="BRAND"
            control={control}
            options={currentBrands}
            placeholder="Select your device brand"
            />
            {errors.brand
            && <div className="text-red-500 text-sm w-full pl-6">
                    {errors.brand.message}
                </div>
                }
                      
            <label
            htmlFor="model"
            className="model-label
            text-xs w-fit py-1 label
            md:py-2">
              MODEL
            </label>
            <input {...register("model")}
            id="model"
            type="text"
            placeholder="e.g. MacBook Pro M3"
            className="model-input
            w-full py-2 px-4 border border-input rounded-4xl placeholder-placeholder shadow-input
            focus:outline-none focus:border-input-focus
            md:py-3 md:px-6 md:mb-2"
            />
            {errors.model
            && <div className="text-red-500 text-sm w-full text-center">
                    {errors.model.message}
                </div>
                }

          </div>
          <div className="right-side-field
          flex flex-col w-1/2 pl-4">

            <label
            htmlFor="serialNumber"
            className="serial-number-label
            text-xs flex w-fit py-1 label
            md:py-2">
              SERIAL NUMBER
            </label>
            <input {...register("serialNumber")}
            id="serialNumber"
            type="text"
            placeholder="e.g. SN-8293-XAQ-2024"
            className="w-full py-2 px-4 border border-input rounded-4xl placeholder-placeholder shadow-input
            focus:outline-none focus:border-input-focus
            md:py-3 md:px-6 md:mb-2"
            />
            {errors.serialNumber
            && <div className="text-red-500 text-sm w-full pl-6">
                    {errors.serialNumber.message}
                </div>
                }
            
            {/*
            if macAddress and assetTag to be render on deviceType
            for now render for laptop only to demonstrate the function
            */}
            {selectedDeviceType === "laptop" && 
            <>
            <label
            htmlFor="macAddress"
            className="mac-address-label
            text-xs flex w-fit py-1 label
            md:py-2">
              MAC ADDRESS
            </label>
            <input {...register("macAddress")}
            id="macAddress"
            type="text"
            placeholder="e.g. 00:00:00:00:00:00"
            className="mac-address-input
            w-full py-2 px-4 border border-input rounded-4xl placeholder-placeholder shadow-input
            focus:outline-none focus:border-input-focus
            md:py-3 md:px-6 md:mb-2"
            />

            <label
            htmlFor="assetTag"
            className="asset-tag-label
            text-xs flex w-fit py-1 label
            md:py-2">
              ASSET TAG
            </label>
            <input {...register("assetTag")}
            id="assetTag"
            type="text"
            placeholder="e.g. sAURA-2024-001"
            className="asset-tag-input
            w-full py-2 px-4 border border-input rounded-4xl placeholder-placeholder shadow-input
            focus:outline-none focus:border-input-focus
            md:py-3 md:px-6 md:mb-2"
            />
            </>
            }
            
          </div>

        </div>

        <div className="pic-field
        flex flex-col w-full h-fit px-4 py-2 items-center">

          <div className="instruct-label
          text-md font-bold flex w-full py-3 items-center justify-center">
            <div className="size-7 bg-icon p-1.5 mr-2 rounded-full">
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