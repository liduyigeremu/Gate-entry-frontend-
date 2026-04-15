'use client'

/*
NavBar component - client side
*/

import Link from "next/link";
import { Bell } from "lucide-react";
import { CircleQuestionMark } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const currentPath = usePathname();
    const navLinks = [
        { title: 'Status', href: '/' },
        { title: 'Devices', href: '/devices' },
        { title: 'Profile', href: '/' },
    ];

  return (
    <div className="bg-white sticky flex top-0 w-full h-15 items-center justify-between shadow-md">

        <h1 className="title-text
        text-lg font-bold text-primary min-w-30 px-4">
            Device Entry Portal
        </h1>

        <nav className="nav-links
        font-bold flex min-w-fit justify-between
        md:max-w-70 md:w-full
        lg:max-w-80">

            {navLinks.map((link) => {

                const isActive = currentPath === link.href;

                return (
                    <Link key={link.title} href={link.href}
                    className={`px-2
                    ${isActive
                    ? 'text-primary border-b-2 pointer-events-none'
                    : 'hover:text-primary active:opacity-60'}`}>
                        {link.title}
                    </Link>
                )
            })}

        </nav>

        <div className="flex items-center justify-between min-w-fit
        md:max-w-40 md:w-full">

            <div className="
            flex items-center justify-center w-7 h-7 mr-1">
                <Bell className="size-full stroke-2" />
            </div>
            <div className="
            flex items-center justify-center w-7 h-7 mr-1">
                <CircleQuestionMark className="size-full stroke-2" />
            </div>
            <div className="
            flex items-center justify-center w-10 h-10 mr-1">
                <CircleUserRound className="size-full stroke-1" />
            </div>

        </div>

    </div>
  )
}

export default NavBar;
