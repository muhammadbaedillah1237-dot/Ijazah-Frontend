import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Warna chart
const data = [
  { name: "Terbit", value: 459, color: "#27AE60" },
  { name: "Proses", value: 76, color: "#16719E" },
  { name: "Reject", value: 17, color: "#DC2626" },
  { name: "Revoke", value: 11, color: "#F59E0B" },
];

const VerificationStatusChart = () => {
  // Hover state
  const [activeIndex, setActiveIndex] = useState(null);

  // Total value
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full flex flex-col h-full">
      
      {/* Chart Container */}
      <div className="h-48 w-full relative flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={85}
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={3}
              className="outline-none"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.3
                  }
                  className="transition-all duration-300 cursor-pointer outline-none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Text Tengah Saat Hover */}
        {activeIndex !== null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span
              className="text-3xl font-bold"
              style={{ color: data[activeIndex].color }}
            >
              {Math.round(
                (data[activeIndex].value / total) * 100
              )}
              %
            </span>

            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
              {data[activeIndex].name}
            </span>
          </div>
        )}
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex flex-col gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className="flex justify-between items-center text-sm cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>

              <span
                className={`transition-colors ${
                  activeIndex === index
                    ? "text-gray-900 font-bold"
                    : "text-gray-500 font-medium group-hover:text-gray-700"
                }`}
              >
                {item.name}
              </span>
            </div>

            <span
              className={`transition-colors ${
                activeIndex === index
                  ? "text-gray-900 font-bold"
                  : "text-gray-500 font-medium group-hover:text-gray-700"
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationStatusChart;