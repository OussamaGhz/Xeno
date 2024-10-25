import React from "react";
import Link from "next/link";

const Cards = ({ title, unit, amount, description, buttonLink }) => {
    return (
        <div className="flex flex-col rounded-sm border-2 w-full border-[#4682B6]">
            <h1 className="text-white py-1 px-2 text-lg md:text-xl">{title}</h1>
            <div className="flex flex-col md:flex-row justify-between gap-6 items-end border-t-2 border-t-[#4682B6] py-1 px-2">
                <div className="flex flex-col py-1 px-2">
                    <div className="text-[#4682B6] font-bold text-4xl sm:text-5xl">
                        {amount}
                        <span className="text-white text-2xl sm:text-3xl ml-1">
                            {unit}
                        </span>
                    </div>
                    <div className="text-gray-400 text-sm sm:text-base">
                        {description}
                    </div>
                </div>
                <Link
                    href={buttonLink}
                    className="flex w-full md:w-fit h-fit bg-[#4682B6] rounded text-white py-1 px-4 justify-center mt-2 md:mt-0"
                >
                    See More
                </Link>
            </div>
        </div>
    );
};

export default Cards;
