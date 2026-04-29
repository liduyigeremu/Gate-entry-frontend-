'use client';

import { Mail, IdCard, Laptop, Trash2, Camera } from "lucide-react";
import { useState, useRef } from "react";

type DeviceCardProps = {
  status: string;
  os: string;
};

function DeviceCard({ status, os }: DeviceCardProps) {
  const isActive = status === "ACTIVE";

  return (
    <div className="bg-card-muted rounded-[30px] p-6 relative border border-[#f2ebf5]">

      {/* Status Badge */}
      <span
        className={`absolute top-6 right-6 text-[11px] font-bold px-4 py-1 rounded-full ${
          isActive
            ? "bg-approved text-[#2d3a00]"
            : "bg-card-muted text-muted"
        }`}
      >
        {status}
      </span>

      {/* Device Icon */}
      <div className="w-14 h-14 rounded-[18px] bg-icon flex items-center justify-center mb-6">
        <Laptop size={22} className="text-primary" />
      </div>

      {/* Device Name */}
      <h3 className="text-[30px] font-semibold text-foreground leading-tight">
        MacBook Pro 16"
      </h3>

      {/* Divider */}
      <div className="border-t border-[#e8e0eb] my-8" />

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#94a3b8]">
          OS: <span className="text-[#94a3b8]">{os}</span>
        </p>

        <Trash2
          size={14}
          className="text-[#94a3b8] cursor-pointer hover:text-red-400 transition"
        />
      </div>
    </div>
  );
}

export default function EmployeeProfile() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background px-6 md:px-10 py-8">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-[56px] font-bold text-foreground leading-none">
          Employee Profile
        </h1>

        <p className="text-muted text-[16px] mt-3">
          Manage your identity and secured access endpoints.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-[34px] p-8 relative overflow-hidden border border-[#f2ebf5] min-h-[560px]">

            {/* Decorative top-right shape */}
            <div className="absolute top-0 right-0 w-[120px] h-[85px] bg-card-muted rounded-bl-[80px]" />

            {/* Profile Image */}
            <div className="flex justify-center mt-2">
              <div className="relative w-[130px] h-[130px]">

                {/* Outer Ring */}
                <div className="w-full h-full rounded-full border-[4px] border-primary/65 flex items-center justify-center">

                  {/* Inner Image */}
                  <div className="w-[112px] h-[112px] rounded-full overflow-hidden bg-orange-400 flex items-center justify-center">
                    {image ? (
                      <img
                        src={image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-[28px]">
                        EA
                      </span>
                    )}
                  </div>
                </div>

                {/* Camera Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-md hover:opacity-90 transition"
                >
                  <Camera size={15} className="text-white" />
                </button>

                {/* Hidden Input */}
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
            <h2 className="text-center text-[24px] font-bold text-foreground mt-6">
              Edini Amare
            </h2>

            <p className="text-center text-primary text-[14px] font-semibold tracking-wide mt-1">
              IS TRAINEE
            </p>

            {/* EMAIL CARD */}
            <div className="bg-card-muted rounded-[28px] px-5 py-4 mt-9">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <Mail size={20} className="text-primary" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted">
                    Email Address
                  </p>

                  <p className="text-[18px] text-foreground font-medium break-all">
                    Ediniamare@cbe.com.et
                  </p>
                </div>
              </div>
            </div>

            {/* EMPLOYEE ID CARD */}
            <div className="bg-card-muted rounded-[28px] px-5 py-4 mt-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                  <IdCard size={20} className="text-primary" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted">
                    Employee ID
                  </p>

                  <p className="text-[18px] text-foreground font-medium">
                    CBE001214
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">

          {/* Section Header */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <Laptop size={18} className="text-primary" />

              <h2 className="text-[20px] font-bold text-foreground">
                Registered Devices
              </h2>
            </div>

            <button className="text-primary font-semibold text-[16px] hover:opacity-80 transition">
              Manage All
            </button>
          </div>

          {/* Device Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-7">

            <DeviceCard
              status="ACTIVE"
              os="VENTURA 13.4"
            />

            <DeviceCard
              status="ACTIVE"
              os="IOS 17.1"
            />

          </div>
        </div>
      </div>
    </div>
  );
}