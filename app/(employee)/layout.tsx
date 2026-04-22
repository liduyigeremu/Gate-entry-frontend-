import NavBar from '@/components/layout/NavBar';

// @ts-expect-error(children)
export default function EmployeeLayout({ children }) {
  return (
    <div className="bg-primary-bg text-gray-600
      relative w-full h-screen grid grid-rows-[auto_1fr]">

      <NavBar />
      
      <main className="flex py-30 md: w-full h-full items-center justify-center">
        {children}
      </main>
      
    </div>
  );
}