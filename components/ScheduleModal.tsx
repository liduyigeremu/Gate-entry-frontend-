"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, X, ChevronDown } from "lucide-react";

export default function ScheduleModal({ open, setOpen, onAssign }: { 
  open: boolean, 
  setOpen: (open: boolean) => void,
  onAssign?: (assignmentData: any) => void 
}) {
  
  // --- Initialization & Current Date ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  
  // Form State
  const [selectedGuard, setSelectedGuard] = useState("Edini Amare");
  const [selectedGate, setSelectedGate] = useState("North Main");

  // Store assignments persistently
  const [assignments, setAssignments] = useState<{ [key: string]: string[] }>(() => {
    // Try to load from localStorage on initial load
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gate_assignments');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    // Return empty object if no saved data
    return {};
  });

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gate_assignments', JSON.stringify(assignments));
    }
  }, [assignments]);

  // Gate colors mapping
  const gateColors: { [key: string]: string } = {
    "North Main": "bg-purple-600",
    "West Perimeter": "bg-blue-500",
    "East Access": "bg-green-500",
    "South Exit": "bg-orange-500",
  };

  // Available guards
  const availableGuards = [
    { id: 1, name: "Edini Amare", phone: "+251912345678", status: "available" },
    { id: 2, name: "John Doe", phone: "+251987654321", status: "available" },
    { id: 3, name: "Sarah Smith", phone: "+251955566677", status: "available" },
    { id: 4, name: "Michael Brown", phone: "+251944433322", status: "available" },
  ];

  // Available gates
  const availableGates = ["North Main", "West Perimeter", "East Access", "South Exit"];

  // Prevent background scrolling when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);

  if (!open) return null;

  // --- Calendar Math ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startingDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = [];
  
  for (let i = 0; i < startingDayIndex; i++) {
    days.push({ day: daysInPrevMonth - startingDayIndex + i + 1, isCurrentMonth: false });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const thisDate = new Date(year, month, i);
    const isPast = thisDate < today;
    
    const dateString = thisDate.toISOString().split('T')[0];
    const assignedGates = assignments[dateString] || [];

    days.push({ 
      day: i, 
      isCurrentMonth: true, 
      date: thisDate, 
      isPast: isPast,
      assignedGates: assignedGates
    });
  }
  
  const remainingSlots = 42 - days.length;
  for (let i = 1; i <= remainingSlots; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return "Select a date";
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleConfirmAssignment = async () => {
    if (!selectedDate) {
      console.error("❌ No date selected");
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    
    // Check if this gate is already assigned to this date
    const currentAssignments = assignments[dateString] || [];
    
    if (currentAssignments.includes(selectedGate)) {
      console.warn(`⚠️ Gate "${selectedGate}" is already assigned to this date`);
      alert(`Gate "${selectedGate}" is already assigned to ${formatSelectedDate(selectedDate)}`);
      return;
    }

    // Add the new assignment
    const updatedAssignments = {
      ...assignments,
      [dateString]: [...currentAssignments, selectedGate]
    };
    
    setAssignments(updatedAssignments);

    const assignmentData = {
      guard_id: availableGuards.find(g => g.name === selectedGuard)?.id,
      guard_name: selectedGuard,
      gate: selectedGate,
      date: dateString,
      assigned_at: new Date().toISOString(),
      status: "scheduled"
    };

    // Clear console for better readability
    console.clear();
    console.log("=".repeat(50));
    console.log("✅ SHIFT ASSIGNMENT CONFIRMED");
    console.log("=".repeat(50));
    console.log("📋 Assignment Details:");
    console.log(`   Guard: ${assignmentData.guard_name}`);
    console.log(`   Gate: ${assignmentData.gate}`);
    console.log(`   Date: ${assignmentData.date}`);
    console.log(`   Time: ${new Date(assignmentData.assigned_at).toLocaleString()}`);
    console.log(`   Status: ${assignmentData.status}`);
    console.log("=".repeat(50));
    console.log("📦 JSON Payload for Backend:");
    console.log(JSON.stringify(assignmentData, null, 2));
    console.log("=".repeat(50));

    // Call the onAssign callback if provided
    if (onAssign) {
      try {
        await onAssign(assignmentData);
        console.log("✅ Assignment data sent to backend successfully");
      } catch (error) {
        console.error("❌ Error sending to backend:", error);
      }
    }

    // Close modal after successful assignment
    setOpen(false);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-all duration-300 overflow-y-auto">
      
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        
        {/* Modal Card */}
        <div className="bg-white w-full max-w-[1100px] rounded-3xl sm:rounded-[32px] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
          
          {/* Purple line at top */}
          <div className="absolute top-0 left-4 right-4 h-1 bg-[#872f89] rounded-full"></div>

          {/* Close Button */}
          <button 
            onClick={() => setOpen(false)} 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors z-20"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div className="p-5 pt-14 sm:p-8 lg:p-12">
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Duty Scheduler</h1>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              
              {/* LEFT: CALENDAR SECTION */}
              <div className="flex-1">
                
                {/* Calendar Header */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <button onClick={handlePrevMonth} className="p-1 text-gray-500 hover:text-gray-900 transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 min-w-[120px] sm:min-w-[150px] text-center">
                    {monthNames[month]} {year}
                  </h2>
                  <button onClick={handleNextMonth} className="p-1 text-gray-500 hover:text-gray-900 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-[16px] sm:rounded-[24px] border border-gray-100 overflow-hidden shadow-sm">
                  
                  {/* Days Header */}
                  <div className="grid grid-cols-7 bg-[#faf8fc] border-b border-gray-100">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                      <div key={day} className="py-3 sm:py-4 text-center text-[10px] sm:text-xs font-bold text-gray-400 tracking-widest">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 auto-rows-[60px] sm:auto-rows-[90px]">
                    {days.map((item, index) => {
                      const isSelected = item.isCurrentMonth && selectedDate && 
                        item.date?.getDate() === selectedDate.getDate() && 
                        item.date?.getMonth() === selectedDate.getMonth() &&
                        item.date?.getFullYear() === selectedDate.getFullYear();

                      return (
                        <div 
                          key={index}
                          onClick={() => {
                            if (item.isCurrentMonth && !item.isPast) {
                              setSelectedDate(item.date!);
                            }
                          }}
                          className={`
                            p-1.5 sm:p-3 border-r border-b border-gray-50 flex flex-col relative transition-all
                            ${!item.isCurrentMonth ? "bg-gray-50/30" : ""}
                            ${item.isPast ? "opacity-40 cursor-not-allowed bg-gray-50/10" : ""}
                            ${item.isCurrentMonth && !item.isPast ? "cursor-pointer hover:bg-purple-50/50" : ""}
                            ${isSelected ? "z-10" : ""}
                          `}
                        >
                          {isSelected && (
                            <div className="absolute inset-0.5 sm:inset-1 border-[2px] border-[#872f89] rounded-[16px] sm:rounded-[24px] pointer-events-none shadow-sm" />
                          )}
                          
                          <span className={`text-sm sm:text-base font-bold pl-1 z-10 
                            ${item.isCurrentMonth ? "text-gray-900" : "text-gray-200"}
                            ${item.isPast ? "text-gray-400" : ""}
                          `}>
                            {item.day}
                          </span>

                          {/* Colored dots for assigned gates */}
                          {item.isCurrentMonth && item.assignedGates && item.assignedGates.length > 0 && (
                            <div className="flex gap-1 pl-1 mt-1 sm:mt-2 z-10 flex-wrap">
                              {item.assignedGates.map((gate, idx) => (
                                <span 
                                  key={idx}
                                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${gateColors[gate] || 'bg-gray-400'}`}
                                  title={`${gate} assigned`}
                                ></span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT: QUICK ASSIGN SECTION */}
              <div className="w-full lg:w-[400px]">
                <div className="bg-white rounded-2xl sm:rounded-[32px] sm:shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:border border-gray-50 pt-6 sm:p-8 h-full flex flex-col">
                  
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Quick Assign</h3>
                  </div>

                  <div className="space-y-6 sm:space-y-8 flex-1">
                    
                    {/* Target Date - No calendar icon */}
                    <div className="space-y-2 sm:space-y-3">
                      <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-widest uppercase">Target Date</label>
                      <input 
                        readOnly
                        value={formatSelectedDate(selectedDate)}
                        className="w-full pl-4 sm:pl-5 pr-4 py-3.5 sm:py-4 bg-white border border-gray-200 sm:border-gray-100 shadow-sm rounded-xl sm:rounded-2xl text-sm font-bold text-gray-800 outline-none cursor-pointer"
                      />
                    </div>

                    {/* Select Guard */}
                    <div className="space-y-2 sm:space-y-3">
                      <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-widest uppercase">Select Guard</label>
                      <div className="relative">
                        <select 
                          value={selectedGuard}
                          onChange={(e) => setSelectedGuard(e.target.value)}
                          className="w-full pl-4 sm:pl-5 pr-12 py-3.5 sm:py-4 bg-white border border-gray-200 sm:border-gray-100 shadow-sm rounded-xl sm:rounded-2xl text-sm font-bold text-gray-800 outline-none appearance-none cursor-pointer"
                        >
                          {availableGuards.map(guard => (
                            <option key={guard.id} value={guard.name}>
                              {guard.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={18} className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none sm:w-5 sm:h-5" />
                      </div>
                    </div>

                    {/* Assign to Gate with color indicators */}
                    <div className="space-y-2 sm:space-y-3">
                      <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-widest uppercase">Assign to Gate</label>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {availableGates.map((gate) => (
                          <button
                            key={gate}
                            type="button"
                            onClick={() => setSelectedGate(gate)}
                            className={`
                              py-3 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-[20px] text-[11px] sm:text-xs font-bold text-center transition-all border flex items-center justify-center gap-2
                              ${selectedGate === gate 
                                ? "border-[#872f89] text-[#872f89] bg-purple-50/30 shadow-sm" 
                                : "border-gray-200 sm:border-gray-100 text-gray-500 hover:bg-gray-50"
                              }
                            `}
                          >
                            <span className={`w-2 h-2 rounded-full ${gateColors[gate]}`}></span>
                            {gate}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Show existing assignments for selected date */}
                    {selectedDate && assignments[selectedDate.toISOString().split('T')[0]]?.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-widest uppercase">Already Assigned Gates</label>
                        <div className="flex gap-2 flex-wrap">
                          {assignments[selectedDate.toISOString().split('T')[0]].map((gate, idx) => (
                            <span key={idx} className={`px-2 py-1 rounded-full text-xs text-white ${gateColors[gate]}`}>
                              {gate}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Confirm Button */}
                  <button 
                    onClick={handleConfirmAssignment}
                    disabled={!selectedDate}
                    className={`w-full mt-8 text-white py-4 sm:py-5 rounded-xl sm:rounded-[24px] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-3 group
                      ${selectedDate 
                        ? "bg-[#872f89] hover:bg-purple-800 cursor-pointer" 
                        : "bg-gray-400 cursor-not-allowed"
                      }
                    `}
                  >
                    CONFIRM SHIFT ASSIGNMENT
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}