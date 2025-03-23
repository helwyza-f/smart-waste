import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  MapPin,
  Trash2,
  Coins,
  Trophy,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { getUserSession } from "@/utils/actions";
import Link from "next/link";
import { Button } from "./ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Laporkan Sampah",
    url: "/laporkan-sampah",
    icon: MapPin,
  },
  {
    title: "Kumpulkan Sampah",
    url: "/kumpulkan-sampah",
    icon: Trash2,
  },
  {
    title: "Penghargaan",
    url: "/penghargaan",
    icon: Coins,
  },
  {
    title: "Peringkat",
    url: "/peringkat",
    icon: Trophy,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const user = await getUserSession();

  return (
    <Sidebar className="p-3 z-50">
      <SidebarHeader>
        <h1 className="text-2xl font-bold">Smart Waste</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
          <Link href="/login">
            <Button variant="outline" className="w-full bg-blue-500 text-white">
              Login
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
