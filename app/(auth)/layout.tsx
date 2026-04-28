
import AuthSideCard from "@/components/layout/AuthSideCard";

// @ts-expect-error(children)
export default function EmployeeLayout({ children }) {
  return (
    <main className="bg-background text-foreground
    flex w-full h-screen items-center justify-center">       
        <AuthSideCard />
        {children}   
    </main>
  );
}