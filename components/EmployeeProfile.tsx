'use client'

import { Mail, IdCard, Laptop, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { Camera } from "lucide-react"; 

type DeviceCardProps = {
  status: string;
  lastActive: string;
  os: string;
};

function DeviceCard({ status, lastActive, os }: DeviceCardProps) {
  const isActive = status === "ACTIVE";

  return (
    <div className="bg-white rounded-4xl shadow-md p-6 relative">

      {/* Status */}
      <span
        className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold ${
          isActive
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {status}
      </span>

      {/* Icon */}
      <div className="w-12 h-12 bg-fuchsia-50 rounded-2xl flex items-center justify-center mb-4">
        <Laptop className="text-primary" size={20} />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-800 text-lg">
        MacBook Pro 16"
      </h3>

      {/* Last Active */}
      <p className="text-sm text-gray-500 mt-1">
        Last active: {lastActive}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Bottom */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">
          OS: <span className="text-primary font-medium">{os}</span>
        </p>

        <Trash2
          size={16}
          className="text-gray-400 hover:text-red-400 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default function EmployeeProfile() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }
};
  return (
    
    <div className="w-screen min-h-screen bg-primary-bg px-12 py-8">

      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800">
        Employee Profile
      </h1>
      <p className="text-gray-500 mt-2">
        Manage your identity and secured access endpoints.
      </p>

      {/* Layout */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

        {/* LEFT SIDE */}
        <div className="col-span-1">
          <div className="bg-white rounded-4xl shadow-md p-8 relative overflow-hidden">

            {/* Decorative shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-100 rounded-bl-[100px]" />

          <div className="flex justify-center mt-4">
  <div className="relative w-28 h-28">

    {/* Profile Image */}
    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary bg-gray-200 flex items-center justify-center">
      {image ? (
        <img
          src={image}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-xl font-bold text-white bg-orange-400 w-full h-full flex items-center justify-center">
          EA
        </span>
      )}
    </div>

    {/* Change button */}
<button
  type="button"
  onClick={() => fileInputRef.current?.click()}
  className="absolute bottom-0 right-0 bg-primary p-2 rounded-full shadow-md border border-white hover:opacity-90"
>
  <Camera size={14} className="text-white" />
</button>
    {/* Hidden input */}
    <input
      type="file"
      ref={fileInputRef}
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
  </div>
</div>

            {/* Name */}
            <h2 className="text-2xl font-semibold text-center mt-4 text-gray-800">
              Edini Amare
            </h2>
            <p className="text-center text-primary text-xs mt-1 tracking-wider">
              IS TRAINEE
            </p>

            {/* Email */}
            <div className="bg-fuchsia-50 rounded-4xl px-5 py-4 mt-6">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Email Address
                  </p>
                  <p className="text-sm text-gray-800 break-all">
  Ediniamare@cbe.com.et
</p>
                </div>
              </div>
            </div>

            {/* Employee ID */}
            <div className="bg-fuchsia-50 rounded-4xl px-5 py-4 mt-4">
              <div className="flex items-center gap-3">
                <IdCard size={18} className="text-primary" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </p>
                  <p className="text-sm text-gray-800 break-all">
  CBE001214
</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-2">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Laptop className="text-primary" size={18} />
              <h2 className="text-lg font-semibold text-gray-800">
                Registered Devices
              </h2>
            </div>

            <span className="text-primary text-sm cursor-pointer hover:opacity-70">
              Manage All
            </span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6 mt-6">

            <DeviceCard
              status="ACTIVE"
              lastActive="2 minutes ago"
              os="VENTURA 13.4"
            />

            <DeviceCard
              status="STANDBY"
              lastActive="4 hours ago"
              os="IOS 17.1"
            />

          </div>

        </div>
      </div>
    </div>
  );
}