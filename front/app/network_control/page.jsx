"use client";
import BandwidthMax from "@components/BandWidthMax";
import ClientsSummary from "@components/ClientsSummary";
import { Wifi, Server, Database, Globe } from "lucide-react";
import NetworkUsageGraph from "@components/OurChart";
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from "react";
import axios from "axios";

// Sample data for the graph
const data = Array.from({ length: 21 }, (_, i) => ({
    time: i,
    usage: 5 + Math.sin(i * 0.5) * 2 + Math.random() * 1.5,
}));
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
const NetworkContent = () => {
    const [clientSummary, setClientSummary] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/all");
            setClientSummary(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        // fetchData();//todo activate this line in ghasi mashine
        setClientSummary(dummyData_clientSummary);
    }, []);
    return (
        <section className="w-full flex-col flex-center mb-[64px]">
            <NetworkUsageGraph
                data={data}
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
            <BandwidthMax />
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