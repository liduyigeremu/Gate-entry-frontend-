'use client'

import { Search } from "lucide-react";

interface CustomSearchBtnProps {
    placeholder: string | undefined;
}

const CustomSearchBtn = ({ placeholder }: CustomSearchBtnProps) => {
  return (
    <div className="relative flex w-full h-full px-4 py-2 items-center">
        
        <div className="absolute pl-2">
          <Search className="text-placeholder size-5" />
        </div>
        
        <input
        type="text"
        placeholder={placeholder}
        className="text-sm bg-card-muted max-w-170 w-full h-full rounded-2xl pl-10
        focus:outline-0"
        />

    </div>
  )
}

export default CustomSearchBtn
