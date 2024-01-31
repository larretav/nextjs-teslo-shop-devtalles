import { Sidebar, TopMenu } from "@/components";

export default function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <div className="p-0 sm:p-10">
        {children}
      </div>

      <Sidebar />
    </main>
  );
}