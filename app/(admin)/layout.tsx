// app/(admin)/layout.tsx
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "@/app/globals.css"; // Make sure global styles are imported

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#faf8fc] flex font-sans min-h-screen">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}