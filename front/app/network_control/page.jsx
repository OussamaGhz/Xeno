"use client";
import BandwidthMax from "@components/BandWidthMax";
import ClientsSummary from "@components/ClientsSummary";
import { Wifi, Server, Database, Globe } from "lucide-react";
import NetworkUsageGraph from "@components/OurChart";
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from "react";
import axios from "axios";

// Separate the main content into its own component
const NetworkContent = () => {
    const [clientSummary, setClientSummary] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/all");
            setClientSummary(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();//todo activate this line in ghasi mashine
        // setClientSummary(dummyData_clientSummary);
    }, []);
    return (
        <section className="w-full flex-col flex-center mb-[64px]">
            <NetworkUsageGraph
                data={clientSummary}
                title={"Network Usage"}
            />
            <ClientsSummary
                clients={clientSummary}
                inNetworkControl={true}
            />
            {/* Health Indicators */}
            <div className="mb-3 flex flex-col rounded-sm border-2 gap-y-5 justify-between w-full border-[#4682B6] px-6">
                <div className="text-center w-fit mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-12">
                    <span className="text-lg text-white mb-4">
                        Health Indicators
                    </span>
                </div>
                <div className="mx-auto flex flex-row justify-evenly w-full">
                    <div className="mx-auto flex flex-row w-full gap-3 items-center">
                        <span className="text-[#4682B6] font-bold text-5xl">
                            <Wifi size={32} />
                        </span>
                        <span className="text-white text-2xl ml-1">
                            Network
                        </span>
                        <div className="w-3 h-3 bg-[#3FBB52] rounded-full"></div>
                    </div>
                    <div className="mx-auto flex flex-row w-full gap-3 items-center">
                        <span className="text-[#4682B6] font-bold text-5xl">
                            <Server size={32} />
                        </span>
                        <span className="text-white text-2xl ml-1">
                            Servers
                        </span>
                        <div className="w-3 h-3 bg-[#E98E2D] rounded-full"></div>
                    </div>
                </div>
                <div className="mx-auto mb-3 flex flex-row justify-evenly w-full">
                    <div className="mx-auto flex flex-row w-full gap-3 items-center">
                        <span className="text-[#4682B6] font-bold text-5xl">
                            <Database size={32} />
                        </span>
                        <span className="text-white text-2xl ml-1">
                            Database
                        </span>
                        <div className="w-3 h-3 bg-[#3FBB52] rounded-full"></div>
                    </div>
                    <div className="mx-auto flex flex-row w-full gap-3 items-center">
                        <span className="text-[#4682B6] font-bold text-5xl">
                            <Globe size={32} />
                        </span>
                        <span className="text-white text-2xl ml-1">
                            External Services
                        </span>
                        <div className="w-3 h-3 bg-[#FB2621] rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Wrap the page with ProtectedRoute
const Page = () => {
    return (
        <ProtectedRoute>
            <NetworkContent />
        </ProtectedRoute>
    );
};

export default Page;