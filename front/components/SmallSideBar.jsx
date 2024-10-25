"use client";
import { LayoutDashboard, Headset, Wifi, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SmallSideBar = () => {
    const pathname = usePathname();
    const navItems = [
        { icon: LayoutDashboard, text: "Client Management", active: true },
        { icon: Headset, text: "Support", active: false },
        { icon: Wifi, text: "Network", active: false },
        { icon: Settings, text: "Settings", active: false },
    ];
    if (pathname === "/") return null;
    return (
        <nav
            className="s-bar bg-[#4b556345] text-gray-300 p-4 flex items-center justify-between border-2 border-[#4682B6] rounded-lg mx-auto w-[80%] bg-gray-700 "
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: "64px",
            }}
        >
            <Link
                href="/Dashboard"
                className={`text-white flex text-center justify-center items-center rounded-3xl py-1 px-2 ${
                    pathname === "/Dashboard" ? "active" : ""
                }`}
            >
                <LayoutDashboard size={25} />
            </Link>
            <Link
                href="/client_management"
                className={`text-white flex text-center justify-center items-center rounded-3xl py-1 px-2 ${
                    pathname === "/client_management" ? "active" : ""
                }`}
            >
                <Headset size={25} />
            </Link>
            <Link
                href="/network_control"
                className={`text-white flex text-center justify-center items-center rounded-3xl py-1 px-2 ${
                    pathname === "/network_control" ? "active" : ""
                }`}
            >
                <Wifi size={25} />
            </Link>
            <Link
                href="/settings"
                className={`text-white flex text-center justify-center items-center rounded-3xl py-1 px-2 ${
                    pathname === "/settings" ? "active" : ""
                }`}
            >
                <Settings size={25} />
            </Link>
        </nav>
    );
};

export default SmallSideBar;
