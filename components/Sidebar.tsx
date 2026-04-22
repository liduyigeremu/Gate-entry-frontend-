"use client";

import { LayoutDashboard, Laptop, Shield, ArrowLeftRight, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Log navigation changes to console
  useEffect(() => {
    console.log(`📍 Navigation: Current page is ${pathname}`);
    
    // You can also send this to your analytics
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastVisitedPage', pathname);
    }
  }, [pathname]);

  const handleSignOut = async () => {
    console.log("🔐 User initiated sign out");
    setIsLoggingOut(true);
    
    try {
      // Clear any user data from localStorage/sessionStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.clear();
      }
      
      // TODO: Add your actual sign out API call here
      // const response = await fetch('/api/auth/logout', { 
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      console.log("✅ User signed out successfully");
      
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error("❌ Error during sign out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNavigation = (href: string, label: string) => {
    console.log(`🚀 Navigating to: ${label} (${href})`);
    // You can add analytics tracking here
    // Example: trackPageView(label, href);
  };

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/AdminDashboard",
    },
    {
      icon: <Laptop size={20} />,
      label: "Laptop Requests",
      href: "/DeviceRequest",
    },
    {
      icon: <Shield size={20} />,
      label: "Guard Management",
      href: "/GuardManagement",
    },
    {
      icon: <ArrowLeftRight size={20} />,
      label: "Movement Logs",
      href: "/MovementLog",
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white border-r border-gray-100 z-20">
      <div className="p-6 mb-4">
        <Link 
          href="/AdminDashboard" 
          className="block"
          onClick={() => handleNavigation("/AdminDashboard", "Home")}
        >
          <h1 className="text-[#872f89] font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity">
            Device Entry Portal
          </h1>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            onNavigate={handleNavigation}
          />
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <button
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className={`flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors font-medium ${
            isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <LogOut size={20} />
          <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  href,
  isActive,
  onNavigate,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onNavigate: (href: string, label: string) => void;
}) {
  const handleClick = () => {
    console.log(`🖱️ Clicked on: ${label}`);
    onNavigate(href, label);
  };

  return (
    <Link href={href} className="block" onClick={handleClick}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition-colors ${
          isActive
            ? "bg-[#872f89] text-white shadow-md"
            : "hover:bg-gray-50 text-gray-500 font-medium"
        }`}
      >
        {icon}
        <span className={isActive ? "font-semibold" : ""}>{label}</span>
        {isActive && (
          <span className="ml-auto text-xs opacity-80">●</span>
        )}
      </div>
    </Link>
  );
}