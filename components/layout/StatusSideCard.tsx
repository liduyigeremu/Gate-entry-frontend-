const StatusSideBox = () => {
  return (
    <div className="hidden lg:flex w-1/2 h-full items-center justify-start px-10">

      <div className="flex flex-col max-w-md">

        <div className="bg-purple-200 text-xs px-3 py-1 rounded-full w-fit mb-6">
          DEVICE STATUS PORTAL
        </div>

        <h1 className="text-5xl font-bold leading-tight">
          Track Your <br />
          <span className="text-purple-600">Device Status</span>
        </h1>

        <p className="text-gray-500 mt-6">
          Monitor approval, verification, and entry status of your registered devices in real-time.
        </p>

      </div>
    </div>
  )
}

export default StatusSideBox;