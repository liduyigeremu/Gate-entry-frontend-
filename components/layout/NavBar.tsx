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
        { title: 'Status', href: '/status' },
        { title: 'Devices', href: '/devices' },
        { title: 'Profile', href: '/profile' },
    ];

  return (
    <div className="text-muted bg-white flex top-0 w-full px-4 items-center justify-between shadow-md
    lg:min-w-220 lg:max-w-300 lg:px-4 lg:rounded-2xl">

        <h1 className="title-text
        text-lg font-bold text-accent min-w-30 px-2">
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
                    ? 'text-accent border-b-3 pointer-events-none'
                    : 'hover:text-accent active:opacity-60'}`}>
                        {link.title}
                    </Link>
                )
            })}

        </nav>

        <div className="flex items-center justify-between min-w-fit
        md:max-w-30 md:w-full">

            <div className="
            flex items-center justify-center w-5 h-5 mr-1">
                <Bell className="size-full stroke-2" />
            </div>
            <div className="
            flex items-center justify-center w-5 h-5 mr-1">
                <CircleQuestionMark className="size-full stroke-2" />
            </div>
            <div className="
            flex items-center justify-center w-8 h-8 mr-1">
                <CircleUserRound className="size-full stroke-1" />
            </div>

        </div>

    </div>
  )
}

export default NavBar;
