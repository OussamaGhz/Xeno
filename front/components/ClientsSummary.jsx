import React from "react";
import Link from "next/link";

const ClientsSummary = (
    {
        clients,
        inNetworkControl,
    }
) => {
    return (
        <div className="border-2 w-full rounded-sm border-[#4682B6] shadow-md p-4 pt-0 mb-3">
            <div className="text-center w-fit mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-12
"><span className="text-lg font-bold text-white mb-4">
                Clients Summary
            </span></div>
            {inNetworkControl && (
                <div><span className="text-[#4682B6] font-bold text-5xl">{clients.length}</span><span className='text-white text-2xl ml-1'>Clients are currently active </span></div>
            )}
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
                    {clients.map((client, index) => (
                        <tr
                            key={index}
                            className={`border-[#4682B6] hover:bg-gray-700 ${
                                index === clients.length - 1 ? "" : "border-b-2"
                            }`}
                        >
                            <td className="px-4 py-2">{client.clientId}</td>
                            <td className="px-4 py-2">{client.currentSpeed}</td>
                            <td className="px-4 py-2">{client.status}</td>
                            <td className="px-4 py-2">{client.ipAddress}</td>
                            <td className="px-4 py-2">{client.allocatedBW}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {inNetworkControl && (
                <button
                className='mx-auto flex w-fit h-fit bg-[#4682B6] rounded text-white py-1 px-2'
            >
                See More
            </button>
            )}
        </div>
    );
};

export default ClientsSummary;
