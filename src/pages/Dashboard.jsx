import React from "react";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const dataBar = [
  { name: "Jan", total: 200 },
  { name: "Feb", total: 350 },
  { name: "Mar", total: 150 },
  { name: "Apr", total: 250 },
  { name: "Mei", total: 380 },
  { name: "Jun", total: 180 },
  { name: "Jul", total: 450 },
  { name: "Agst", total: 300 }
];

const dataPie = [
  { name: "Terverifikasi", value: 278 },
  { name: "Diproses", value: 68 },
  { name: "Ditolak", value: 17 }
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const Dashboard = () => {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* DASHBOARD CONTENT */}
      <div className="p-6 bg-gray-100 min-h-screen">

        <h1 className="text-2xl font-bold mb-6">Ringkasan Statistik</h1>

        {/* KARTU STATISTIK */}
        <div className="grid grid-cols-3 gap-6 mb-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Ijazah Terbit</p>
            <h2 className="text-2xl font-bold">12,543</h2>
            <p className="text-green-500 text-sm">+4.7% dari bulan lalu</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Permintaan Verifikasi</p>
            <h2 className="text-2xl font-bold">451</h2>
            <p className="text-orange-400 text-sm">12 permintaan baru hari ini</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Data Alumni</p>
            <h2 className="text-2xl font-bold">15,243</h2>
            <p className="text-blue-500 text-sm">Database Terpusat</p>
          </div>

        </div>

        {/* BAGIAN GRAFIK */}
        <div className="grid grid-cols-2 gap-6">

          {/* BAR CHART */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="font-semibold mb-4">
              Statistik Penerbitan Ijazah Bulanan
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#22c55e" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-xl shadow text-center">

            <h2 className="font-semibold mb-4">Status Verifikasi</h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>

                <Pie
                  data={dataPie}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                >

                  {dataPie.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}

                </Pie>

              </PieChart>
            </ResponsiveContainer>

            <p className="text-2xl font-bold">75%</p>

          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;