
import DevicesSideCard from "@/components/layout/DevicesSideCard";
import DeviceRegistrationCard from "@/components/ui/devices/DeviceRegistrationCard"

const page = () => {
  return (
      <div className="flex w-full h-full">
        <div className="devices-side-Card hidden
        w-full h-full items-end justify-center
        lg:flex lg:flex-col lg:w-2/5">
          <DevicesSideCard />
        </div>

        <div className="flex w-full h-full items-center justify-center p-5
        lg:w-3/5">
          <DeviceRegistrationCard />
        </div>
      </div>
  )
}

export default page;
