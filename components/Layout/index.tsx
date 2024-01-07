"use client";

import { usePathname } from "next/navigation";

import { useLayoutStore } from "@/store/useLayoutStore";
import { usePlayerStore } from "@/store/usePlayerStore";

import { cn } from "@/lib/utils";

import AppHeader from "@/components/AppHeader";
import BottomBar from "@/components/BottomBar";
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
  const collapseSidebar = useLayoutStore((s) => s.collapseSidebar);

  const fullScreenPages = ["/login", "/studio"];
  const isFullScreenPage = fullScreenPages.includes(pathname);

  const fullStartWithPages = ["/album", "/artist"];
  const isFullScreenPageResponsive = fullStartWithPages.some((page) =>
    pathname?.startsWith(page)
  );

  function onResize(size: number) {
    const minSize = 5; // under 5, the panel doesn't have enough space to display Cover + playlist name

    if (size <= minSize) {
      collapseSidebar(true);
    } else {
      collapseSidebar(false);
    }
  }

  return (
    <div className="h-screen">
      {isFullScreenPage ? (
        <>
          <AppHeader />

          <div className="h-full">{children}</div>
        </>
      ) : (
        <ResizablePanelGroup
          autoSaveId="resizablePanelGroup"
          direction="horizontal"
        >
          <ResizablePanel
            defaultSize={20}
            className={cn(
              "hidden sm:block h-screen min-w-[88px]",
              currentPlaybackState ? "pb-[80px]" : "pb-0"
            )}
            onResize={onResize}
          >
            <ScrollArea className="@container h-full">
              <SideBar />
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={80}>
            {!isFullScreenPageResponsive && (
              <div className="relative">
                <AppHeader />
              </div>
            )}

            {children}
          </ResizablePanel>

          <Player />
          <Toaster />

          <div className="sm:hidden w-full fixed bottom-0">
            <BottomBar />
          </div>
        </ResizablePanelGroup>
      )}
    </div>
  );
}

export default Layout;
