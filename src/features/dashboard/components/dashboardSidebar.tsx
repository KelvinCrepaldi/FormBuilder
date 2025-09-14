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
import { FormInput } from "lucide-react";
import { useNavigate } from "react-router";

const items = [
    { title: "Home", url: "/dashboard", icon: <FormInput /> },
    { title: "Projetos", url: "/dashboard/projects", icon: <FormInput /> },
    { title: "Criar novo", url: "/builder", icon: <FormInput /> },
];

export default function DashboardSidebar() {
    const navigate = useNavigate();
  return (
    <Sidebar variant="inset">
      <SidebarHeader>Dashboard</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild onClick={() => navigate(item.url)} className="cursor-pointer">
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
