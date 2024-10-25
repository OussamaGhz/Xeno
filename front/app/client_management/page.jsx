"use client";
import React from "react";
import OneClientSummary from "@components/OneClientSummary";
import ControlsCard from "@components/ControlsCard";
import BandwidthMax from "@components/BandWidthMax";
import NetworkUsageGraph from "@components/OurChart";
import ClientSatisfaction from "@components/ClientSatisfaction";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientSelector from "@components/ClientSelector";

import { useState } from "react";

// Sample data for the graph
const data = Array.from({ length: 21 }, (_, i) => ({
    time: i,
    usage: 5 + Math.sin(i * 0.5) * 2 + Math.random() * 1.5,
}));

// Separate the main content into its own component
const DashboardContent = () => {
    const [currentClient, setCurrentClient] = useState({
        clientId: "C001",
        status: "Active",
        ipAddress: "192.168.1.100",
        allocatedBW: 20,
    });
    return (
        <section
            className="
        w-full
        h-full
        flex-col
        flex-center
        justify-center
        mb-[64px]
    "
        >
            <NetworkUsageGraph data={data} title={"Usage Graph"} />
            {/* <OneClientSummary
                client={{
                    clientId: "C001",
                    status: "Active",
                    ipAddress: "192.168.1.100",
                    allocatedBW: "20 Mbps",
                }}
            /> */}

            <ClientSelector
                currentClient={currentClient}
                onClientSelect={setCurrentClient}
            />
            
            <div className="flex flex-row justify-between gap-3 my-3">
                <div className="flex flex-col rounded-sm border-2 w-full border-[#4682B6]">
                    <h1 className="text-white text-center py-1 px-2">
                        Peak Usage
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-between gap-6 align-bottom border-t-2 border-t-[#4682B6] py-1 px-2">
                        <div className="flex flex-col py-1 px-2">
                            <div>
                                <span className="text-[#4682B6] font-bold text-4xl sm:text-5xl">
                                    10:03
                                </span>
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm">
                                +43 Min Later from Yesterday
                            </div>
                        </div>
                        <div className="flex flex-col py-1 px-2">
                            <div>
                                <span className="text-[#4682B6] font-bold text-4xl sm:text-5xl">
                                    17
                                </span>
                                <span className="text-white text-xl sm:text-2xl ml-1">
                                    Mbps
                                </span>
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm">
                                +2.2 Mbps from Last Month
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col rounded-sm border-2 w-full border-[#4682B6]">
                    <h1 className="text-white text-center py-1 px-2">
                        Average Speed
                    </h1>
                    <div className="flex flex-col sm:flex-row justify-center gap-6 align-bottom border-t-2 border-t-[#4682B6] py-1 px-2">
                        <div className="flex flex-col py-1 px-2">
                            <div>
                                <span className="text-[#4682B6] font-bold text-4xl sm:text-5xl">
                                    13.4
                                </span>
                                <span className="text-white text-xl sm:text-2xl ml-1">
                                    Mbps
                                </span>
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm">
                                +2.2 Mbps from Last Month
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ClientSatisfaction percentage={80} rating="Excellent" />
            <div className="flex flex-row justify-between gap-3 my-3">
                <ControlsCard
                    controle={{
                        title: "Control CIR",
                        amount: 20,
                    }}
                />
                <ControlsCard
                    controle={{
                        title: "Control MIR",
                        amount: 19.4,
                    }}
                />
            </div>
            <div className="flex flex-col rounded-sm mb-3 border-2 w-full border-[#4682B6]">
                <div className="text-center w-full sm:w-fit mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-6 sm:px-12">
                    <span className="text-base sm:text-lg text-white mb-4">
                        Bandwidth Test
                    </span>
                </div>
                <div className="flex flex-row justify-center gap-6 align-bottom py-1 px-2">
                    <div className="flex flex-col py-1 px-2">
                        <div>
                            <span className="text-white">Last Test :</span>
                            <span className="text-[#4682B6] font-bold text-5xl">
                                13.4
                            </span>
                            <span className="text-white text-2xl ml-1">
                                Mbps
                            </span>
                        </div>
                        <div className="text-gray-400 text-sm">
                            +2.2 Mbps from Last Month
                        </div>
                    </div>
                </div>
                <button
                    id="logoutBtn"
                    className="bg-[#4682B6] mb-3 text-white hover:text-[#366295] hover:border-[#366295] mt-2 py-1 px-4 rounded mx-auto"
                >
                    Test Again
                </button>
            </div>
            <BandwidthMax />
        </section>
    );
};

// Wrap the page with ProtectedRoute
const Page = () => {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
};

export default Page;
