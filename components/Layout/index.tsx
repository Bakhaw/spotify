"use client";

import { usePathname, useRouter } from "next/navigation";
import { RecoilRoot } from "recoil";
import { PullToRefresh } from "react-js-pull-to-refresh";
import classNames from "classnames";

import AppHeader from "@/components/AppHeader";
import CustomDndContext from "@/components/CustomDndContext";
import Player from "@/components/Player";
import SideBar from "@/components/SideBar";
import ThemeProvider from "@/components/ThemeProvider";

import { Toaster } from "@/components/ui/toaster";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function onRefresh() {
    router.refresh();
  }

  const fullScreenPages = ["/login", "/studio"];
  const fullStartWithPages = ["/album", "/artist"];
  const isFullScreenPageResponsive = fullStartWithPages.some((page) =>
    pathname?.startsWith(page)
  );
  const isFullScreenPage = fullScreenPages.includes(pathname);
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <PullToRefresh
          pullDownContent={<div className="text-center">❤</div>}
          releaseContent={<div />}
          refreshContent={<div />}
          onRefresh={onRefresh}
          pullDownThreshold={200}
          startInvisible
          triggerHeight={50}
        >
          <CustomDndContext>
            <div className="flex flex-col justify-between h-screen">
              <div className="hidden sm:block">
                <SideBar />
              </div>

              <div
                className={classNames(
                  "flex-auto",
                  isFullScreenPage
                    ? "sm:ml-0"
                    : "sm:ml-[90px] md:ml-[266px] pb-20"
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
          </CustomDndContext>
        </PullToRefresh>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default Layout;