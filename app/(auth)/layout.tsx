
import SideInfoBox from "@/components/SideInfoBox";

export default function EmployeeLayout({ children }) {
  return (
    <main className="bg-primary-bg text-gray-600
    flex w-full h-screen items-center justify-center">       
        <SideInfoBox />
        {children}      
    </main>
  );
}