import React from 'react'
import Link from "next/link";

const ControlsCard = ({controle}) => {
  return (
    <div className='flex flex-col rounded-sm  border-2 w-full border-[#4682B6]'>
        <div className='flex flex-col rounded-sm w-full'>
            <h1 className='text-white text-center py-1 px-2'>{controle.title}</h1>
            <div className="border-t-2 border-t-[#4682B6] py-3 px-3">
                <div className="w-full bg-white rounded-sm flex flex-row justify-between px-3 py-2">
                    <div className="text-[#4682B6]">{controle.amount} Mbps</div>
                    <div className="text-white bg-[#4682B6] px-3 py-0 rounded-md cursor-pointer">Apply Changes</div>
                    
                </div>
                
            </div>
        </div> 
    </div>
  )
}

export default ControlsCard