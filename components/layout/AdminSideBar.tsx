'use client'

/*
AdminSideBar component - client side
*/

import Link from "next/link";
import { SquareArrowRightExit, LayoutDashboard, Laptop, Shield, ArrowRightLeft } from "lucide-react";
import { usePathname } from "next/navigation";

const AdminSideBar = () => {
    const currentPath = usePathname();

    const navLinks = [
        { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { title: 'Laptop Requests', href: '/device-request', icon: Laptop },
        { title: 'Guard Management', href: '/guard-management', icon: Shield },
        { title: 'Movement Logs', href: '/movement-logs', icon: ArrowRightLeft },
    ];

    return (
        <aside className="bg-card-side
        flex flex-col h-full min-w-55 col-start-1 col-end-2 row-start-1 row-end-3 duration-300
        lg:min-w-75">

            <h1 className="text-2xl text-accent font-bold p-3">
                Device Entry Portal
            </h1>

            <nav className="text-sm flex flex-col w-full pt-10">

                {navLinks.map((link) => {

                    const isActive = currentPath === link.href;
                    const CurrentIcon = link.icon;

                    return (
                        <Link key={link.title} href={link.href}
                        className={`text-muted font-semibold relative flex items-center w-full p-3 px-6
                        hover:text-accent hover:font-bold active:opacity-60
                        ${isActive && "text-white bg-accent bg-linear-to-r from-black/25 to-accent rounded-sm shadow-button pointer-events-none"}`}>
                            {isActive
                            && <div className="absolute bg-accent left-0 w-2 h-full rounded-4xl"/>}
                            <CurrentIcon className="size-5" />
                            <span className="pl-3">{link.title}</span>
                        </Link>
                        
                    )
                })}

            </nav>

            {/*
            Sign out button
            logic for clearing cookies will be called here
            */}
            <div className="text-sm flex flex-col h-full p-4 justify-end bg-amber-20">
                <button
                className="text-muted font-bold flex items-center justify-start
                hover:text-accent active:opacity-60">
                    <SquareArrowRightExit className="size-5" />
                    <span className="pl-3">Sign Out</span>
                </button>
            </div>

        </aside>
    )
}

export default AdminSideBar;
