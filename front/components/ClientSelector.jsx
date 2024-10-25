import React, { useState } from "react";

const ClientSelector = ({ currentClient, onClientSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Sample data - replace with your actual data source
    const clients = [
        { id: "client1", status: "Unknown", ip: "192.168.1.1", allocatedBW: 7 },
        {
            id: "client2",
            status: "Unknown",
            ip: "192.168.1.2",
            allocatedBW: 15,
        },
        {
            id: "client3",
            status: "Unknown",
            ip: "192.168.1.3",
            allocatedBW: 10,
        },
        {
            id: "client4",
            status: "Unknown",
            ip: "192.168.1.4",
            allocatedBW: 18,
        },
        { id: "client5", status: "Unknown", ip: "192.168.1.5", allocatedBW: 9 },
        {
            id: "client6",
            status: "Unknown",
            ip: "192.168.1.6",
            allocatedBW: 16,
        },
        {
            id: "client7",
            status: "Unknown",
            ip: "192.168.1.7",
            allocatedBW: 20,
        },
        {
            id: "client8",
            status: "Unknown",
            ip: "192.168.1.8",
            allocatedBW: 25,
        },
        {
            id: "client9",
            status: "Unknown",
            ip: "192.168.1.9",
            allocatedBW: 13,
        },
        {
            id: "client10",
            status: "Unknown",
            ip: "192.168.1.10",
            allocatedBW: 14,
        },
    ];

    const handleClientSelect = (client) => {
        onClientSelect(client);
        setIsOpen(false);
    };

    return (
        <div className="w-full text-white">
            {/* Current Client Card */}
            <div className="bg-[#292E30] text-white rounded-lg p-4">
                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Client ID</span>
                            <span>{currentClient.clientId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Status</span>
                            <span>{currentClient.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">IP Address</span>
                            <span>{currentClient.ipAddress}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Allocated BW</span>
                            <span>{currentClient.allocatedBW} Mbps</span>
                        </div>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b text-[#4682B6] border-[#4682B6]">
                            <tr className="text-[#4682B6]">
                                <th className="px-4 py-2 text-left">
                                    Client ID
                                </th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">
                                    IP Address
                                </th>
                                <th className="px-4 py-2 text-left">
                                    Allocated BW
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2">
                                    {currentClient.clientId}
                                </td>
                                <td className="px-4 py-2">
                                    {currentClient.status}
                                </td>
                                <td className="px-4 py-2">
                                    {currentClient.ipAddress}
                                </td>
                                <td className="px-4 py-2">
                                    {currentClient.allocatedBW} Mbps
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-[#4682B6] hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Change Client
                    </button>
                </div>
            </div>

            {/* Client Selection Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#292E30] bg-opacity-50 flex items-center justify-center p-4 z-50 border-2
rounded-sm border-[#4682B6]"
                >
                    <div className="bg-[#292E30] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-[#4682B6]">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl text-center font-semibold">
                                Clients Summary
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-500 hover:text-zinc-700 p-2"
                            >
                                ✕
                            </button>
                        </div>

                        <div
                            className="overflow-y-auto max-h-[calc(90vh-8rem)] "
                        >
                            {/* Mobile View */}
                            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                                {clients.map((client) => (
                                    <div
                                        key={client.id}
                                        className="bg-[#292E30]border rounded-lg hover:bg-gray-700 cursor-pointer transition-colors p-4"
                                        onClick={() =>
                                            handleClientSelect({
                                                clientId: client.id,
                                                status: "Active",
                                                ipAddress: client.ip,
                                                allocatedBW: client.allocatedBW,
                                            })
                                        }
                                    >
                                        <div className="grid grid-cols-2 gap-y-2">
                                            <div>
                                                <div className="text-sm text-zinc-500">
                                                    Client ID
                                                </div>
                                                <div>{client.id}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-zinc-500">
                                                    Status
                                                </div>
                                                <div>{client.status}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-zinc-500">
                                                    IP Address
                                                </div>
                                                <div>{client.ip}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-zinc-500">
                                                    Allocated BW
                                                </div>
                                                <div>
                                                    {client.allocatedBW} Mbps
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop View */}
                            <div
                                className="hidden md:block p-4 border-2
rounded-sm border-[#4682B6]"
                            >
                                <table className="w-full ">
                                    <thead className="text-[#4682B6]">
                                        <tr className="border-b">
                                            <th className="px-4 py-2 text-left">
                                                Client ID
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Status
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                IP Address
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                Allocated BW
                                            </th>
                                            <th className="px-4 py-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients.map((client) => (
                                            <tr
                                                key={client.id}
                                                className="border-b hover:bg-gray-700 cursor-pointer"
                                                onClick={() =>
                                                    handleClientSelect({
                                                        clientId: client.id,
                                                        status: "Active",
                                                        ipAddress: client.ip,
                                                        allocatedBW:
                                                            client.allocatedBW,
                                                    })
                                                }
                                            >
                                                <td className="px-4 py-2">
                                                    {client.id}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {client.status}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {client.ip}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {client.allocatedBW} Mbps
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    <button className="text-[#4682B6] hover:text-blue-700">
                                                        Select
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientSelector;
