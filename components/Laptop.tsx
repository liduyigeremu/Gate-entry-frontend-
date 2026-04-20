"use client";
import React from "react";

type DataType = {
  initials: string;
  name: string;
  dept: string;
  device: string;
  serial: string;
  date: string;
  time: string;
};

const data: DataType[] = [
  {
    initials: "MH",
    name: "Mahder Hailay",
    dept: "SDC • DF",
    device: "MacBook Pro 16\" (M3)",
    serial: "XN-442-AV-90",
    date: "Oct 24, 2023",
    time: "14:20",
  },
  {
    initials: "EA",
    name: "Edini Amare",
    dept: "SDC • DF",
    device: "Dell XPS 15 Platinum",
    serial: "DL-990-XP-22",
    date: "Oct 24, 2023",
    time: "11:05",
  },
  {
    initials: "LY",
    name: "Lidya Ygerem",
    dept: "SDC • DF",
    device: "MacBook Air 15\" (M2)",
    serial: "MA-152-M2-00",
    date: "Oct 23, 2023",
    time: "16:45",
  },
  {
    initials: "MH",
    name: "Mahlet Hailu",
    dept: "SDC • DF",
    device: "ThinkPad X1 Carbon Gen 11",
    serial: "TP-X1-887-21",
    date: "Oct 23, 2023",
    time: "09:12",
  },
];

export default function DeviceRequest() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="TOTAL PENDING" value="2" />
        <Card title="TOTAL APPROVED" value="24" highlight />
        <Card title="TOTAL REJECTED" value="4" />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Pending Registrations</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300">
              Filter
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="py-3">EMPLOYEE</th>
                <th>DEVICE MODEL</th>
                <th>SERIAL NUMBER</th>
                <th>DATE SUBMITTED</th>
                <th className="text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr
                  key={i}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.dept}</p>
                    </div>
                  </td>

                  <td className="text-sm">{item.device}</td>

                  <td>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                      {item.serial}
                    </span>
                  </td>

                  <td className="text-sm">
                    <p>{item.date}</p>
                    <p className="text-gray-500">• {item.time}</p>
                  </td>

                  <td className="text-right text-xl cursor-pointer">⋯</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string;
  highlight?: boolean;
};

function Card({ title, value, highlight }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${
        highlight
          ? "bg-purple-600 text-white shadow-lg"
          : "bg-white text-gray-800 shadow-sm"
      }`}
    >
      <p className="text-xs tracking-wide mb-2 opacity-80">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}