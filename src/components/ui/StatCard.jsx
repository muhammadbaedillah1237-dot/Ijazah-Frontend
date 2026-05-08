import React from "react";

const StatCard = ({ title, value, sub, subColor, icon }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-2">{title}</p>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {value?.toLocaleString("id-ID") || "0"}
          </h2>
          <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-100 bg-white shadow-sm">
            {icon}
          </div>
        </div>
      </div>
      <p className={`text-[11px] mt-4 font-medium ${subColor || "text-gray-400"}`}>
        {sub}
      </p>
    </div>
  );
};

export default StatCard;