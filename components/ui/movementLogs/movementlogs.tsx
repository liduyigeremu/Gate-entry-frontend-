"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  LogOut, 
  LogIn, 
  Shield, 
  Clock, 
  Laptop, 
  UserCircle2,
  Loader2
} from "lucide-react";

type LogAction = "ENTRY" | "EXIT";

interface MovementLog {
  id: number;
  time: string;
  date: string;
  deviceId: string;
  employee: string;
  gate: string;
  action: LogAction;
}

interface LogStats {
  deviceFlagged: number;
  deviceEntries: number;
  deviceExits: number;
  activeGates: number;
}

interface PaginatedResponse {
  data: MovementLog[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

export default function MovementLogs() {
  const [logs, setLogs] = useState<MovementLog[]>([]);
  const [stats, setStats] = useState<LogStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Filters & Pagination
  const [filter, setFilter] = useState<"ALL" | "ENTRY" | "EXIT">("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const limit = 6; // Items per page

  // --- Fetch Data Logic (Ready for Golang Backend) ---
  const fetchLogsData = useCallback(async (page: number, currentFilter: string) => {
    setIsLoading(true);
    
    console.log(`[Network Request] Fetching data from Golang backend...`);
    console.log(`Endpoint: /api/v1/movement-logs?page=${page}&limit=${limit}&filter=${currentFilter}`);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // 800ms fake delay

      // Simulated filtering logic
      let filteredData = [...DUMMY_LOGS];
      if (currentFilter !== "ALL") {
        filteredData = filteredData.filter(log => log.action === currentFilter);
      }

      const startIndex = (page - 1) * limit;
      const paginatedData = filteredData.slice(startIndex, startIndex + limit);

      setLogs(paginatedData);
      setTotalRecords(filteredData.length);
      setTotalPages(Math.ceil(filteredData.length / limit));
      
      setStats({
        deviceFlagged: 58,
        deviceEntries: 84,
        deviceExits: 58,
        activeGates: 3
      });

      console.log(`[Network Response] Successfully fetched ${paginatedData.length} logs.`);

    } catch (error) {
      console.error("[Network Error] Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchLogsData(currentPage, filter);
  },[currentPage, filter, fetchLogsData]);

  const handleFilterChange = (newFilter: "ALL" | "ENTRY" | "EXIT") => {
    console.log(`[Action] Filter changed to: ${newFilter}`);
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log(`[Action] Page changed to: ${newPage}`);
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fc]">
      <main className="p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1600px] mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <StatCard 
            value={stats?.deviceFlagged.toString() || "-"} 
            label="DEVICE FLAGGED" 
            icon={<LogOut size={24} className="text-white" />} 
            colors={{ bg: "bg-red-50/50", border: "border-red-100", iconBg: "bg-red-700", text: "text-red-700" }} 
            isLoading={isLoading && !stats}
          />
          <StatCard 
            value={stats?.deviceEntries.toString() || "-"} 
            label="DEVICE ENTRIES" 
            icon={<LogIn size={24} className="text-white" />} 
            colors={{ bg: "bg-lime-50/50", border: "border-lime-200", iconBg: "bg-[#557700]", text: "text-[#557700]" }} 
            isLoading={isLoading && !stats}
          />
          <StatCard 
            value={stats?.deviceExits.toString() || "-"} 
            label="DEVICE EXITS" 
            icon={<LogOut size={24} className="text-white" />} 
            colors={{ bg: "bg-red-50/50", border: "border-red-100", iconBg: "bg-red-700", text: "text-red-700" }} 
            isLoading={isLoading && !stats}
          />
          <StatCard 
            value={stats?.activeGates.toString() || "-"} 
            label="ACTIVE GATES" 
            icon={<Shield size={24} className="text-white" />} 
            colors={{ bg: "bg-purple-50/50", border: "border-purple-100", iconBg: "bg-[#6c4875]", text: "text-[#6c4875]" }} 
            isLoading={isLoading && !stats}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <FilterButton 
              label="All Logs" 
              isActive={filter === "ALL"} 
              onClick={() => handleFilterChange("ALL")} 
            />
            <FilterButton 
              label="Entries" 
              isActive={filter === "ENTRY"} 
              onClick={() => handleFilterChange("ENTRY")} 
            />
            <FilterButton 
              label="Exits" 
              isActive={filter === "EXIT"} 
              onClick={() => handleFilterChange("EXIT")} 
            />
          </div>

          <div className="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest flex items-center justify-center gap-2 w-full md:w-auto shadow-sm">
            <Clock size={14} className={isLoading ? "animate-spin text-[#872f89]" : "text-gray-400"} /> 
            {isLoading ? "SYNCING..." : "LIVE UPDATES: ENABLED"}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative">
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
              <Loader2 className="animate-spin text-[#872f89]" size={32} />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-200 table-fixed">
              <thead className="bg-[#faf8fc] border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6 w-[15%] text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Timestamp</th>
                  <th className="py-4 px-6 w-[20%] text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Device ID</th>
                  <th className="py-4 px-6 w-[25%] text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Employee Name</th>
                  <th className="py-4 px-6 w-[20%] text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Gate</th>
                  <th className="py-4 px-6 w-[20%] text-[11px] font-bold text-gray-500 uppercase tracking-widest text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-50">
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/80 transition-colors group">
                      {/* Timestamp */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-800">{log.time}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{log.date}</p>
                      </td>

                      {/* Device ID */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Laptop size={18} className="text-[#872f89]" />
                          <span className="text-sm font-bold text-gray-700">{log.deviceId}</span>
                        </div>
                      </td>

                      {/* Employee Name */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <UserCircle2 size={20} />
                          </div>
                          <span className="text-sm font-bold text-gray-800">{log.employee}</span>
                        </div>
                      </td>

                      {/* Gate */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-3.5 py-1.5 bg-gray-100 rounded-full text-[11px] font-bold text-gray-600">
                          {log.gate}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase
                          ${log.action === 'ENTRY' 
                            ? "bg-[#e5f5e5] text-[#2e8b2e]" 
                            : "bg-red-50 text-red-600"
                          }
                        `}>
                          {log.action === 'ENTRY' ? <LogIn size={12} /> : <LogOut size={12} />}
                          {log.action}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500 text-sm font-medium">
                      No logs found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
            <p className="text-sm text-gray-500 font-medium text-center sm:text-left">
              Showing <span className="font-bold text-gray-800">{logs.length > 0 ? (currentPage - 1) * limit + 1 : 0}</span> to <span className="font-bold text-gray-800">{Math.min(currentPage * limit, totalRecords)}</span> of <span className="font-bold text-gray-800">{totalRecords}</span>
            </p>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-bold text-gray-400 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button 
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-colors shadow-sm
                        ${currentPage === pageNum 
                          ? "bg-[#872f89] text-white" 
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 text-sm font-bold text-[#872f89] hover:text-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}


type StatCardProps = {
  value: string;
  label: string;
  icon: React.ReactNode;
  isLoading?: boolean;
  colors: {
    bg: string;
    border: string;
    iconBg: string;
    text: string;
  }
};

function StatCard({ value, label, icon, colors, isLoading }: StatCardProps) {
  return (
    <div className={`p-5 xl:p-8 rounded-3xl xl:rounded-4xl border ${colors.border} ${colors.bg} flex items-center gap-4 xl:gap-5 transition-all hover:shadow-sm`}>
      {/* Circle Icon Wrapper */}
      <div className={`w-12 h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center shadow-sm shrink-0 ${colors.iconBg}`}>
        {icon}
      </div>
      
      {/* Text Data */}
      <div className="flex-1">
        {isLoading ? (
          <div className="h-8 w-16 bg-gray-200/50 rounded animate-pulse mb-2"></div>
        ) : (
          <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black ${colors.text} leading-none mb-1`}>
            {value}
          </h3>
        )}
        <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">
          {label}
        </p>
      </div>
    </div>
  );
}

function FilterButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-bold transition-all
        ${isActive 
          ? "bg-[#872f89] text-white shadow-sm" 
          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
        }
      `}
    >
      {label}
    </button>
  );
}

const DUMMY_LOGS: MovementLog[] =[
  { id: 1, time: "14:23:45", date: "OCT 24, 2023", deviceId: "CBE-LP-9982-X", employee: "Mahder Hailay", gate: "Main North", action: "ENTRY" },
  { id: 2, time: "14:21:10", date: "OCT 24, 2023", deviceId: "CBE-LP-1044-B", employee: "Edini Amare", gate: "West Deck", action: "EXIT" },
  { id: 3, time: "14:15:32", date: "OCT 24, 2023", deviceId: "CBE-LP-5521-G", employee: "Lidya Yegeremu", gate: "Main North", action: "ENTRY" },
  { id: 4, time: "14:02:18", date: "OCT 24, 2023", deviceId: "CBE-LP-8800-Q", employee: "Mahlet Hailu", gate: "Service Gate", action: "EXIT" },
  { id: 5, time: "13:58:04", date: "OCT 24, 2023", deviceId: "CBE-LP-2311-S", employee: "Winitana G/Hiwet", gate: "West Deck", action: "ENTRY" },
  { id: 6, time: "13:45:59", date: "OCT 24, 2023", deviceId: "CBE-LP-9001-A", employee: "Eftu Tesfaye", gate: "Main North", action: "EXIT" },
  { id: 7, time: "13:30:12", date: "OCT 24, 2023", deviceId: "CBE-LP-1122-Z", employee: "Rahel Abera", gate: "Main North", action: "ENTRY" },
  { id: 8, time: "13:15:00", date: "OCT 24, 2023", deviceId: "CBE-LP-3344-Y", employee: "Mulah Mohammed", gate: "East Deck", action: "EXIT" },
];