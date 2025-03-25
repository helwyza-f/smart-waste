"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { icons } from "lucide-react";

interface SidebarItemProps {
  title: string;
  url: string;
  iconName: string;
  onClick?: () => void;
}

export function SidebarMenuItemComponent({
  title,
  url,
  iconName,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  // 🔥 Cek apakah ikon tersedia
  const Icon = icons[iconName as keyof typeof icons] || icons["Circle"];
  //   console.log(`Rendering icon: ${iconName}`, Icon); // 🔍 Debugging

  return (
    <SidebarMenuItem
    //  className={isActive ? "bg-blue-500 text-white" : "bg-transparent"}
    >
      <SidebarMenuButton asChild size={"lg"} isActive={isActive}>
        <Link href={url} className="flex items-center gap-2">
          <Icon size={"1.5rem"} />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
