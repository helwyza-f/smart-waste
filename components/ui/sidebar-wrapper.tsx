"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Menu } from "lucide-react";

export function SidebarWrapper({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  // ✅ Fungsi untuk cek apakah layar mobile (misal: max 1024px)
  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 800;

  useEffect(() => {
    if (isMobile()) {
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <AppSidebar user={user} />
      <main className="flex-1">
        <SidebarTrigger className="h-12 w-12 text-foreground rounded-md hover:bg-accent hover:text-accent-foreground">
          <Menu className="w-10 h-10" /> {/* Ikon dari Lucide */}
        </SidebarTrigger>

        {children}
      </main>
    </SidebarProvider>
  );
}
