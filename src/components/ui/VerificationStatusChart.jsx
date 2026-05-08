import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Terbit', value: 459, color: '#27AE60' },
  { name: 'Proses', value: 76, color: '#3B82F6' },
  { name: 'Reject', value: 17, color: '#EF4444' },
  { name: 'Revoke', value: 11, color: '#F59E0B' },
];

const VerificationStatusChart = () => (
  <div className="w-full flex flex-col h-full">
    <div className="h-48 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
    
    {/* Custom Legend List */}
    <div className="mt-4 flex flex-col gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
            <span className="text-gray-500">{item.name}</span>
          </div>
          <span className="text-gray-800 font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default VerificationStatusChart;