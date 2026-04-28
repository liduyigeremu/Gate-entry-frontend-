"use client";

import React, { useState } from "react";
import { 
  Filter, 
  Download, 
  MoreVertical, 
  Monitor,
  Laptop
} from "lucide-react";

// --- Types ---
interface RequestLog {
  id: number;
  initials: string;
  employee: string;
  department: string;
  deviceModel: string;
  serialNumber: string;
  date: string;
  time: string;
}

export default function LaptopRequests() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3;
  const limit = 4;

  return (
    <div className="w-full min-h-screen">
      {/* 
        The max-w and mx-auto ensures it doesn't stretch infinitely on ultrawide monitors.
        Padding adjusts based on screen size (p-4 on mobile, p-6/8 on larger screens).
      */}
      <main className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1600px] mx-auto font-sans">
        
        {/* --- Top Metric Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {/* Card 1: Pending */}
          <div className="bg-card rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            <p className="text-[11px] font-bold text-[#872f89] uppercase tracking-widest mb-2 font-manrope">
              Total Pending
            </p>
            <h3 className="text-4xl sm:text-5xl font-black text-gray-900 font-manrope">
              2
            </h3>
          </div>

          {/* Card 2: Approved (Purple Theme with decorations) */}
          <div className="bg-[#872f89] rounded-[24px] p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col justify-center">
            {/* Background Decorative Circles */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-white/10 rounded-full" />
            
            <div className="relative z-10">
              <p className="text-[11px] font-bold text-white/80 uppercase tracking-widest mb-2 font-manrope">
                Total Approved
              </p>
              <h3 className="text-4xl sm:text-5xl font-black text-white font-manrope">
                24
              </h3>
            </div>
          </div>

          {/* Card 3: Rejected */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2 font-manrope">
              Total Rejected
            </p>
            <h3 className="text-4xl sm:text-5xl font-black text-gray-900 font-manrope">
              4
            </h3>
          </div>
        </div>

        {/* --- Main Table Container --- */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Header Section */}
          <div className="p-5 sm:p-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-50">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-manrope">
              Pending Registrations
            </h2>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-full text-sm font-bold transition-colors border border-gray-200">
                <Filter size={16} /> Filter
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 rounded-full text-sm font-bold transition-colors border border-gray-200">
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          {/* 📱 MOBILE VIEW: Stacked Cards (< 768px) */}
          <div className="md:hidden flex flex-col divide-y divide-gray-50">
            {DUMMY_REQUESTS.map((req) => (
              <div key={req.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                {/* Top row: Employee & Action */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fcf8fe] text-[#872f89] font-bold text-sm flex items-center justify-center shrink-0">
                      {req.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{req.employee}</p>
                      <p className="text-[11px] text-gray-500 uppercase tracking-wider">{req.department}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-700 p-1">
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* Device & Serial */}
                <div className="bg-gray-50 rounded-xl p-3 mb-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                    <Monitor size={16} className="text-gray-400" />
                    {req.deviceModel}
                  </div>
                  <div className="inline-flex w-fit px-3 py-1 bg-[#fcf8fe] border border-[#f3e8f5] rounded-md text-[11px] font-bold text-[#872f89] tracking-wider">
                    {req.serialNumber}
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                  <span>{req.date}</span>
                  <span className="text-gray-300">•</span>
                  <span>{req.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW: Table (>= 768px) */}
          <div className="hidden md:block overflow-x-auto flex-1">
            <table className="w-full text-left min-w-[900px] table-fixed">
              <thead className="bg-[#faf8fc] border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6 lg:px-8 w-[25%] text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Employee</th>
                  <th className="py-4 px-6 lg:px-8 w-[25%] text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Device Model</th>
                  <th className="py-4 px-6 lg:px-8 w-[20%] text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Serial Number</th>
                  <th className="py-4 px-6 lg:px-8 w-[20%] text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Date Submitted</th>
                  <th className="py-4 px-6 lg:px-8 w-[10%] text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-50">
                {DUMMY_REQUESTS.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/80 transition-colors group">
                    
                    {/* Employee */}
                    <td className="py-4 px-6 lg:px-8 whitespace-nowrap">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#fcf8fe] text-[#872f89] font-bold text-sm flex items-center justify-center shrink-0">
                          {req.initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{req.employee}</p>
                          <p className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">{req.department}</p>
                        </div>
                      </div>
                    </td>

                    {/* Device Model */}
                    <td className="py-4 px-6 lg:px-8 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {req.deviceModel.includes("MacBook") ? (
                          <Laptop size={18} className="text-gray-400 shrink-0" />
                        ) : (
                          <Monitor size={18} className="text-gray-400 shrink-0" />
                        )}
                        <span className="text-sm font-medium text-gray-800">{req.deviceModel}</span>
                      </div>
                    </td>

                    {/* Serial Number */}
                    <td className="py-4 px-6 lg:px-8 whitespace-nowrap">
                      <span className="px-3 py-1.5 bg-[#fcf8fe] border border-[#f3e8f5] rounded-md text-[11px] font-bold text-[#872f89] tracking-wider">
                        {req.serialNumber}
                      </span>
                    </td>

                    {/* Date Submitted */}
                    <td className="py-4 px-6 lg:px-8 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-800">{req.date}</p>
                      <p className="text-[12px] text-gray-500 mt-0.5">• {req.time}</p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 lg:px-8 text-right whitespace-nowrap">
                      <button className="text-gray-400 hover:text-gray-700 transition-colors inline-flex justify-end w-full">
                        <MoreVertical size={20} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- Pagination Footer --- */}
          <div className="px-5 sm:px-6 lg:px-8 py-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white mt-auto">
            <p className="text-sm text-gray-500 font-medium text-center sm:text-left">
              Showing <span className="font-bold text-gray-800">1-4</span> of <span className="font-bold text-gray-800">24</span>
            </p>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-bold text-gray-400 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((pageNum) => (
                  <button 
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all
                      ${currentPage === pageNum 
                        ? "bg-[#872f89] text-white shadow-sm" 
                        : "bg-transparent text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-bold text-[#872f89] hover:text-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

// ----------------------------------------------------
// Mock Data Matching The Image
// ----------------------------------------------------
const DUMMY_REQUESTS: RequestLog[] =[
  { 
    id: 1, 
    initials: "MH", 
    employee: "Mahder Hailay", 
    department: "SDC • DF", 
    deviceModel: "MacBook Pro 16\" (M3)", 
    serialNumber: "XN-442-AV-90", 
    date: "Oct 24, 2023", 
    time: "14:20" 
  },
  { 
    id: 2, 
    initials: "EA", 
    employee: "Edini Amare", 
    department: "SDC • DF", 
    deviceModel: "Dell XPS 15 Platinum", 
    serialNumber: "XN-442-AV-90", 
    date: "Oct 24, 2023", 
    time: "11:05" 
  },
  { 
    id: 3, 
    initials: "LY", 
    employee: "Lidya Yegerem", 
    department: "SDC • DF", 
    deviceModel: "MacBook Air 15\" (M2)", 
    serialNumber: "XN-442-AV-90", 
    date: "Oct 23, 2023", 
    time: "16:45" 
  },
  { 
    id: 4, 
    initials: "MH", 
    employee: "Mahlet Hailu", 
    department: "SDC • DF", 
    deviceModel: "ThinkPad X1 Carbon Gen 11", 
    serialNumber: "XN-442-AV-90", 
    date: "Oct 23, 2023", 
    time: "09:12" 
  },
];