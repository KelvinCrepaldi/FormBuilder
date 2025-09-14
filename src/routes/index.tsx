import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import DashboardPage from "@/features/dashboard/pages/dashboardPage";
import DashboardProjectsPage from "@/features/dashboard/pages/dashboardProjectsPage";
import FormBuilderPage from "@/features/formBuilder/page/formBuilderPage";
import FormDemoPage from "@/features/formRender/pages/formDemoPage";
import FormRenderPage from "@/features/formRender/pages/formRenderPage";
import LandingPage from "@/features/ladingPage/pages/LandingPage";
import { Routes, Route } from "react-router";

export default function GlobalRoutes() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/f/:projectId" element={<FormRenderPage />} />
      <Route path="/form/demo" element={<FormDemoPage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/projects" element={<DashboardProjectsPage />} />

        <Route path="/builder" element={<FormBuilderPage />}>
        </Route>
      </Route>
    </Routes>
  );
}
