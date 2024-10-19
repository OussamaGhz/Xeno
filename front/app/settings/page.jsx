"use client";
import React, { useState } from "react";
import ToggleSwitch from "@components/ToggleSwitch";
import ChooseDay from "@components/ChooseDay";

const page = () => {
    const [username, setUsername] = useState("Hadj Aissa");
    const [email, setEmail] = useState("hadjaisaa@gmail.com");
    const [password, setPassword] = useState("password");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [alertFrequency, setAlertFrequency] = useState("Daily");
    const [dataRetention, setDataRetention] = useState("Daily");
    const [autoBackup, setAutoBackup] = useState("Daily");

    return (
        <section
            className="
              w-full
              flex-col
              flex-center"
        >
          <div className="w-full border-b-2 border-b-[#4682B6] pb-3">
            <h1 className="text-white text-3xl py-1">General Settings</h1>
          </div>
          <div className="w-full pb-3 mt-3">
            <h1 className="text-white text-2xl">User Account Settings</h1>
            <span className="text-gray-400 text-sm">Manage your account details</span>
          </div>

          <div className="mb-4 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6] pb-3">
            <span className="text-gray-400 text-lg">Username</span>
            <span className="text-white text-lg font-normal">{username}</span>
            <button
                    className="bg-transparent text-[#4682B6] hover:text-[#366295] border-2 border-[#4682B6] hover:border-[#366295 px-5 rounded-lg"
                    >
                    Edit
                </button>
          </div>

          <div className="mb-4 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6] pb-3">
            <span className="text-gray-400 text-lg">Email</span>
            <span className="text-white text-lg font-normal">{email}</span>
            <button
                    className="bg-transparent text-[#4682B6] hover:text-[#366295] border-2 border-[#4682B6] hover:border-[#366295 px-5 rounded-lg"
                    >
                    Edit
                </button>
          </div>

          <div className="pb-8 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
            <span className="text-gray-400 text-lg">Password</span>
            <span className="text-white text-lg font-normal">{password.split('').map(() => '*')}</span>
            <button
                    className="bg-transparent text-[#4682B6] hover:text-[#366295] border-2 border-[#4682B6] hover:border-[#366295 px-5 rounded-lg"
                    >
                    Edit
                </button>
          </div>

          <div className="w-full pb-3 mt-3">
            <h1 className="text-white text-2xl">Notification Settings</h1>
            <span className="text-gray-400 text-sm">Configure alerts and notification preferences</span>
          </div>

          <div className="mb-4 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6] pb-3">
            <span className="text-white text-lg font-normal">Email Notifacations</span>
            <ToggleSwitch />
          </div>

          <div className="pb-3 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
            <span className="text-white text-lg font-normal">SMS Notifacations</span>
            <ToggleSwitch />
          </div>

          <div className="pb-8 mt-3 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
            <span className="text-white text-lg font-normal">Alert Frequency</span>
            <ChooseDay/>
          </div>

          <div className="w-full pb-3 mt-3">
            <h1 className="text-white text-2xl">System & Application Settings</h1>
            <span className="text-gray-400 text-sm">Configure data retention and database management</span>
          </div>

          <div className="pb-3 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
            <span className="text-white text-lg font-normal">Data Retention</span>
            <ChooseDay/>
          </div>

          <div className="pb-3 mt-3 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
            <span className="text-white text-lg font-normal">Automatic Database Backup</span>
            <ChooseDay/>
          </div>

        </section>
    );
};

export default page;
