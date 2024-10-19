import OneClientSummary from "@components/OneClientSummary";
import ControlsCard from "@components/ControlsCard";
import BandwidthMax from "@components/BandWidthMax";

const Page = () => {
    return (
        <section
            className="
      w-full
      h-full
      flex-col
      flex-center
      justify-center
    "
        >
            <OneClientSummary
                client={{
                    clientId: "C001",
                    currentSpeed: "10 Mbps",
                    status: "Active",
                    ipAddress: "192.168.1.100",
                    allocatedBW: "20 Mbps",
                }}
            />
            <div className="flex flex-row justify-center">
                <button
                    id="logoutBtn"
                    className="bg-[#4682B6] text-white hover:text-[#366295] hover:border-[#366295] mt-2 py-1 px-4 rounded mx-auto"
                >
                    Change Client
                </button>
            </div>
            {/* //! */}
            <div className="flex flex-row justify-between gap-3 my-3">
                <div className="flex flex-col rounded-sm  border-2 w-full border-[#4682B6]">
                    <h1 className="text-white text-center  py-1 px-2">
                        Peak Usage
                    </h1>
                    <div className="flex flex-row justify-between gap-6 align-bottom border-t-2 border-t-[#4682B6] py-1 px-2">
                        <div className="flex flex-col py-1 px-2">
                            <div>
                                <span className="text-[#4682B6] font-bold text-5xl">
                                    10:03
                                </span>
                            </div>
                            <div className="text-gray-400 text-sm">
                                +43Min Later from Yesterday
                            </div>
                        </div>
                        <div className="flex flex-col py-1 px-2">
                            <div>
                                <span className="text-[#4682B6] font-bold text-5xl">
                                    17
                                </span>
                                <span className="text-white text-2xl ml-1">
                                    Mbps
                                </span>
                            </div>
                            <div className="text-gray-400 text-sm">
                                +2.2 Mbps from Last Month
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col rounded-sm  border-2 w-full border-[#4682B6]">
                    <h1 className="text-white text-center  py-1 px-2">
                        Average Speed
                    </h1>
                    <div className="flex flex-row justify-center gap-6 align-bottom border-t-2 border-t-[#4682B6] py-1 px-2">
                        <div className="flex flex-col py-1 px-2">
                            <div>
                                <span className="text-[#4682B6] font-bold text-5xl">
                                    13.4
                                </span>
                                <span className="text-white text-2xl ml-1">
                                    Mbps
                                </span>
                            </div>
                            <div className="text-gray-400 text-sm">
                                +2.2 Mbps from Last Month
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* //! */}
            <div className="flex flex-row justify-between gap-3 my-3">
                <ControlsCard
                    controle={{
                        title: "Control CIR",
                        amount: 20,
                    }}
                />
                <ControlsCard
                    controle={{
                        title: "Control MIR",
                        amount: 19.4,
                    }}
                />
            </div>
            <div className="flex flex-col rounded-sm mb-3 border-2 w-full border-[#4682B6]">
                <div
                    className="text-center w-fit mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-12
"
                >
                    <span className="text-lg text-white mb-4">
                        Bandwidth Test
                    </span>
                </div>
                <div className="flex flex-row justify-center gap-6 align-bottom py-1 px-2">
                    <div className="flex flex-col py-1 px-2">
                        <div>
                            <span className="text-white">Last Test :</span>
                            <span className="text-[#4682B6] font-bold text-5xl">
                                13.4
                            </span>
                            <span className="text-white text-2xl ml-1">
                                Mbps
                            </span>
                        </div>
                        <div className="text-gray-400 text-sm">
                            +2.2 Mbps from Last Month
                        </div>
                    </div>
                </div>
                <button
                    id="logoutBtn"
                    className="bg-[#4682B6] mb-3 text-white hover:text-[#366295] hover:border-[#366295] mt-2 py-1 px-4 rounded mx-auto"
                >
                    Test Again
                </button>
            </div>
            {/* //!band width max:start  */}
            <BandwidthMax />
            {/* //!band width max:end  */}
        </section>
    );
};

export default Page;
