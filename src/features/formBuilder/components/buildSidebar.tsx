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
import { FormInput, Layout, TableConfig } from "lucide-react";
import { useNavigate } from "react-router";

const items = [
    { title: "Dashboard", url: "/dashboard", icon: <FormInput /> },
  { title: "Perguntas", url: "/form/builder/questions", icon: <FormInput /> },
  { title: "Configurações", url: "/form/builder/configuration", icon: <TableConfig /> },
  { title: "Layout", url: "/form/builder/layout", icon: <Layout /> },
];

export default function BuildSidebar() {
    const navigate = useNavigate();
  return (
    <Sidebar variant="inset">
         <SidebarHeader>Builder</SidebarHeader>
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
      <SidebarFooter>asd</SidebarFooter>
    </Sidebar>
  );
}
