import React from "react";
import Link from "next/link";

const ClientsSummary = ({ clients, inNetworkControl }) => {
    return (
        <div className="border-2 w-full rounded-sm border-[#4682B6] shadow-md p-4 pt-0 mb-3">
            <div className="text-center w-full md:w-fit mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-4 sm:px-12">
                <span className="text-lg sm:text-xl font-bold text-white mb-4">
                    Clients Summary
                </span>
            </div>

            {inNetworkControl && (
                <div className="text-center mt-4">
                    <span className="text-[#4682B6] font-bold text-4xl sm:text-5xl">
                        {clients.length}
                    </span>
                    <span className="text-white text-xl sm:text-2xl ml-1">
                        Clients are currently active
                    </span>
                </div>
            )}

            <table className="w-full text-xs sm:text-sm text-left text-white mt-4">
                <thead className="text-[#4682B6] font-light border-b-2 border-[#4682B6]">
                    <tr>
                        <th className="px-2 sm:px-4 py-2">Client ID</th>
                        <th className="px-2 sm:px-4 py-2">Status</th>
                        <th className="px-2 sm:px-4 py-2">IP Address</th>
                        <th className="px-2 sm:px-4 py-2">Allocated BW</th>
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
                            <td className="px-2 sm:px-4 py-2">{client.id}</td>
                            <td className="px-2 sm:px-4 py-2">
                                Unknown
                            </td>
                            <td className="px-2 sm:px-4 py-2">{client.ip}</td>
                            <td className="px-2 sm:px-4 py-2">
                                {client.data[client.data.length - 1].bandwidth}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {inNetworkControl && (
                <button className="mx-auto mt-4 flex w-full md:w-fit h-fit bg-[#4682B6] rounded text-white py-1 px-4 sm:px-8 justify-center">
                    See More
                </button>
            )}
        </div>
    );
};

export default ClientsSummary;
