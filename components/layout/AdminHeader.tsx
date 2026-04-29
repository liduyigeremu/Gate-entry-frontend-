'use client'

import { Bell, CircleQuestionMark, CircleUserRound } from "lucide-react";
import CustomSearchBtn from "@/components/ui/CustomSearchBtn";
import { usePathname } from "next/navigation";

const AdminHeader = () => {
  const currentPath = usePathname();
  const searchPlaceholder = [
   { page: "/dashboard", text: "Search audit logs..." },
   { page: "/device-request", text: "Search registrations..." },
   { page: "/guard-management", text: "Search guards by name, role or gate assignment..." },
   { page: "/movement-logs", text: "Search by Deivce ID..."}
  ];
  const currentSearchPlaceholder = searchPlaceholder.find(item => item.page === currentPath)?.text;
  const userName = "Admin";

  return (
    <div className='bg-card
    flex w-full h-13 items-center'>

      <CustomSearchBtn
      placeholder={currentSearchPlaceholder}
      />

      <div className="flex min-w-fit h-full p-2 justify-center">
        <div className="flex p-2 items-center justify-center">
          <Bell className="size-5" />
        </div>
        
        <div className="flex p-2 items-center justify-center">
          <CircleQuestionMark className="size-5" />
        </div>
      </div>

      <div className="flex min-w-fit h-full px-5 py-2 justify-center">

        <div className="text-end flex flex-col h-fit pl-4 justify-around border-l border-input">
          <label className="text-xs font-bold">
            {userName}
          </label>
          <label className="text-muted text-xs">
            Super Admin
          </label>
        </div>

        <div className="flex items-center justify-center px-2">
          <CircleUserRound className="size-11 stroke-1" />
        </div>

      </div>
    </div>
  )
}

export default AdminHeader;
