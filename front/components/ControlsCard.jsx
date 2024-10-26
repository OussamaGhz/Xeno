"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const ControlsCard = ({ controle,currentClient,setCurrentClient }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(controle.amount); // Set initial input to current amount

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleApplyChanges = () => {
        setIsModalOpen(true);
        controle.amount = inputValue; // Update controle amount with input value
        // axios
        //     .post(`http://127.0.0.1:5001/api/set_bandwidth`, {
        //         client: `${currentClient.clientId}`,
        //         bandwidth: bandwidthMax,
        //     })
        //     .then((response) => {
        //         console.log(
        //             "in Successfully updated bandwidth max:",
        //             response.data,
        //         );
        //     })
        //     .catch((error) => {
        //         console.error("Error updating bandwidth max:", error);
        //     });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='flex flex-col rounded-sm border-2 w-full border-[#4682B6]'>
            <div className='flex flex-col rounded-sm w-full'>
                <h1 className='text-white text-center py-1 px-2'>{controle.title}</h1>
                <div className="border-t-2 border-t-[#4682B6] py-3 px-3">
                    <div className="w-full bg-white rounded-sm flex flex-col sm:flex-row justify-between items-center px-3 py-2">
                        {/* Input field for bandwidth value */}
                        <input
                            type="number"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="text-[#4682B6] text-xl sm:text-2xl border border-[#4682B6] rounded-md px-2 py-1 w-1/2"
                            placeholder="Enter bandwidth"
                        />
                        <div
                            className="text-white bg-[#4682B6] px-3 py-1 rounded-md cursor-pointer text-center w-full sm:w-auto mt-2 sm:mt-0"
                            onClick={handleApplyChanges}
                        >
                            Apply Changes
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-80">
                        <h2 className="text-[#4682B6] text-lg font-bold">Update Successful</h2>
                        <p className="text-gray-700 mt-4">The bandwidth has been updated to {inputValue} Mbps.</p>
                        <button
                            className="mt-6 bg-[#4682B6] text-white px-4 py-2 rounded-md"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ControlsCard;