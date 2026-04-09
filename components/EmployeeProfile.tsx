import { Mail, IdCard, Laptop } from "lucide-react";

export default function EmployeeProfile() {
  return (
    <div className="min-h-screen bg-[#f7f5fb] p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800">
        Employee Profile
      </h1>
      <p className="text-gray-500 mt-2">
        Manage your identity and secured access endpoints.
      </p>

      {/* Layout */}
      <div className="grid grid-cols-3 gap-8 mt-8">
        
        {/* LEFT SIDE (1/3) */}
        <div className="col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            
            {/* Avatar */}
            <div className="flex justify-center relative">
              <div className="w-28 h-28 rounded-full border-4 border-purple-500 flex items-center justify-center bg-orange-400 text-white text-xl font-bold">
                EA
              </div>

              {/* Camera icon */}
              <div className="absolute bottom-2 right-[90px] bg-purple-500 p-2 rounded-full text-white text-xs">
                📷
              </div>
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold text-center mt-4">
              Edini Amare
            </h2>
            <p className="text-center text-purple-500 text-sm mt-1">
              IS TRAINEE
            </p>

            {/* Email */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3 mt-6">
              <Mail size={18} className="text-purple-500" />
              <span className="text-sm text-gray-700">
                Ediniamare@cbe.com.et
              </span>
            </div>

            {/* Employee ID */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3 mt-4">
              <IdCard size={18} className="text-purple-500" />
              <span className="text-sm text-gray-700">
                CBE001214
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE (2/3) */}
        <div className="col-span-2">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Laptop className="text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Registered Devices
              </h2>
            </div>

            <span className="text-purple-500 text-sm cursor-pointer">
              Manage All
            </span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            
            

          </div>
        </div>
      </div>
    </div>
  );
}