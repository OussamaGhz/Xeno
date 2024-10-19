import React, { useState } from "react";

const ToggleSwitch = () => {
    const [active, setActive] = useState(false);

    const handleToggle = () => {
        console.log("Toggled", active);
        setActive(!active);
    };

    return (
        <div
            className={`relative w-20 h-8 bg-${
                active ? "[#4682B6]" : "[#B9C4DC] border-2 border-[#4682B6]"
            } rounded-full cursor-pointer transition-colors duration-300`}
            onClick={handleToggle}
        >
            <div
                className={`absolute w-10 h-10 translate-y-[-5px] bg-white rounded-full shadow-md transition-transform duration-300 ${
                    active
                        ? "transform translate-x-[45px] bg-4682B6 text-white"
                        : "transform translate-x-[-5px] bg-gray-200 text-gray-600"
                } flex justify-center items-center`}
            >
            </div>
        </div>
    );
};

export default ToggleSwitch;
