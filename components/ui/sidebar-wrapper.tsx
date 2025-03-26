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
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // ✅ Deteksi apakah device adalah mobile
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined" || typeof navigator === "undefined")
        return;

      const userAgent = navigator.userAgent;

      const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone/i.test(
        userAgent
      );
      const isSmallScreen = window.innerWidth <= 1024;

      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // Gunakan timeout untuk menghindari masalah saat initial render
    setTimeout(checkMobile, 0);
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Tutup sidebar saat navigasi berubah (hanya jika di mobile)
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <AppSidebar user={user} />
      <main className="flex-1">
        <SidebarTrigger className="h-12 w-12 text-foreground rounded-md hover:bg-accent hover:text-accent-foreground">
          <Menu className="w-10 h-10" />
        </SidebarTrigger>
        {children}
      </main>
    </SidebarProvider>
  );
}
