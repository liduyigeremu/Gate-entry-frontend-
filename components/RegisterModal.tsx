// components/RegisterModal.tsx
"use client";

import { X, Camera, Plus } from "lucide-react";
import { useState, useRef, ChangeEvent, FormEvent } from "react";

interface RegisterFormData {
  guardId: string;
  fullName: string;
  phoneNumber: string;
  profilePhoto: File | null;
}

// Separate interface for validation errors
interface FormErrors {
  guardId?: string;
  fullName?: string;
  phoneNumber?: string;
  profilePhoto?: string;
}

interface RegisterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onGuardAdded?: () => void; // Add this prop
}

export default function RegisterModal({ open, setOpen, onGuardAdded }: RegisterModalProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    guardId: "",
    fullName: "",
    phoneNumber: "",
    profilePhoto: null,
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === "guard-id" ? "guardId" : id === "full-name" ? "fullName" : "phoneNumber"]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, profilePhoto: "Please upload a valid image file (JPEG, PNG, WEBP)" }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePhoto: "File size must be less than 5MB" }));
        return;
      }

      setFormData(prev => ({ ...prev, profilePhoto: file }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setErrors(prev => ({ ...prev, profilePhoto: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate Guard ID
    if (!formData.guardId.trim()) {
      newErrors.guardId = "Guard ID is required";
    } else if (!/^\d+$/.test(formData.guardId)) {
      newErrors.guardId = "Guard ID must contain only numbers";
    }
    
    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }
    
    // Validate Phone Number
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = "Please enter a valid phone number (10-15 digits)";
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
    
    // Prepare data for backend
    const submitData = new FormData();
    submitData.append("guardId", formData.guardId);
    submitData.append("fullName", formData.fullName);
    submitData.append("phoneNumber", formData.phoneNumber);
    if (formData.profilePhoto) {
      submitData.append("profilePhoto", formData.profilePhoto);
    }
    
    // Log the data (ready for backend integration)
    console.log("=== Registering New Guard ===");
    console.log("Guard ID:", formData.guardId);
    console.log("Full Name:", formData.fullName);
    console.log("Phone Number:", formData.phoneNumber);
    console.log("Profile Photo:", formData.profilePhoto ? formData.profilePhoto.name : "No photo uploaded");
    console.log("Photo Size:", formData.profilePhoto ? `${(formData.profilePhoto.size / 1024).toFixed(2)} KB` : "N/A");
    console.log("Photo Type:", formData.profilePhoto?.type || "N/A");
    console.log("============================");
    
    // Simulate API call
    try {
      // TODO: Replace with actual Go backend API call
      // const response = await fetch("http://localhost:8080/api/guards/register", {
      //   method: "POST",
      //   body: submitData,
      // });
      
      // if (!response.ok) throw new Error("Registration failed");
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("✅ Guard registered successfully!");
      
      // Call the onGuardAdded callback to refresh the data
      if (onGuardAdded) {
        console.log("🔄 Refreshing guard list...");
        await onGuardAdded();
      }
      
      // Reset form and close modal on success
      handleReset();
      setOpen(false);
      
      // You can add a success toast/notification here
      alert("Guard registered successfully!");
      
    } catch (error) {
      console.error("❌ Registration error:", error);
      alert("Failed to register guard. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      guardId: "",
      fullName: "",
      phoneNumber: "",
      profilePhoto: null,
    });
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
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
              <h2 className="text-[#872f89] font-bold text-lg">
                Register New Personnel
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter credentials for centralized security clearance.
              </p>
            </div>

            {/* Profile Upload Circle with Plus Icon on Bottom Right */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                
                {/* Main Profile Circle */}
                <div 
                  onClick={triggerFileUpload}
                  className="w-24 h-24 rounded-full border-2 border-dashed border-purple-300 hover:border-[#872f89] flex flex-col items-center justify-center text-purple-500 cursor-pointer bg-purple-50/50 hover:bg-purple-50 transition-all group overflow-hidden relative"
                >
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <>
                      <Camera size={20} className="group-hover:scale-105 transition-transform" />
                      <span className="text-[10px] mt-0.5 text-purple-400 group-hover:text-[#872f89]">Profile<br/>Photo</span>
                    </>
                  )}
                </div>
                
                {/* Plus Icon on Bottom Right */}
                <div 
                  onClick={triggerFileUpload}
                  className="absolute -bottom-1 -right-1 bg-[#872f89] rounded-full p-1.5 shadow-md border-2 border-white cursor-pointer hover:bg-purple-800 transition-colors"
                >
                  <Plus size={14} className="text-white" />
                </div>
              </div>
            </div>

            {/* Photo Error Message */}
            {errors.profilePhoto && (
              <p className="text-xs text-red-500 text-center -mt-4">{errors.profilePhoto}</p>
            )}

            {/* Input Fields */}
            <div className="space-y-4">
              
              {/* Guard ID */}
              <div className="space-y-1.5">
                <label htmlFor="guard-id" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  Guard ID
                </label>
                <input
                  id="guard-id"
                  type="text"
                  value={formData.guardId}
                  onChange={handleInputChange}
                  placeholder="071112"
                  required
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.guardId ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`}
                />
                {errors.guardId && (
                  <p className="text-xs text-red-500 mt-1">{errors.guardId}</p>
                )}
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="full-name" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  required
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label htmlFor="phone-number" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                  Phone Number
                </label>
                <input
                  id="phone-number"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+251976563412"
                  required
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`}
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
                )}
              </div>

            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 bg-[#872f89] hover:bg-purple-800 text-white font-medium rounded-3xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Registering..." : "Register Guard"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}