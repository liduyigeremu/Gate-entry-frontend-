import NavBar from '@/components/NavBar';

export default function EmployeeLayout({ children }) {
  return (
    <div className="bg-primary-bg text-gray-600
      relative w-full h-screen grid grid-rows-[auto_1fr]">

      <NavBar /> 
      
      <main className="flex w-full h-full p-5 items-center justify-center">
        {children}
      </main>
      
    </div>
  );
}