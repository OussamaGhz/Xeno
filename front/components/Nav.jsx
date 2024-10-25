"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bell,CircleUser } from 'lucide-react';
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <nav className="flex justify-between text-white py-3 px-6 w-full border-b-2"
        style={{backgroundColor: "#292E30",borderColor: "#4682B6",height: "59px"}}
    >
      <div className="flex items-center">
        <h1 className="Nav-title text-lg font-light">
        Efficient Network Solutions for Seamless Performance
        </h1>
      </div>

      {/* Right Side - Profile Section */}
      <div className="flex items-center justify-between gap-4">
        {/* User Profile */}
        <div className="flex items-center justify-between gap-1 rounded-3xl py-1 px-2"
        style={{
            backgroundColor:'rgba(255,255,255, 0.3)',
        }}>
          {/* //todo image here */}
          <CircleUser size={25} />
          <span className="font-light">Hadj Aissa</span>
        </div>

        {/* Notification Icon */}
        <Bell size={25} />
      </div>
    </nav>
  );
};

export default Nav;