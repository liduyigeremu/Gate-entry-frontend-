// components/RegisterGateModal.tsx
"use client";

import { X, Plus } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

interface RegisterFormData {
  gateName: string;
  location: string;
}

interface FormErrors {
  gateName?: string;
  location?: string;
}

interface RegisterGateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onGateAdded?: () => void;
}

export default function RegisterGateModal({ open, setOpen, onGateAdded }: RegisterGateModalProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    gateName: "",
    location: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  if (!open) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate Gate Name
    if (!formData.gateName.trim()) {
      newErrors.gateName = "Gate name is required";
    } else if (formData.gateName.trim().length < 2) {
      newErrors.gateName = "Gate name must be at least 2 characters";
    }
    
    // Validate Location
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (formData.location.trim().length < 3) {
      newErrors.location = "Location must be at least 3 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Log the data (ready for backend integration)
    console.log("=== Registering New Gate ===");
    console.log("Gate Name:", formData.gateName);
    console.log("Location:", formData.location);
    console.log("============================");
    
    // Simulate API call
    try {
      // TODO: Replace with actual Go backend API call
      // const response = await fetch("http://localhost:8080/api/gates/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     gateName: formData.gateName,
      //     location: formData.location
      //   }),
      // });
      
      // if (!response.ok) throw new Error("Registration failed");
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("✅ Gate registered successfully!");
      
      // Call the onGateAdded callback to refresh the data
      if (onGateAdded) {
        console.log("🔄 Refreshing gate list...");
        await onGateAdded();
      }
      
      // Reset form and close modal on success
      handleReset();
      setOpen(false);
      
      alert("Gate registered successfully!");
      
    } catch (error) {
      console.error("❌ Registration error:", error);
      alert("Failed to register gate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      gateName: "",
      location: "",
    });
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300" onClick={handleClose}>
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-md rounded-[24px] shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 border-t-4 border-[#872f89]" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                
                <h2 className="text-[#872f89] font-bold text-xl">
                  Register New Gate
                </h2>
              </div>
           
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              
              {/* Gate Name */}
              <div className="space-y-1.5">
                <label htmlFor="gateName" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  Gate Name 
                </label>
                <input
                  id="gateName"
                  type="text"
                  value={formData.gateName}
                  onChange={handleInputChange}
                  placeholder="e.g., GATE 04 - EAST"
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.gateName ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`}
                />
                {errors.gateName && (
                  <p className="text-xs text-red-500 mt-1">{errors.gateName}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  Location 
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., East Entrance, Building A"
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.location ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`}
                />
                {errors.location && (
                  <p className="text-xs text-red-500 mt-1">{errors.location}</p>
                )}
              </div>

            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
             
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 py-3 bg-[#872f89] hover:bg-purple-800 text-white font-medium rounded-3xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Registering..." : "Register Gate"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}