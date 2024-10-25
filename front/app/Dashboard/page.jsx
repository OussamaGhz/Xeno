import NetworkUsage from "@components/OurChart";
import Cards from "@components/Cards";
import Link from "next/link";
import ClientsSummary from "@components/ClientsSummary";

// Sample data for the graph
const data = Array.from({ length: 21 }, (_, i) => ({
    time: i,
    usage: 5 + Math.sin(i * 0.5) * 2 + Math.random() * 1.5,
}));
const Page = () => {
    return (
        <section
            className="
        w-full
        flex-col
        flex-center
    "
        >
            <NetworkUsage
                data={data}
                title={"Network Usage"}
            />
            <div className="flex flex-row justify-between gap-3 mb-3">
                <Cards
                    title="Connected Clients"
                    unit="Clients"
                    amount="32"
                    description="+3 from last hour"
                    buttonLink="/client_management"
                />
                <Cards
                    title="Peak Usage"
                    unit="Mbps"
                    amount="320"
                    description="+50 Mbps from Yesterday"
                    buttonLink="/network_control"
                />
            </div>

            <ClientsSummary
                clients={[
                    {
                        clientId: "C001",
                        currentSpeed: "10 Mbps",
                        status: "Active",
                        ipAddress: "192.168.1.100",
                        allocatedBW: "20 Mbps",
                    },
                    {
                        clientId: "C002",
                        currentSpeed: "5 Mbps",
                        status: "Active",
                        ipAddress: "192.168.1.101",
                        allocatedBW: "10 Mbps",
                    },
                    {
                        clientId: "C003",
                        currentSpeed: "20 Mbps",
                        status: "Idle",
                        ipAddress: "192.168.1.102",
                        allocatedBW: "25 Mbps",
                    },
                    {
                        clientId: "C004",
                        currentSpeed: "7 Mbps",
                        status: "Active",
                        ipAddress: "192.168.1.103",
                        allocatedBW: "15 Mbps",
                    },
                ]}
                inNetworkControl={false}
            />

            <div className="flex flex-row justify-between gap-3 mb-3">
                <Cards
                    title="Brandwidth Limit"
                    unit="MBps"
                    amount="500"
                    description="+100 from last Year"
                    buttonLink="/network_control"
                />
                {/* //! */}
                <div className="flex flex-col rounded-sm  border-2 w-full border-[#4682B6]">
                    <h1 className="text-white  py-1 px-2">Limits</h1>
                    <div className="items-end flex flex-row justify-between gap-6 align-bottom border-t-2 border-t-[#4682B6] py-1 px-2">
                        <div>
                            <div className="flex flex-col px-2">
                                <div>
                                    <span className="font-bold text-3xl text-white">
                                        Max MIR :
                                    </span>
                                    <span className="text-[#4682B6] font-bold text-5xl">
                                        20
                                    </span>
                                    <span className="text-white text-2xl ml-1">
                                        Mbps
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col px-2">
                                <div>
                                    <span className="font-bold text-3xl text-white">
                                        Min CIR :{" "}
                                    </span>
                                    <span className="text-[#4682B6] font-bold text-5xl">
                                        500
                                    </span>
                                    <span className="text-white text-2xl ml-1">
                                        Kbps
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="network_control"
                            className="flex w-fit h-fit bg-[#4682B6] rounded text-white py-1 px-2"
                        >
                            See More
                        </Link>
                    </div>
                </div>
                {/* //! */}
            </div>
        </section>
    );
};

export default Page;
