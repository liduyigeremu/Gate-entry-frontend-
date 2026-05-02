import AdminHeader from "@/components/layout/AdminHeader";
import AdminSideBar from "@/components/layout/AdminSideBar";

// @ts-expect-error(children)
export default function EmployeeLayout({ children }) {
  return (
    <div className="bg-background text-foreground
    w-full h-screen
    grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">

      <AdminSideBar />

      <AdminHeader />

      <main className="w-full h-full overflow-y-auto">
        {children}
      </main>

    </div>
  );
}