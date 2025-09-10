import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { GoDot } from "react-icons/go";
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
            topbar
        <SidebarGroup />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <IoHomeOutline />
              <Link to="">Home</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <TbCategory />
              <Link to="">Categories</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
                <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <GrBlog/>
              <Link to="">Blogs</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
                <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FaRegComments />
              <Link to="">Comments</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
                <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <FaRegUser />
              <Link to="">User</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup />
      <SidebarGroup>
        <SidebarGroupLabel>
          Category
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <GoDot />
              <Link to="">Category item</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
