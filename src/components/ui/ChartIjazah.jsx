import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ChartIjazah = () => {

  const barData = {
    labels: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"],
    datasets: [
      {
        data: [12,18,6,20,22,17,19,18,7,10,20,18],
        backgroundColor: "#2dd4bf",
        barThickness: 10,
      },
      {
        data: [8,16,11,14,24,18,10,17,13,9,17,19],
        backgroundColor: "#064e3b",
        barThickness: 10,
      },
      {
        data: [15,14,9,17,23,15,17,21,11,14,19,20],
        backgroundColor: "#0f766e",
        barThickness: 10,
      },
    ],
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { display: false },
    },
    maintainAspectRatio: false, // 🔥 penting
  };

  const donutData = {
    labels: ["Terbit", "Proses", "Reject", "Revoke"],
    datasets: [
      {
        data: [459, 76, 17, 11],
        backgroundColor: ["#22c55e","#2c7da0","#ef4444","#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const donutOptions = {
    cutout: "70%",
    plugins: { legend: { display: false } },
    maintainAspectRatio: false, // 🔥 penting
  };

  return (
    <div className="bg-gray-200 p-3 font-inter">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* LEFT CARD */}
        <div className="col-span-2 bg-white rounded-2xl shadow-md p-4 h-[320px]">

          <h2 className="text-lg font-semibold mb-2">
            Statistik Penerbitan Ijazah Tahunan
          </h2>

          {/* FIX HEIGHT CHART */}
          <div className="h-[200px]">
            <Bar data={barData} options={barOptions} />
          </div>

          <div className="flex justify-center gap-2 mt-3">
            <button className="bg-teal-400 px-3 py-1 text-sm rounded-md font-medium">
              2024
            </button>
            <button className="bg-teal-900 text-white px-3 py-1 text-sm rounded-md font-medium">
              2025
            </button>
            <button className="bg-teal-700 text-white px-3 py-1 text-sm rounded-md font-medium">
              2026
            </button>
          </div>

        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-[400px] h-[320px]">

          <h2 className="text-base font-semibold mb-2">
            Status Data Ijazah Tahun 2026
          </h2>

          <div className="flex justify-center">
            <div className="w-40 h-40">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </div>

          <div className="mt-4 space-y-1 text-xs">

            {[
              { label: "Terbit", color: "bg-green-500", value: 459 },
              { label: "Proses", color: "bg-blue-600", value: 76 },
              { label: "Reject", color: "bg-red-500", value: 17 },
              { label: "Revoke", color: "bg-yellow-500", value: 11 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 ${item.color} rounded-full`}></span>
                  {item.label}
                </div>
                <span>{item.value}</span>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChartIjazah;