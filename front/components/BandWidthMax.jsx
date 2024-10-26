"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const getFormattedTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const BandwidthMax = ({ currentClient }) => {
    const [bandwidthMax, setBandwidthMax] = useState(20);

    const updateSliderValue = (value) => {
        setBandwidthMax(value);
        console.log("Applying bandwidth max:", bandwidthMax);
    };

    const applyBandwidthMax = () => {
        console.log("Applying bandwidth max:", bandwidthMax);
        console.log("Current client:", currentClient.clientId);

        axios
            .post(`http://127.0.0.1:5001/api/bandwidth`, {
                client: `${currentClient.clientId}`,
                ip: currentClient.ipAddress,
                bandwidth: bandwidthMax,
                max_bandwidth: bandwidthMax,
                timestamp: getFormattedTimestamp(),
            })
            .then((response) => {
                console.log(
                    "in Successfully updated bandwidth max:",
                    response.data,
                );
            })
            .catch((error) => {
                console.error("Error updating bandwidth max:", error);
            });
    };

    return (
        <div className="flex flex-col rounded-sm border-2 justify-center w-full border-[#4682B6]">
            <div className="text-center w-fit mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-12">
                <span className="text-lg text-white mb-4">Bandwidth Max</span>
            </div>
            <div className="w-full mx-auto max-w-md px-4 py-2 flex items-center justify-between">
                <div className="text-[#4682B6] text-sm">
                    {bandwidthMax} Mbps
                </div>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={bandwidthMax}
                    onChange={(e) => updateSliderValue(Number(e.target.value))}
                    className="w-full bg-black focus:outline-none bg-transparent"
                />
            </div>
            <button
                className="bg-[#4682B6] mx-auto text-white w-fit mb-3 hover:text-[#366295] hover:border-[#366295] py-1 px-4 rounded"
                onClick={applyBandwidthMax}
            >
                Apply Changes
            </button>
        </div>
    );
};

export default BandwidthMax;
