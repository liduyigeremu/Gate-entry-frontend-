
import SideInfoCard from "@/components/layout/SideInfoCard";

export default function EmployeeLayout({ children }) {
  return (
    <main className="bg-primary-bg text-gray-600
    flex w-full h-screen items-center justify-center">       
        <SideInfoCard />
        {children}      
    </main>
  );
}