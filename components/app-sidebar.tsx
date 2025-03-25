"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { Button } from "./ui/button";
import { SidebarMenuItemComponent } from "./sidebar-menu-item";

const items = [
  { title: "Home", url: "/", iconName: "House" },
  { title: "Maps", url: "/maps", iconName: "Map" },
  { title: "Laporkan Sampah", url: "/laporkan-sampah", iconName: "MapPin" },
  { title: "Kumpulkan Sampah", url: "/kumpulkan-sampah", iconName: "Trash2" },
  { title: "Penghargaan", url: "/penghargaan", iconName: "Coins" },
  { title: "Peringkat", url: "/peringkat", iconName: "Trophy" },
  { title: "Settings", url: "/settings", iconName: "Settings" },
];

export function AppSidebar({
  user,
  onClose,
}: {
  user: any;
  onClose?: () => void;
}) {
  return (
    <Sidebar className="z-50">
      <SidebarHeader>
        <h1 className="text-2xl font-bold">Smart Waste</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItemComponent
              key={item.title}
              {...item}
              onClick={onClose}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser
            user={{
              name: user?.user_metadata?.full_name || "User",
              email: user?.email || "No email",
              avatar:
                user?.user_metadata?.avatar_url ||
                "https://avatar.iran.liara.run/public/4",
            }}
          />
        ) : (
          <Link href="/login" onClick={onClose}>
            <Button variant="outline" className="w-full bg-blue-500 text-white">
              Login
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
