
import SideInfoCard from "@/components/layout/SideInfoCard";

// @ts-expect-error(children)
export default function EmployeeLayout({ children }) {
  return (
    <main className="bg-background text-foreground
    flex w-full h-screen items-center justify-center">       
        <SideInfoCard />
        {children}   
    </main>
  );
}