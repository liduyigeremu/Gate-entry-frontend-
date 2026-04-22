"use client";

import { Bell, HelpCircle, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#faf8fc] px-6 py-4 flex items-center justify-between md:justify-end sticky top-0 z-10 h-20">
      {/* Mobile Menu Icon */}
      <button className="md:hidden text-gray-600 hover:text-gray-900">
        <Menu size={24} />
      </button>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-gray-600 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="text-gray-400 hover:text-gray-600">
          <HelpCircle size={20} />
        </button>

        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800 leading-none">Admin</p>
            <p className="text-xs text-gray-500 mt-1">Super Admin</p>
          </div>
          <img 
            src="https://i.pravatar.cc/150?img=11" 
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-200" 
          />
        </div>
      </div>
    </header>
  );
}