import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ClipboardPlus, LayoutDashboard, NotebookPen } from "lucide-react";
import { useNavigate } from "react-router";

import logo from "@/assets/logo.svg";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: <LayoutDashboard /> },
  { title: "Projetos", url: "/dashboard/projects", icon: <NotebookPen /> },
  { title: "Criar novo", url: "/builder", icon: <ClipboardPlus /> },
];

export default function DashboardSidebar() {
  const navigate = useNavigate();
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-1">
          <img src={logo} className="w-7" /> <span className="text-lg font-bold">orm Builder</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => navigate(item.url)}
                    className="cursor-pointer"
                  >
                    <div>
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>Demo version 1.0.0</SidebarFooter>
    </Sidebar>
  );
}
