"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames";

import AppHeader from "@/components/AppHeader";
import Player from "@/components/Player";
import SideBar from "@/components/SideBar";
import Providers from "@/components/Providers";

import { Toaster } from "@/components/ui/toaster";

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const fullScreenPages = ["/login", "/studio"];
  const fullStartWithPages = ["/album", "/artist"];
  const isFullScreenPageResponsive = fullStartWithPages.some((page) =>
    pathname?.startsWith(page)
  );
  const isFullScreenPage = fullScreenPages.includes(pathname);

  return (
    <Providers>
      <div className="flex flex-col justify-between h-screen">
        <div className="hidden sm:block">
          <SideBar />
        </div>

        <div
          className={classNames(
            "flex-auto",
            isFullScreenPage ? "sm:ml-0" : "sm:ml-[90px] md:ml-[266px] pb-20"
          )}
        >
          <div
            className={classNames(
              isFullScreenPage
                ? "mb-0 sm:mb-0"
                : isFullScreenPageResponsive
                ? "mb-0 sm:mb-[68px]"
                : "mb-[68px]"
            )}
          >
            <AppHeader />
          </div>

          <div className="h-full">{children}</div>
        </div>

        <Player />
        <Toaster />
      </div>
    </Providers>
  );
}

export default Layout;
