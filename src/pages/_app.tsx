import { PullToRefresh } from "react-js-pull-to-refresh";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import classNames from "classnames";

import AppHeader from "@/components/AppHeader";
import CustomDndContext from "@/components/CustomDndContext";
import Player from "@/components/Player";
import SideBar from "@/components/SideBar";
import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";
import "@/styles/vinyl.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();

  async function onRefresh() {
    router.refresh();
  }

  const fullScreenPages = ["/login", "/studio"];

  return (
    <SessionProvider session={pageProps.session}>
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
                    "flex-auto pb-20 sm:ml-[266px]",
                    fullScreenPages.includes(pathname) && "sm:ml-0"
                  )}
                >
                  <AppHeader />
                  <Component {...pageProps} />
                </div>

                <Player />
                <Toaster />
              </div>
            </CustomDndContext>
          </PullToRefresh>
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
