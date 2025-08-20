
import DashboardPage from "@/features/dashboard/pages/dashboardPage";
import FormBuilderPage from "@/features/formBuilder/pages/formBuilderPage";
import FormDemoPage from "@/features/formRender/pages/formDemoPage";
import FormRenderPage from "@/features/formRender/pages/formRenderPage";
import LandingPage from "@/features/ladingPage/pages/LandingPage";
import { Routes, Route } from "react-router";

export default function GlobalRoutes() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/form/builder" element={<FormBuilderPage />} />
      <Route path="/form/render" element={<FormRenderPage />} />
      <Route path="/form/demo" element={<FormDemoPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
    </Routes>
  );
}
