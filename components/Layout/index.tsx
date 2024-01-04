"use client";

import { usePathname } from "next/navigation";

import { usePlayerStore } from "@/store/usePlayerStore";

import { cn } from "@/lib/utils";

import AppHeader from "@/components/AppHeader";
import Player from "@/components/Player";
import SideBar from "@/components/SideBar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const fullScreenPages = ["/login", "/studio"];
  const isFullScreenPage = fullScreenPages.includes(pathname);
  const isHomePage = pathname === "/";

  const fullStartWithPages = ["/album", "/artist"];
  const isFullScreenPageResponsive = fullStartWithPages.some((page) =>
    pathname?.startsWith(page)
  );

  return (
    <div className="h-screen">
      {isFullScreenPage ? (
        <>
          <div className="absolute">
            <AppHeader />
          </div>

          <div className="h-full">{children}</div>
        </>
      ) : (
        <ResizablePanelGroup
          autoSaveId="resizablePanelGroup"
          direction="horizontal"
          className="w-full"
        >
          <ResizablePanel
            defaultSize={20}
            className={cn(
              "h-screen min-w-[88px] hidden sm:block",
              currentPlaybackState ? "pb-[80px]" : "pb-0"
            )}
          >
            <ScrollArea className="@container h-full">
              <SideBar />
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={80}>
            <AppHeader />

            <div
              className={cn(
                "h-full overflow-x-scroll",
                isHomePage || isFullScreenPageResponsive
                  ? "px-0"
                  : "px-2 sm:px-8",
                currentPlaybackState ? "pb-[136px]" : "pb-[64px]" // 136px = AppHeader + Player + padding // 64px = AppHeader
              )}
            >
              {children}
            </div>
          </ResizablePanel>

          <Player />
          <Toaster />
        </ResizablePanelGroup>
      )}
    </div>
  );
}

export default Layout;
