// components/RegisterModal.tsx
"use client";

import { X, Camera, Plus } from "lucide-react";
import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { ZodError } from "zod";
import { addGuardSchema } from "@/schemas/addguard.schema"; // Adjust path

interface RegisterFormData {
  guardId: string;
  fullName: string;
  phoneNumber: string;
  profilePhoto: File | null;
}

interface FormErrors {
  guardId?: string;
  fullName?: string;
  phoneNumber?: string;
  profilePhoto?: string;
}

interface RegisterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onGuardAdded?: () => void;
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

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!open) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === "guard-id" ? "guardId" : id === "full-name" ? "fullName" : "phoneNumber"]: value
    }));
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePhoto: file }));
      
      // Clean up old preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setErrors(prev => ({ ...prev, profilePhoto: undefined }));
    }
  };

  const validateForm = (): boolean => {
  try {
    addGuardSchema.parse({
      guardId: formData.guardId,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      profilePhoto: formData.profilePhoto || undefined
    });
    setErrors({});
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      const newErrors: FormErrors = {};
      error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path === 'guardId') newErrors.guardId = issue.message;
        if (path === 'fullName') newErrors.fullName = issue.message;
        if (path === 'phoneNumber') newErrors.phoneNumber = issue.message;
        if (path === 'profilePhoto') newErrors.profilePhoto = issue.message;
      });
      setErrors(newErrors);
    }
    return false;
  }
};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append("guardId", formData.guardId);
    submitData.append("fullName", formData.fullName);
    submitData.append("phoneNumber", formData.phoneNumber);
    if (formData.profilePhoto) {
      submitData.append("profilePhoto", formData.profilePhoto);
    }
    
    console.log("=== Registering New Guard ===");
    console.log("Guard ID:", formData.guardId);
    console.log("Full Name:", formData.fullName);
    console.log("Phone Number:", formData.phoneNumber);
    console.log("Profile Photo:", formData.profilePhoto ? formData.profilePhoto.name : "No photo uploaded");
    console.log("Photo Size:", formData.profilePhoto ? `${(formData.profilePhoto.size / 1024).toFixed(2)} KB` : "N/A");
    console.log("Photo Type:", formData.profilePhoto?.type || "N/A");
    console.log("============================");
    
    try {
      // TODO: Replace with actual Go backend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("✅ Guard registered successfully!");
      
      if (onGuardAdded) {
        console.log("🔄 Refreshing guard list...");
        await onGuardAdded();
      }
      
      handleReset();
      setOpen(false);
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
    // ... rest of your JSX remains exactly the same
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300" onClick={handleClose}>
      <div className="bg-white w-full max-w-md rounded-[24px] shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200 border-t-4 border-primary" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
          <X size={20} />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h2 className="text-primary font-bold text-lg">Register New Personnel</h2>
              <p className="text-sm text-gray-500 mt-1">Enter credentials for centralized security clearance.</p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <div onClick={triggerFileUpload} className="w-24 h-24 rounded-full border-2 border-dashed border-purple-300 hover:border-[#872f89] flex flex-col items-center justify-center text-purple-500 cursor-pointer bg-purple-50/50 hover:bg-purple-50 transition-all group overflow-hidden relative">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <>
                      <Camera size={20} className="group-hover:scale-105 transition-transform" />
                      <span className="text-[10px] mt-0.5 text-purple-400 group-hover:text-[#872f89]">Profile<br/>Photo</span>
                    </>
                  )}
                </div>
                <div onClick={triggerFileUpload} className="absolute -bottom-1 -right-1 bg-[#872f89] rounded-full p-1.5 shadow-md border-2 border-white cursor-pointer hover:bg-purple-800 transition-colors">
                  <Plus size={14} className="text-white" />
                </div>
              </div>
            </div>
            {errors.profilePhoto && <p className="text-xs text-red-500 text-center -mt-4">{errors.profilePhoto}</p>}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="guard-id" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">Guard ID</label>
                <input id="guard-id" type="text" value={formData.guardId} onChange={handleInputChange} placeholder="071112" required className={`w-full px-4 py-3 bg-gray-50 border ${errors.guardId ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`} />
                {errors.guardId && <p className="text-xs text-red-500 mt-1">{errors.guardId}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="full-name" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">Full Name</label>
                <input id="full-name" type="text" value={formData.fullName} onChange={handleInputChange} placeholder="e.g., John Doe" required className={`w-full px-4 py-3 bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`} />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="phone-number" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">Phone Number</label>
                <input id="phone-number" type="tel" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+251976563412" required className={`w-full px-4 py-3 bg-gray-50 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#872f89] focus:bg-white transition-all text-sm`} />
                {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#872f89] hover:bg-purple-800 text-white font-medium rounded-3xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Registering..." : "Register Guard"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}