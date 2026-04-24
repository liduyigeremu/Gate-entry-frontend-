// components/RegisterGateModal.tsx
"use client";

import { X } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

interface RegisterFormData {
  gate_name: string;
  location: string;
  description: string;
}

interface FormErrors {
  gate_name?: string;
  location?: string;
  description?: string;
}

interface RegisterGateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onGateAdded?: () => void;
}

export default function RegisterGateModal({ open, setOpen, onGateAdded }: RegisterGateModalProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    gate_name: "",
    location: "",
    description: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  if (!open) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
    // Clear server error when user makes changes
    if (serverError) {
      setServerError(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate Gate Name
    if (!formData.gate_name.trim()) {
      newErrors.gate_name = "Gate name is required";
    } else if (formData.gate_name.trim().length < 2) {
      newErrors.gate_name = "Gate name must be at least 2 characters";
    }
    
    // Validate Location
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (formData.location.trim().length < 3) {
      newErrors.location = "Location must be at least 3 characters";
    }
    
    // Validate Description (optional but validate if provided)
    if (formData.description && formData.description.trim().length < 3) {
      newErrors.description = "Description must be at least 3 characters if provided";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getAuthToken = (): string | null => {
    return localStorage.getItem("authToken");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setServerError(null);
    
    // Get auth token
    const token = getAuthToken();
    if (!token) {
      setServerError("Authentication required. Please log in again.");
      setIsSubmitting(false);
      return;
    }
    
    console.log("=== Registering New Gate ===");
    console.log("Gate Name:", formData.gate_name);
    console.log("Location:", formData.location);
    console.log("Description:", formData.description);
    console.log("============================");
    
    try {
      // Actual Go backend API call
      const response = await fetch("http://localhost:8080/api/v1/gates", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          gate_name: formData.gate_name,
          location: formData.location,
          description: formData.description || "" // Send empty string if not provided
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || result.error || "Failed to register gate");
      }
      
      console.log("✅ Gate registered successfully:", result);
      
      // Call the onGateAdded callback to refresh the data
      if (onGateAdded) {
        console.log("🔄 Refreshing gate list...");
        await onGateAdded();
      }
      
      // Reset form and close modal on success
      handleReset();
      setOpen(false);
      
    } catch (error: any) {
      console.error("❌ Registration error:", error);
      setServerError(error.message || "Failed to register gate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      gate_name: "",
      location: "",
      description: "",
    });
    setErrors({});
    setServerError(null);
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
              <h2 className="text-[#872f89] font-bold text-xl">
                Register New Gate
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Add a new gate to the system
              </p>
            </div>

            {/* Server Error Display */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{serverError}</p>
              </div>
            )}

            {/* Input Fields */}
            <div className="space-y-4">
              
              {/* Gate Name */}
              <div className="space-y-1.5">
                <label htmlFor="gate_name" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  Gate Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="gate_name"
                  type="text"
                  value={formData.gate_name}
                  onChange={handleInputChange}
                  placeholder="e.g., Main Entrance"
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.gate_name ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`}
                />
                {errors.gate_name && (
                  <p className="text-xs text-red-500 mt-1">{errors.gate_name}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label htmlFor="location" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., North Wing, Building A"
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.location ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`}
                />
                {errors.location && (
                  <p className="text-xs text-red-500 mt-1">{errors.location}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  Description <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Additional details about this gate..."
                  rows={3}
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm resize-none`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                )}
              </div>

            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-3xl transition-colors"
              >
                Cancel
              </button>
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