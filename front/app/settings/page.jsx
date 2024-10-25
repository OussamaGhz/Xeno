"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";

const Page = () => {
    // User account states
    const [username, setUsername] = useState("Hadj Aissa");
    const [email, setEmail] = useState("hadjaisaa@gmail.com");
    const [password, setPassword] = useState("password");
    
    // Notification states
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [alertFrequency, setAlertFrequency] = useState("Daily");
    
    // System settings states
    const [dataRetention, setDataRetention] = useState("Daily");
    const [autoBackup, setAutoBackup] = useState("Daily");
    
    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editField, setEditField] = useState({ type: "", value: "" });
    const [tempEditValue, setTempEditValue] = useState("");
    const [alert, setAlert] = useState({ show: false, message: "", type: "" });

    // Handle edit modal
    const openEditModal = (type, currentValue) => {
        setEditField({ type, value: currentValue });
        setTempEditValue(currentValue);
        setIsEditModalOpen(true);
    };

    // Handle save changes
    const handleSave = () => {
        switch (editField.type) {
            case "username":
                setUsername(tempEditValue);
                break;
            case "email":
                setEmail(tempEditValue);
                break;
            case "password":
                setPassword(tempEditValue);
                break;
        }
        
        setAlert({
            show: true,
            message: `${editField.type.charAt(0).toUpperCase() + editField.type.slice(1)} updated successfully!`,
            type: "success"
        });
        
        setIsEditModalOpen(false);
        
        // Hide alert after 3 seconds
        setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
    };

    // Component for frequency selection buttons
    const FrequencyButtons = ({ value, onChange }) => (
        <div className="flex gap-2">
            {["Daily", "Weekly", "Monthly"].map((option) => (
                <button
                    key={option}
                    onClick={() => onChange(option)}
                    className={`px-4 py-1 rounded-lg transition-colors ${
                        value === option
                            ? "bg-[#4682B6] text-white"
                            : "bg-transparent text-white border border-[#4682B6]"
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );

    // Toggle Switch Component
    const ToggleSwitch = ({ value, onChange }) => (
        <button
            onClick={() => onChange(!value)}
            className={`w-14 h-7 rounded-full p-1 transition-colors ${
                value ? "bg-[#4682B6]" : "bg-gray-600"
            }`}
        >
            <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    value ? "translate-x-7" : "translate-x-0"
                }`}
            />
        </button>
    );

    return (
        <section className="w-full flex-col flex-center mb-[64px]">
            {/* Alert */}
            {alert.show && (
                <Alert className="fixed top-4 right-4 bg-green-500 text-white">
                    {alert.message}
                </Alert>
            )}

            {/* General Settings Header */}
            <div className="w-full border-b-2 border-b-[#4682B6] pb-3">
                <h1 className="text-white text-3xl py-1">General Settings</h1>
            </div>

            {/* User Account Settings */}
            <div className="w-full pb-3 mt-3">
                <h1 className="text-white text-2xl">User Account Settings</h1>
                <span className="text-gray-400 text-sm">Manage your account details</span>
            </div>

            {/* Username Section */}
            <div className="mb-4 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6] pb-3">
                <span className="text-gray-400 text-lg">Username</span>
                <span className="text-white text-lg font-normal">{username}</span>
                <button
                    onClick={() => openEditModal("username", username)}
                    className="bg-transparent text-[#4682B6] hover:text-[#366295] border-2 border-[#4682B6] hover:border-[#366295] px-5 rounded-lg"
                >
                    Edit
                </button>
            </div>

            {/* Email Section */}
            <div className="mb-4 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6] pb-3">
                <span className="text-gray-400 text-lg">Email</span>
                <span className="text-white text-lg font-normal">{email}</span>
                <button
                    onClick={() => openEditModal("email", email)}
                    className="bg-transparent text-[#4682B6] hover:text-[#366295] border-2 border-[#4682B6] hover:border-[#366295] px-5 rounded-lg"
                >
                    Edit
                </button>
            </div>

            {/* Password Section */}
            <div className="pb-8 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
                <span className="text-gray-400 text-lg">Password</span>
                <span className="text-white text-lg font-normal">{password.split('').map(() => '*')}</span>
                <button
                    onClick={() => openEditModal("password", "")}
                    className="bg-transparent text-[#4682B6] hover:text-[#366295] border-2 border-[#4682B6] hover:border-[#366295] px-5 rounded-lg"
                >
                    Edit
                </button>
            </div>

            {/* Notification Settings */}
            <div className="w-full pb-3 mt-3">
                <h1 className="text-white text-2xl">Notification Settings</h1>
                <span className="text-gray-400 text-sm">Configure alerts and notification preferences</span>
            </div>

            {/* Email Notifications */}
            <div className="mb-4 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6] pb-3">
                <span className="text-white text-lg font-normal">Email Notifications</span>
                <ToggleSwitch value={emailNotifications} onChange={setEmailNotifications} />
            </div>

            {/* SMS Notifications */}
            <div className="pb-3 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
                <span className="text-white text-lg font-normal">SMS Notifications</span>
                <ToggleSwitch value={smsNotifications} onChange={setSmsNotifications} />
            </div>

            {/* Alert Frequency */}
            <div className="pb-8 mt-3 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
                <span className="text-white text-lg font-normal">Alert Frequency</span>
                <FrequencyButtons value={alertFrequency} onChange={setAlertFrequency} />
            </div>

            {/* System Settings */}
            <div className="w-full pb-3 mt-3">
                <h1 className="text-white text-2xl">System & Application Settings</h1>
                <span className="text-gray-400 text-sm">Configure data retention and database management</span>
            </div>

            {/* Data Retention */}
            <div className="pb-3 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
                <span className="text-white text-lg font-normal">Data Retention</span>
                <FrequencyButtons value={dataRetention} onChange={setDataRetention} />
            </div>

            {/* Auto Backup */}
            <div className="pb-3 mt-3 w-full flex flex-row justify-between items-center border-b-2 border-b-[#4682B6]">
                <span className="text-white text-lg font-normal">Automatic Database Backup</span>
                <FrequencyButtons value={autoBackup} onChange={setAutoBackup} />
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="bg-gray-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit {editField.type}</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                        <input
                            type={editField.type === "password" ? "password" : "text"}
                            value={tempEditValue}
                            onChange={(e) => setTempEditValue(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 border border-[#4682B6] rounded-lg text-white"
                            placeholder={`Enter new ${editField.type}`}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-4 py-2 bg-gray-600 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-[#4682B6] rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default Page;