"use client"

import { useState } from 'react';

const BandwidthMax = () => {
  const [bandwidthMax, setBandwidthMax] = useState(20);

  const handleChangeBandwidthMax = (value) => {
    setBandwidthMax(value);
  };

  return (
    <div className="flex flex-col rounded-sm border-2 justify-center w-full border-[#4682B6]">
      <div className="text-center w-fit mx-auto border-2 rounded-b-2xl rounded-t-none border-t-0 border-[#4682B6] px-12">
        <span className="text-lg text-white mb-4">Bandwidth Max</span>
      </div>
        <div className="w-full mx-auto max-w-md px-4 py-2 flex items-center justify-between">
          <div className="text-[#4682B6] text-sm">{bandwidthMax} Mbps</div>
          <input
            type="range"
            min="10"
            max="100"
            value={bandwidthMax}
            onChange={(e) => handleChangeBandwidthMax(e.target.value)}
            className="w-full bg-black focus:outline-none bg-transparent"
          />
      </div>
      <button
            className="bg-[#4682B6] mx-auto text-white w-fit mb-3 hover:text-[#366295] hover:border-[#366295] py-1 px-4 rounded"
            onClick={() => handleChangeBandwidthMax(bandwidthMax)}
          >
            Apply Changes
          </button>
    </div>
  );
};

export default BandwidthMax;