"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";


const SideBar = () => {
    const pathname = usePathname();
    useEffect(() => {
        console.log("Path changed"); // Log when path changes
        console.log(pathname); // Log current path
    }, [pathname]); // Run this effect when path changes
    if (pathname === "/") return null;
    return (
        <div className="sideBar flex flex-col border-r-2 border-r-[#4682B6] h-full">
            <div
                className="flex justify-center items-center border-b-2 w-full border-b-[#4682B6]"
                style={{ height: "64px" }}
            >
                <Image src={logo} alt="Initiativ" width={200} height={200} />
            </div>
            <div className="flex flex-col justify-between h-full w-full px-1 py-3">
                <div className="flex flex-col justify-between gap-3 ">
                    <Link
                        href="/Dashboard"
                        className={`text-white flex text-center justify-center items-center rounded-3xl py-1 px-2 ${
                            pathname === "/Dashboard" ? "active" : ""
                        }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/client_management"
                        className={`text-white flex text-center justify-center items-center rounded-3xl py-1 px-2 ${
                            pathname === "/client_management" ? "active" : ""
                        }`}
                    >
                        Client Management
                    </Link>
                    <Link
                        href="/network_control"
                        className={`text-white flex text-center justify-center items-center rounded-3xl py-1 px-2 ${
                            pathname === "/network_control" ? "active" : ""
                        }`}
                    >
                        Network Control
                    </Link>
                    
                    <Link
                        href="/settings"
                        className={`text-white flex text-center justify-center items-center rounded-3xl py-1 px-2 ${
                            pathname === "/settings" ? "active" : ""
                        }`}
                    >
                        Settings
                    </Link>
                </div>
                <button
                    id="logintBtn"
                    className="bg-transparent text-[#4682B6] hover:text-[#366295] border-2 border-[#4682B6] hover:border-[#366295] font-bold py-2 px-4 rounded"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default SideBar;
