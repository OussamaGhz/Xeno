"use client";

import NetworkUsage from "@components/OurChart";
import Cards from "@components/Cards";
import Link from "next/link";
import ClientsSummary from "@components/ClientsSummary";
import ProtectedRoute from "@/components/ProtectedRoute"; // Adjust the import path based on your file structure
import { useEffect, useState } from "react";
import axios from "axios";
// import { kMaxLength } from "buffer";
function formatClientDataForChart(clientData) {
    // Find the earliest and latest timestamps
    let timestamps = clientData.flatMap(client => 
        client.data.map(d => new Date(d.timestamp).getTime())
    );
    const minTime = Math.min(...timestamps);
    
    // Create a map of timestamps to total bandwidth usage
    const timeMap = new Map();
    
    // Process each client's data
    clientData.forEach(client => {
        client.data.forEach(dataPoint => {
            const timestamp = new Date(dataPoint.timestamp).getTime();
            // Calculate minutes since start
            const timeInMinutes = Math.floor((timestamp - minTime) / (1000 * 60));
            
            // Add bandwidth to existing total or create new entry
            const currentTotal = timeMap.get(timeInMinutes) || 0;
            timeMap.set(timeInMinutes, currentTotal + dataPoint.bandwidth);
        });
    });
    
    // Convert map to array format
    const formattedData = Array.from(timeMap.entries())
        .map(([time, usage]) => ({
            time,
            usage
        }))
        .sort((a, b) => a.time - b.time);
        
    return formattedData;
}

function findPeakBandwidth(clients) {
    // Create a map to store hourly bandwidth sums
    const hourlyBandwidth = new Map();
    
    // Process each client's data
    clients.forEach(client => {
        client.data.forEach(record => {
            // Extract hour from timestamp
            const hour = record.timestamp?.substring(0, 13) + ":00:00";
            
            // Add bandwidth to hourly sum
            if (!hourlyBandwidth.has(hour)) {
                hourlyBandwidth.set(hour, 0);
            }
            hourlyBandwidth.set(hour, hourlyBandwidth.get(hour) + record.bandwidth);
        });
    });
    
    // Find the hour with maximum bandwidth
    let maxBandwidth = 0;
    let peakHour = null;
    
    hourlyBandwidth.forEach((bandwidth, hour) => {
        if (bandwidth > maxBandwidth) {
            maxBandwidth = bandwidth;
            peakHour = hour;
        }
    });
    
    return {
        peakHour,
        totalBandwidth: maxBandwidth,
        hourlyBreakdown: Object.fromEntries(hourlyBandwidth)
    };
}

const dummyData_max_bandwidth = [
    {
        "client": "client1",
        "max_bandwidth": 100.0
    },
    {
        "client": "client2",
        "max_bandwidth": 150.0
    },
    {
        "client": "client3",
        "max_bandwidth": 200.0
    },
    {
        "client": "client4",
        "max_bandwidth": 120.0
    },
    {
        "client": "client5",
        "max_bandwidth": 180.0
    },
    {
        "client": "client6",
        "max_bandwidth": 170.0
    },
    {
        "client": "client7",
        "max_bandwidth": 220.0
    },
    {
        "client": "client8",
        "max_bandwidth": 90.0
    },
    {
        "client": "client9",
        "max_bandwidth": 110.0
    },
    {
        "client": "client10",
        "max_bandwidth": 130.0
    }
];

const DashboardContent = () => {
    const [clientSummary, setClientSummary] = useState([]);
    const [peackUsage, setPeackUsage] = useState(0);
    const [maxMir, setMaxMir] = useState(0);
    const [chartData, setChartData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5001/api/all");
            setClientSummary(response.data);
            console.log("response = ",response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const  fetchMaxBandwidth = async () => {
        try {
            // const response = await axios.get("http://localhost:3000/api/clients/max_bandwidth");
            const response = dummyData_max_bandwidth;
            //get the maximum mir from the response
            let theMax = Math.max(...response.map(max_band_width => max_band_width.max_bandwidth));
            console.log("theMaxMir",theMax);
            setMaxMir(theMax);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();//todo activate this line in ghasi mashine
        fetchMaxBandwidth();//todo activate this line in ghasi mashine
        // setClientSummary(dummyData_clientSummary);
    }, []);
    useEffect(() => {
        if (clientSummary.length > 0) {  // Only calculate if we have data
            setPeackUsage(findPeakBandwidth(clientSummary).totalBandwidth);

        }
        let tmp = formatClientDataForChart(clientSummary);
        console.log("tmp=",tmp)
        setChartData(tmp);
    }, [clientSummary]);
    return (
        <section className="w-full flex-col flex-center mb-[64px]">
            <NetworkUsage data={clientSummary} title={"Network Usage"} />
            <div className="flex flex-row justify-between gap-3 mb-3">
                <Cards
                    title="Connected Clients"
                    unit="Clients"
                    amount={clientSummary.length}
                    description="+3 from last hour"
                    buttonLink="/client_management"
                />
                <Cards
                    title="Peak Usage"
                    unit="Mbps"
                    amount={peackUsage.toFixed(2)}
                    description="+50 Mbps from Yesterday"
                    buttonLink="/network_control"
                />
            </div>

            <ClientsSummary
                clients={clientSummary}
                inNetworkControl={false}
            />

            <div className="flex flex-row justify-between gap-3 mb-3">
                <Cards
                    title="Bandwidth Limit"
                    unit="MBps"
                    amount="10"
                    description=""
                    buttonLink="/network_control"
                />
                <div className="flex flex-col rounded-sm border-2 w-full border-[#4682B6]">
                    <h1 className="text-white py-1 px-2 text-lg md:text-xl">
                        Limits
                    </h1>
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-t-2 border-t-[#4682B6] py-1 px-2">
                        <div>
                            <div className="flex flex-col px-2">
                                <div>
                                    <span className="font-bold text-2xl sm:text-3xl text-white">
                                        Max MIR :
                                    </span>
                                    <span className="text-[#4682B6] font-bold text-4xl sm:text-5xl">
                                        {maxMir}
                                    </span>
                                    <span className="text-white text-xl sm:text-2xl ml-1">
                                        Mbps
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col px-2 mt-2">
                                <div>
                                    <span className="font-bold text-2xl sm:text-3xl text-white">
                                        Min CIR :
                                    </span>
                                    <span className="text-[#4682B6] font-bold text-4xl sm:text-5xl">
                                        1
                                    </span>
                                    <span className="text-white text-xl sm:text-2xl ml-1">
                                        Kbps
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="network_control"
                            className="flex w-full md:w-fit h-fit bg-[#4682B6] rounded text-white py-1 px-4 justify-center mt-2 md:mt-0"
                        >
                            See More
                        </Link>
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
            <DashboardContent />
        </ProtectedRoute>
    );
};

export default Page;
