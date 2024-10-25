import React from "react";

const OneClientSummary = ({ client }) => {
    // Labels for mobile view
    const labels = {
        clientId: "Client ID",
        currentSpeed: "Current Speed",
        status: "Status",
        ipAddress: "IP Address",
        allocatedBW: "Allocated BW",
    };

    return (
        <div className="w-full">
            {/* Desktop view - shown on md and larger screens */}
            <div className="hidden md:block">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-[#4682B6] font-light border-b-2 border-[#4682B6]">
                        <tr>
                            <th className="px-4 py-2">Client ID</th>
                            <th className="px-4 py-2">Current Speed</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">IP Address</th>
                            <th className="px-4 py-2">Allocated BW</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-[#4682B6] hover:bg-gray-700">
                            <td className="px-4 py-2">{client.clientId}</td>
                            <td className="px-4 py-2">{client.currentSpeed}</td>
                            <td className="px-4 py-2">{client.status}</td>
                            <td className="px-4 py-2">{client.ipAddress}</td>
                            <td className="px-4 py-2">{client.allocatedBW}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile view - shown on smaller than md screens */}
            <div className="md:hidden">
                <div className="bg-gray-800 rounded-lg shadow-lg p-4 space-y-3">
                    {Object.entries(client).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex justify-between items-center border-b border-[#4682B6] pb-2"
                        >
                            <span className="text-[#4682B6] font-light">
                                {labels[key]}
                            </span>
                            <span className="text-white">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OneClientSummary;
