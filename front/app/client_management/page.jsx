"use client";
import React, { use } from "react";
import OneClientSummary from "@components/OneClientSummary";
import ControlsCard from "@components/ControlsCard";
import BandwidthMax from "@components/BandWidthMax";
import NetworkUsageGraph from "@components/OurChart";
import ClientSatisfaction from "@components/ClientSatisfaction";
import ProtectedRoute from "@/components/ProtectedRoute";
import ClientSelector from "@components/ClientSelector";

import axios from "axios";

import { useState, useEffect } from "react";

// Separate the main content into its own component

function findPeakBandwidth(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return {
            maxBandwidth: 0,
            hour: "No data",
        };
    }

    const result = data.reduce(
        (max, current) => {
            if (current.bandwidth > max.maxBandwidth) {
                return {
                    maxBandwidth: current.bandwidth,
                    hour: current.timestamp.substring(11, 16), // Extract HH:MM from timestamp
                };
            }
            return max;
        },
        { maxBandwidth: -Infinity, hour: "" },
    );

    return {
        maxBandwidth: Number(result.maxBandwidth.toFixed(2)),
        hour: result.hour,
    };
}

function calculateAverageBandwidth(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return 0; // Return 0 if data is empty or invalid
    }

    const totalBandwidth = data.reduce((sum, item) => sum + item.bandwidth, 0);
    const averageBandwidth = totalBandwidth / data.length;

    return Number(averageBandwidth.toFixed(2)); // Round to 2 decimal places
}

const DashboardContent = () => {
    const [listClients, setListClients] = useState([]);
    const [currentClient, setCurrentClient] = useState({
        clientId: "-",
        status: "-",
        ipAddress: "-",
        allocatedBW: 20,
    });
    const [clientData, setClientData] = useState([]);
    const [peakBandwidth, setPeakBandwidth] = useState({
        maxBandwidth: 0,
        hour: "No data",
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5001/api/all");
            setListClients(response.data);
            console.log("response = ", response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchClientData = async () => {
        try {
            if (currentClient.clientId === "-") {
                return;
            }
            const response = await axios.get(
                `http://127.0.0.1:5001/api/client/${currentClient.clientId}`,
            );
            console.log("response = ", response.data);
            setClientData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData(); //todo activate this line in ghasi mashine
    }, []);
    useEffect(() => {
        setCurrentClient({
            clientId: listClients[0]?.id,
            status: "Active",
            ipAddress: listClients[0]?.ip,
            allocatedBW: listClients[0]?.max_bandwidth,
        });
    }, [listClients]);
    useEffect(() => {
        fetchClientData();
    }, [currentClient]);
    useEffect(() => {
        setPeakBandwidth(findPeakBandwidth(clientData));
    }, [currentClient]);

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
                                    {/* {peakBandwidth.hour} */}
                                    {findPeakBandwidth(clientData).hour}
                                </span>
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm">
                                +43 Min Later from Yesterday
                            </div>
                        </div>
                        <div className="flex flex-col py-1 px-2">
                            <div>
                                <span className="text-[#4682B6] font-bold text-4xl sm:text-5xl">
                                    {/* {peakBandwidth.maxBandwidth} */}
                                    {findPeakBandwidth(clientData).maxBandwidth}
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
                                    {calculateAverageBandwidth(clientData)}
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
                    currentClient={currentClient}
                    setCurrentClient={setCurrentClient}
                />
                <ControlsCard
                    controle={{
                        title: "Control MIR",
                        amount: 19.4,
                    }}
                    currentClient={currentClient}
                    setCurrentClient={setCurrentClient}
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
            <BandwidthMax
                currentClient={currentClient}
                setCurrentClient={setCurrentClient}
            />
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
