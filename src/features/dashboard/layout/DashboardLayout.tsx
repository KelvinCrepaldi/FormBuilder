import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router";
import DashboardSidebar from "../components/dashboardSidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="flex flex-1 bg-sidebar">
        <div className="flex flex-1 w-full border-l">
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full flex-1 bg-white">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
