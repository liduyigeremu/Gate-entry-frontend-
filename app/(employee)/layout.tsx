import EmployeeNavBar from '@/components/layout/EmployeeNavBar';

// @ts-expect-error(children)
export default function EmployeeLayout({ children }) {
  return (
    <div className="bg-background text-foreground
      w-full h-screen grid grid-rows-[auto_1fr]">
      
      <div className="flex w-full h-15 justify-center
      lg:mt-4">
        <EmployeeNavBar />
      </div>
      
      <main className="w-full h-full overflow-y-auto">
        {children}
      </main>
      
    </div>
  );
}