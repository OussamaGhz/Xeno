import BandwidthMax from "@components/BandWidthMax";
import ClientsSummary from "@components/ClientsSummary";
import { Wifi, Server, Database, Globe } from "lucide-react";
import NetworkUsageGraph from "@components/OurChart";


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
            <NetworkUsageGraph
                data={data}
                title={"Network Usage"}
            />
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
                inNetworkControl={true}
            />
            {/* //!heath:start  */}
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
            {/* //!heath:end  */}
            <BandwidthMax />
        </section>
    );
};

export default Page;
