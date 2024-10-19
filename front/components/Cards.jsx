import React from 'react'
import Link from "next/link";

const Cards = ({
    title,
    unit,
    amount,
    description,
    buttonLink
}) => {
  return (
    <div className='flex flex-col rounded-sm  border-2 w-full border-[#4682B6]'>
        <h1 className='text-white  py-1 px-2'>{title}</h1>
        <div className="flex flex-row justify-between gap-6 items-end align-bottom border-t-2 border-t-[#4682B6] py-1 px-2">
            <div className="flex flex-col py-1 px-2">
                <div><span className="text-[#4682B6] font-bold text-5xl">{amount}</span><span className='text-white text-2xl ml-1'>{unit}</span></div>
                <div className="text-gray-400 text-sm">{description}</div>
            </div>
            <Link
                href={buttonLink}
                className='flex w-fit h-fit bg-[#4682B6] rounded text-white py-1 px-2'
            >
                See More
            </Link>
        </div>
    </div>
  )
}

export default Cards