"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ListFilter, UserPlus, Search, Calendar, Info, RefreshCw, MoreVertical, Plus } from "lucide-react";
import RegisterModal from "./RegisterModal"; 
import ScheduleModal from "./ScheduleModal"; 
import RegisterGateModal from "./RegisterGateModal";

// Types
interface Guard {
  id: string;
  name: string;
  role: string;
  gate: string;
  gateId?: string;
  employeeId: string;
  status: 'assigned' | 'unassigned';
  avatar?: string;
  onPostTime?: string;
}

interface Gate {
  id: string;
  name: string;
  title: string;
  status: 'active' | 'empty';
  guard?: Guard;
  securedAt?: string;
}

interface DashboardStats {
  totalGuards: number;
  activeGuards: number;
  onLeaveGuards: number;
  totalGates: number;
}

export default function GuardManagement() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isGateModalOpen, setIsGateModalOpen] = useState(false);
  const [guards, setGuards] = useState<Guard[]>([]);
  const [gates, setGates] = useState<Gate[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalGuards: 0,
    activeGuards: 0,
    onLeaveGuards: 0,
    totalGates: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);

  const logger = {
    info: (message: string, data?: any) => console.log(message, data || ""),
    success: (message: string, data?: any) => console.log(message, data || ""),
    error: (message: string, data?: any) => console.log(message, data || ""),
    api: (message: string, data?: any) => console.log(message, data || "")
  };

  const fetchGuards = async (): Promise<Guard[]> => {
    logger.api("Fetching guards from database...");
    const mockGuards = [
      { id: "1", name: "John Smith", role: "Guard", gate: "NORTH GATE", gateId: "gate1", employeeId: "#GS-9921", status: "assigned" as const, onPostTime: "2h 45m" },
      { id: "2", name: "Mike Johnson", role: "Senior Guard", gate: "UNASSIGNED", employeeId: "#GS-8842", status: "unassigned" as const },
      { id: "3", name: "Sarah Williams", role: "Guard", gate: "SOUTH GATE", gateId: "gate2", employeeId: "#GS-5543", status: "assigned" as const, onPostTime: "4h 20m" },
      { id: "4", name: "David Brown", role: "Guard", gate: "WEST GATE", gateId: "gate3", employeeId: "#GS-6678", status: "assigned" as const, onPostTime: "1h 15m" },
      { id: "5", name: "Emily Davis", role: "Guard", gate: "UNASSIGNED", employeeId: "#GS-7789", status: "unassigned" as const },
      { id: "6", name: "Robert Wilson", role: "Supervisor", gate: "NORTH GATE", gateId: "gate1", employeeId: "#GS-8890", status: "assigned" as const, onPostTime: "5h 30m" },
    ];
    logger.success(`Fetched ${mockGuards.length} guards`);
    return mockGuards;
  };

  const fetchGates = async (): Promise<Gate[]> => {
    logger.api("Fetching gates from database...");
    const mockGates = [
      { id: "gate1", name: "GATE 01", title: "GATE 01 - NORTH", status: "active" as const, securedAt: "10:30 AM" },
      { id: "gate2", name: "GATE 02", title: "GATE 02 - SOUTH", status: "active" as const, securedAt: "09:15 AM" },
      { id: "gate3", name: "GATE 03", title: "GATE 03 - WEST", status: "empty" as const },
    ];
    const guardsData = await fetchGuards();
    const gatesWithGuards = mockGates.map(gate => ({
      ...gate,
      guard: guardsData.find(g => g.gateId === gate.id)
    }));
    logger.success(`Fetched ${gatesWithGuards.length} gates`);
    return gatesWithGuards;
  };

  const fetchStats = async (): Promise<DashboardStats> => {
    logger.api("Fetching dashboard statistics...");
    const mockStats = {
      totalGuards: 42,
      activeGuards: 8,
      onLeaveGuards: 3,
      totalGates: 12
    };
    logger.success("Statistics fetched", mockStats);
    return mockStats;
  };

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [guardsData, gatesData, statsData] = await Promise.all([
        fetchGuards(),
        fetchGates(),
        fetchStats()
      ]);
      setGuards(guardsData);
      setGates(gatesData);
      setStats(statsData);
      logger.success("Dashboard data loaded successfully");
    } catch (err) {
      logger.error("Failed to load dashboard data", err);
      setError("Failed to load dashboard data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    logger.info("Manual refresh triggered");
    loadDashboardData();
  };

  const filteredGuards = guards.filter(guard => {
    const matchesSearch = guard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guard.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guard.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || 
                          (filterStatus === "assigned" && guard.status === "assigned") ||
                          (filterStatus === "unassigned" && guard.status === "unassigned");
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    logger.info("GuardManagement component mounted");
    loadDashboardData();
    const interval = setInterval(() => {
      logger.info("Auto-refreshing data...");
      loadDashboardData();
    }, 30000);
    return () => {
      logger.info("GuardManagement component unmounting");
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#fcfdff]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#872f89] border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading guard management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-32 w-full">
      
      <div className={`transition-all duration-300 w-full ${isModalOpen || isScheduleOpen || isGateModalOpen ? "blur-[4px] pointer-events-none" : ""}`}>
        <main className="p-4 sm:p-6 lg:p-8 xl:p-10">
          
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
            
            {/* Search Bar */}
            <div className="relative w-full xl:w-[450px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search guards by name, role, or gate assignment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-100/80 focus:bg-white border-transparent focus:ring-2 focus:ring-[#872f89] rounded-full text-sm outline-none transition-all shadow-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#872f89] hover:bg-purple-700 text-white font-medium rounded-full text-sm transition-colors w-full sm:w-auto shadow-sm"
              >
                <UserPlus size={16} />
                Add Guard
              </button>

              <button 
                onClick={() => setIsGateModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#872f89] hover:bg-purple-700 text-white font-medium rounded-full text-sm transition-colors w-full sm:w-auto shadow-sm border border-gray-200"
              >
                <Plus size={16} />
                Add Gate
              </button>

              <button 
                onClick={() => setIsScheduleOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#872f89] hover:bg-purple-700 text-white font-medium rounded-full text-sm transition-colors w-full sm:w-auto shadow-sm"
              >
                <Calendar size={16} />
                Schedule
              </button>
            </div>
          </div>

          {/* Flex Layout for Table and Gate Widgets */}
          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
            <div className="flex-1 min-w-0">
              <GuardTable guards={filteredGuards} />
            </div>
            <div className="w-full xl:w-[420px] flex-shrink-0 space-y-6">
              {gates.map((gate) => (
                <GateCard 
                  key={gate.id}
                  title={gate.title}
                  empty={gate.status === 'empty'}
                  active={gate.status === 'active'}
                  guard={gate.guard}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Floating Stats */}
        <div className="fixed bottom-6 left-1/2 md:left-[calc(50%+8rem)] -translate-x-1/2 w-[90%] md:w-auto bg-white rounded-full shadow-lg border border-gray-100 p-2 pr-2 pl-8 flex items-center justify-between md:justify-center gap-6 md:gap-12 z-30">
          <Stat label="Guards" value={stats.totalGuards.toString()} color="text-gray-800" />
          <div className="w-px h-8 bg-gray-100 hidden sm:block"></div>
          <Stat label="Active" value={stats.activeGuards.toString()} color="text-[#872f89]" />
          <div className="w-px h-8 bg-gray-100 hidden sm:block"></div>
          <Stat label="On Leave" value={stats.onLeaveGuards.toString()} color="text-red-500" />
          
          <button 
            onClick={handleRefresh}
            className="w-12 h-12 bg-[#872f89] hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-md transition-colors sm:ml-4"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <RegisterModal open={isModalOpen} setOpen={setIsModalOpen} onGuardAdded={loadDashboardData} />
      <ScheduleModal open={isScheduleOpen} setOpen={setIsScheduleOpen} />
      <RegisterGateModal open={isGateModalOpen} setOpen={setIsGateModalOpen} onGateAdded={loadDashboardData} />
    </div>
  );
}

// Guard Table Component - EXACTLY as you had it
function GuardTable({ guards }: { guards: Guard[] }) {
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-2 sm:p-6 overflow-x-auto w-full">
      <table className="w-full text-left min-w-[600px] table-fixed">
        <thead className="text-gray-400 text-[11px] uppercase font-bold tracking-wider border-b border-transparent">
          <tr>
            <th className="py-4 px-4 w-[40%]">Guard Name</th>
            <th className="py-4 px-4 w-[20%]">Role</th>
            <th className="py-4 px-4 w-[25%]">Assigned Gate</th>
            <th className="py-4 px-4 w-[15%] text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guards.map((guard, i) => (
            <tr key={guard.id} className="hover:bg-gray-50/50 transition-colors group rounded-2xl">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${i}`} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{guard.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">ID: {guard.employeeId}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">{guard.role}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                  guard.status === 'assigned' 
                    ? "bg-purple-100/80 text-[#872f89]" 
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {guard.gate}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <button className="text-gray-400 hover:text-[#872f89] p-2 rounded-lg transition-colors">
                  <MoreVertical size={18} className="mx-auto" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Gate Card Component - EXACTLY as you had it
function GateCard({ title, empty, active, guard }: { 
  title: string; 
  empty?: boolean; 
  active?: boolean;
  guard?: Guard;
}) {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 w-full">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[11px] font-bold text-gray-400 tracking-widest">{title}</p>
        {active && (
          <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase tracking-wider">
            Secured
          </span>
        )}
      </div>

      {empty && (
        <div className="border-[1.5px] border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center rounded-[20px]">
          <div className="w-12 h-12 bg-[#faf8fc] rounded-full flex items-center justify-center text-gray-400 mb-3">
            <UserPlus size={20} strokeWidth={1.5} />
          </div>
          <p className="text-sm text-gray-500 mb-4 font-medium">Assign a guard</p>
          <button className="text-[11px] font-bold bg-[#faf8fc] hover:bg-gray-100 text-gray-600 px-6 py-2.5 rounded-full transition-colors tracking-wide">
            QUICK ASSIGN
          </button>
        </div>
      )}

      {active && guard && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={`https://i.pravatar.cc/150?u=${guard.id}`}
              alt="Guard" 
              className="w-12 h-12 rounded-full border border-gray-100" 
            />
            <div>
              <p className="font-bold text-sm text-gray-800">{guard.name}</p>
              <p className="text-[11px] font-medium text-green-500 flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                On Post: {guard.onPostTime || "2h 45m"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-[#FEF2F2] hover:bg-red-100 text-red-600 text-[11px] font-bold py-3 rounded-2xl transition-colors tracking-wide">
              RELIEVE
            </button>
            <button className="w-12 bg-[#faf8fc] hover:bg-gray-100 text-gray-400 flex items-center justify-center rounded-2xl transition-colors border border-transparent">
              <Info size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-[22px] font-bold ${color} leading-none`}>{value}</p>
    </div>
  );
}