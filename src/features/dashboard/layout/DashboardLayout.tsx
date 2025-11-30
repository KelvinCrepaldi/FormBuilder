import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router";
import DashboardSidebar from "../components/dashboardSidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main className="flex flex-1 bg-sidebar">
        <div className="flex flex-1 w-full border-l">
          <div className="flex flex-1 flex-col">
            <div className="w-full max-w-full flex-1 bg-white overflow-hidden" >
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
