import NavBar from '@/components/layout/NavBar';

// @ts-expect-error(children)
export default function EmployeeLayout({ children }) {
  return (
    <div className="bg-background text-foreground
      relative w-full h-screen grid grid-rows-[auto_1fr]">
      
      <div className="flex w-full h-15 justify-center
      lg:mt-4">
        <NavBar />
      </div>
      
      <main className="flex w-full h-full py-10 items-center justify-center overflow-y-auto">
        {children}
      </main>
      
    </div>
  );
}