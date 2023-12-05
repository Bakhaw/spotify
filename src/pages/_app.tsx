import { PullToRefresh } from "react-js-pull-to-refresh";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import classNames from "classnames";

import CustomDndContext from "@/components/CustomDndContext";
import Player from "@/components/Player";
import SideBar from "@/components/SideBar";
import { Toaster } from "@/components/ui/toaster";
import ThemeToggle from "@/components/ThemeToggle";

import "@/styles/globals.css";
import "@/styles/vinyl.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();

  async function onRefresh() {
    router.refresh();
  }

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
                    "flex-auto pb-20",
                    pathname !== "/studio" && "sm:ml-[266px]"
                  )}
                >
                  <div className="flex justify-between items-center px-8 py-4">
                    <div className="flex gap-2">
                      <button
                        className="hover:opacity-75"
                        onClick={router.back}
                      >
                        <ChevronLeftCircleIcon className="h-6 w-6" />
                      </button>

                      <button
                        className="hover:opacity-75"
                        onClick={router.forward}
                      >
                        <ChevronRightCircleIcon className="h-6 w-6" />
                      </button>
                    </div>

                    <ThemeToggle />
                  </div>

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
