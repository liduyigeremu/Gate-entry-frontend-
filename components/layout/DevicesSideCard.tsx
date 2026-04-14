import { ShieldCheck } from "lucide-react"

const DevicesSideCard = () => {
    return (
        <div className="devices-side-sard
        flex flex-col p-5">
            <div className="bg-fuchsia-200 relative text-black text-xs  flex w-fit p-1 px-4 items-center rounded-4xl">
                <div className="size-4 mr-2">
                    <ShieldCheck className="size-full" />
                </div>
                <div>
                    CBE DEVICE ENTRY PORTAL
                </div>
            </div>
            <div className="text-5xl text-black font-bold flex flex-wrap py-4">
                Register Your <span className="text-primary px-2">Personal</span> Devices
            </div>
            <p className="text-md flex flex-wrap">
                Enroll your device to ensure smooth identification at all access points.
            </p>
        </div>
    )
}

export default DevicesSideCard
