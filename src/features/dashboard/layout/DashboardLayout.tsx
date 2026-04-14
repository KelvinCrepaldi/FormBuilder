import { Outlet, useLocation } from "react-router";
import DashboardSidebar from "../components/dashboardSidebar";
import { DashboardMobileBar } from "../components/dashboardMobileBar";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const isBuilder = pathname === "/builder" || pathname === "/builder2";

  return (
    <div className="bg-surface text-on-surface min-h-svh">
      {!isBuilder && <DashboardSidebar />}
      {!isBuilder && <DashboardMobileBar />}
      <main className={isBuilder ? "min-h-svh" : "min-h-svh md:ml-64"}>
        <Outlet />
      </main>
    </div>
  );
}
