import React from "react";

const OneClientSummary = ({
    client
}) => {
    return (
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
                <tr
                    className="border-[#4682B6] hover:bg-gray-700"
                >
                    <td className="px-4 py-2">{client.clientId}</td>
                    <td className="px-4 py-2">{client.currentSpeed}</td>
                    <td className="px-4 py-2">{client.status}</td>
                    <td className="px-4 py-2">{client.ipAddress}</td>
                    <td className="px-4 py-2">{client.allocatedBW}</td>
                </tr>
            
            </tbody>
        </table>
    );
};

export default OneClientSummary;
