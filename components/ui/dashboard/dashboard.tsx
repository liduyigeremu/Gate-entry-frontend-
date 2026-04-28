'use client';

import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Shield,
  History,
  MonitorSmartphone
} from 'lucide-react';

// Types for our data
interface DeviceRequest {
  id: string;
  employeeName: string;
  deviceId: string;
  timeOut: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
}

interface DashboardStats {
  pendingRequests: number;
  activeGuards: number;
  logsToday: number;
  totalDevices: number;
}

interface MonthlyData {
  month: string;
  count: number;
}

// Type guard to validate status
const isValidStatus = (status: string): status is DeviceRequest['status'] => {
  return status === 'PENDING' || status === 'APPROVED' || status === 'REJECTED';
};

export default function DeviceEntryPortal() {
  const [requests, setRequests] = useState<DeviceRequest[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    pendingRequests: 0,
    activeGuards: 0,
    logsToday: 0,
    totalDevices: 0
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get initials from full name
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Helper function to get random color for avatar based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-100 text-purple-700',
      'bg-blue-100 text-blue-700',
      'bg-orange-100 text-orange-700',
      'bg-rose-100 text-rose-700',
      'bg-emerald-100 text-emerald-700',
      'bg-cyan-100 text-cyan-700'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Simulated API calls - Replace these with actual Go backend calls
  const fetchDashboardStats = async (): Promise<DashboardStats> => {
    return {
      pendingRequests: 24,
      activeGuards: 142,
      logsToday: 1247,
      totalDevices: 1284
    };
  };

  const fetchRecentRequests = async (): Promise<DeviceRequest[]> => {
    const mockData = [
      { id: '1', employeeName: 'Mahder Hailay', deviceId: 'CBE-Lp-9932', timeOut: '09:45 AM', status: 'PENDING', date: '2024-01-15' },
      { id: '2', employeeName: 'Edini Amare', deviceId: 'CBE-Lp-1102', timeOut: '08:20 AM', status: 'APPROVED', date: '2024-01-15' },
      { id: '3', employeeName: 'Lidya Ygerem', deviceId: 'CBE-Lp-4481', timeOut: '08:15 AM', status: 'APPROVED', date: '2024-01-15' },
      { id: '4', employeeName: 'Mahlet Hailu', deviceId: 'CBE-Lp-0092', timeOut: '07:50 AM', status: 'REJECTED', date: '2024-01-15' }
    ];
    
    return mockData.map(item => ({
      ...item,
      status: isValidStatus(item.status) ? item.status : 'PENDING'
    }));
  };

  const fetchMonthlyData = async (): Promise<MonthlyData[]> => {
    return [
      { month: 'Jan', count: 35 },
      { month: 'Feb', count: 52 },
      { month: 'Mar', count: 68 },
      { month: 'Apr', count: 48 },
      { month: 'May', count: 63 },
      { month: 'Jun', count: 82 },
      { month: 'Jul', count: 75 },
      { month: 'Aug', count: 58 },
      { month: 'Sep', count: 42 },
      { month: 'Oct', count: 56 },
      { month: 'Nov', count: 72 },
      { month: 'Dec', count: 95 }
    ];
  };

  // Load all dashboard data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, requestsData, monthlyDataResult] = await Promise.all([
        fetchDashboardStats(),
        fetchRecentRequests(),
        fetchMonthlyData()
      ]);
      
      setStats(statsData);
      setRequests(requestsData);
      setMonthlyData(monthlyDataResult);
      setError(null);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Function to prepare report
  const prepareReport = async () => {
    console.log('Preparing compliance report...');
    alert('Report generation feature will be connected to the backend');
  };

  // Load data on component mount
  useEffect(() => {
    loadDashboardData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get status badge styling
  const getStatusBadge = (status: DeviceRequest['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800';
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-800';
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fcfdff]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#872F89] border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen min-h-screen w-full bg-[#fcfdff] font-sans text-slate-900 selection:bg-purple-100">
      
      {/* Main Content Area - Full width */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1 - Pending Requests */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  +12%
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{stats.pendingRequests}</h3>
              </div>
            </div>

            {/* Card 2 - Active Guards */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Shield className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 uppercase tracking-wider">
                  8 Active
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">Active Guards</p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{stats.activeGuards}</h3>
              </div>
            </div>

            {/* Card 3 - Logs Today */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <History className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Updated Now
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">Logs Today</p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{stats.logsToday.toLocaleString()}</h3>
              </div>
            </div>

            {/* Card 4 - Total Devices */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <MonitorSmartphone className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  +12%
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">Total Devices</p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{stats.totalDevices.toLocaleString()}</h3>
              </div>
            </div>

          </div>

          {/* Bottom Section - Table and Chart */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* Left Column - Recent Requests Table */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-slate-900">Recent Device Requests</h2>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    New entries
                  </span>
                </div>
                <button 
                  onClick={() => loadDashboardData()}
                  className="text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#872F89' }}
                >
                  View All Requests
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="pb-4 pr-4">EMPLOYEE</th>
                      <th className="pb-4 px-4">DEVICE ID</th>
                      <th className="pb-4 px-4">TIME OUT</th>
                      <th className="pb-4 pl-4">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {requests.map((request) => (
                      <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${getAvatarColor(request.employeeName)}`}>
                              {getInitials(request.employeeName)}
                            </div>
                            <span className="font-semibold text-slate-900">{request.employeeName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-500">{request.deviceId}</td>
                        <td className="py-4 px-4 text-slate-500">{request.timeOut}</td>
                        <td className="py-4 pl-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column - Chart and CTA */}
            <div className="flex flex-col gap-6 lg:col-span-1">
              
              {/* Movement Analysis Chart - 12 Months with thick bars */}
              <div className="flex-1 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-sm font-bold text-slate-900">Movement Analysis</h2>
                
                {/* 12 months bar chart */}
                <div className="flex h-48 items-end justify-between gap-1 pb-4">
                  {monthlyData.map((data, index) => (
                    <div 
                      key={index}
                      className="w-8 rounded-t-md transition-all duration-500"
                      style={{ 
                        backgroundColor: '#872F89', 
                        opacity: 0.2 + (data.count / 100) * 0.8,
                        height: `${data.count}%`
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="flex justify-between text-[10px] font-medium text-slate-400">
                  {monthlyData.map((data, index) => (
                    <span key={index}>{data.month}</span>
                  ))}
                </div>
              </div>

              {/* Weekly Compliance Audit CTA Card */}
              <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-md cursor-pointer transition-transform hover:scale-[1.02]" 
                   style={{ backgroundColor: '#872F89' }}
                   onClick={prepareReport}>
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="mb-4 text-base font-semibold">Weekly Compliance Audit</h3>
                  <button className="w-full rounded-xl bg-white py-3 text-sm font-bold shadow-sm transition-colors hover:bg-slate-50" 
                          style={{ color: '#872F89' }}>
                    PREPARE REPORT
                  </button>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}