import React, { useState } from "react";

const ChooseDay = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  const handlePeriodSelection = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="flex flex-row justify-between items-center px-1 py-1 border-2 border-[#4682B6] rounded-lg">
      <button
        className={`${
          selectedPeriod === "daily" ? "active_periode" : "unactive_periode"
        }`}
        onClick={() => handlePeriodSelection("daily")}
      >
        Daily
      </button>
      <button
        className={`${
          selectedPeriod === "weekly" ? "active_periode" : "unactive_periode"
        }`}
        onClick={() => handlePeriodSelection("weekly")}
      >
        Weekly
      </button>
      <button
        className={`${
          selectedPeriod === "monthly" ? "active_periode" : "unactive_periode"
        }`}
        onClick={() => handlePeriodSelection("monthly")}
      >
        Monthly
      </button>
    </div>
  );
};

export default ChooseDay;