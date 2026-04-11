import { Mail, IdCard, Laptop } from "lucide-react";

export default function EmployeeProfile() {
  return (
    <div className="w-screen min-h-screen bg-[#f7f5fb] px-12 py-8">
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
          <div className="bg-[#f1eef6] rounded-[30px] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e6e1ef] rounded-bl-[100px]" />
            
            {/* Avatar */}
            <div className="flex justify-center relative mt-4">
  <div className="w-28 h-28 rounded-full border-[6px] border-purple-400 flex items-center justify-center bg-orange-400 text-white text-xl font-bold">
    EA
  </div>

</div>
            {/* Name */}
            <h2 className="text-2xl font-semibold text-center mt-4 text-gray-800">
              Edini Amare
            </h2>
            <p className="text-center text-purple-500 text-xs mt-1 tracking-wide">
              IS TRAINEE
            </p>

            {/* Email */}
            <div className="bg-[#e9e4f0] rounded-full px-5 py-4 mt-6">
  <div className="flex items-center gap-3">
    <Mail size={18} className="text-purple-500" />
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">
        Email Address
      </p>
      <p className="text-sm text-gray-800">
        Ediniamare@cbe.com.et
      </p>
    </div>
  </div>
</div>

            {/* Employee ID */}
            <div className="bg-[#e9e4f0] rounded-full px-5 py-4 mt-4">
  <div className="flex items-center gap-3">
    <IdCard size={18} className="text-purple-500" />
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">
        Employee ID
      </p>
      <p className="text-sm text-gray-800">
        CBE001214
      </p>
    </div>
  </div>
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