"use client";
import React from "react";
import OneClientSummary from "@components/OneClientSummary";
import ControlsCard from "@components/ControlsCard";
import BandwidthMax from "@components/BandWidthMax";
import NetworkUsageGraph from "@components/OurChart";
import ClientSatisfaction from "@components/ClientSatisfaction";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientSelector from "@components/ClientSelector";

import { useState,useEffect } from "react";

// Sample data for the graph
// const data = Array.from({ length: 21 }, (_, i) => ({
//     time: i,
//     usage: 5 + Math.sin(i * 0.5) * 2 + Math.random() * 1.5,
// }));

const dummyData_clientSummary = [
    {
        id: "client1",
        ip: "192.168.1.1",
        max_bandwidth: 10,
        data: [
            { bandwidth: 5, timestamp: "2024-10-19 12:00:00" },
            { bandwidth: 7, timestamp: "2024-10-19 12:01:00" },
        ],
    },
    {
        id: "client2",
        ip: "192.168.1.2",
        max_bandwidth: 20,
        data: [{ bandwidth: 15, timestamp: "2024-10-19 12:00:00" }],
    },
    {
        id: "client3",
        ip: "192.168.1.3",
        max_bandwidth: 15,
        data: [
            { bandwidth: 8, timestamp: "2024-10-19 12:00:00" },
            { bandwidth: 10, timestamp: "2024-10-19 12:02:00" },
        ],
    },
    {
        id: "client4",
        ip: "192.168.1.4",
        max_bandwidth: 25,
        data: [
            { bandwidth: 20, timestamp: "2024-10-19 12:00:00" },
            { bandwidth: 18, timestamp: "2024-10-19 12:03:00" },
        ],
    },
    {
        id: "client5",
        ip: "192.168.1.5",
        max_bandwidth: 12,
        data: [
            { bandwidth: 6, timestamp: "2024-10-19 12:00:00" },
            { bandwidth: 9, timestamp: "2024-10-19 12:01:00" },
        ],
    },
    {
        id: "client6",
        ip: "192.168.1.6",
        max_bandwidth: 18,
        data: [
            { bandwidth: 12, timestamp: "2024-10-19 12:00:00" },
            { bandwidth: 16, timestamp: "2024-10-19 12:02:00" },
        ],
    },
    {
        id: "client7",
        ip: "192.168.1.7",
        max_bandwidth: 22,
        data: [
            { bandwidth: 18, timestamp: "2024-10-19 12:00:00" },
            { bandwidth: 20, timestamp: "2024-10-19 12:01:00" },
        ],
    },
    {
        id: "client8",
        ip: "192.168.1.8",
        max_bandwidth: 30,
        data: [{ bandwidth: 25, timestamp: "2024-10-19 12:00:00" }],
    },
    {
        id: "client9",
        ip: "192.168.1.9",
        max_bandwidth: 14,
        data: [
            { bandwidth: 10, timestamp: "2024-10-19 12:00:00" },
            { bandwidth: 13, timestamp: "2024-10-19 12:02:00" },
        ],
    },
    {
        id: "client10",
        ip: "192.168.1.10",
        max_bandwidth: 16,
        data: [
            { bandwidth: 11, timestamp: "2024-10-19 12:00:00" },
            { bandwidth: 14, timestamp: "2024-10-19 12:01:00" },
        ],
    },
];

// Separate the main content into its own component
const DashboardContent = () => {
    const [listClients, setListClients] = useState([]);
    const [currentClient, setCurrentClient] = useState({
        clientId: "C001",
        status: "Active",
        ipAddress: "192.168.1.100",
        allocatedBW: 20,
    });
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/all");
            setListClients(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // fetchData();//todo activate this line in ghasi mashine
        setListClients(dummyData_clientSummary);
    }, []);

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
            <NetworkUsageGraph data={listClients} title={"Usage Graph"} />
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
                clients={listClients}
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
