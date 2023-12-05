import { PullToRefresh } from "react-js-pull-to-refresh";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { usePathname, useRouter } from "next/navigation";
import { RecoilRoot } from "recoil";
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from "lucide-react";
import classNames from "classnames";

import CustomDndContext from "@/components/CustomDndContext";
import Player from "@/components/Player";
import SideBar from "@/components/SideBar";

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
        <PullToRefresh
          pullDownContent={<div className="text-center">❤</div>}
          releaseContent={<div />}
          refreshContent={<div />}
          onRefresh={onRefresh}
          pullDownThreshold={200}
          startInvisible
          triggerHeight="auto"
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
                <div className="flex gap-2 m-6">
                  <button className="hover:opacity-75" onClick={router.back}>
                    <ChevronLeftCircleIcon className="h-6 w-6" />
                  </button>

                  <button className="hover:opacity-75" onClick={router.forward}>
                    <ChevronRightCircleIcon className="h-6 w-6" />
                  </button>
                </div>

                <Component {...pageProps} />
              </div>

              <Player />
            </div>
          </CustomDndContext>
        </PullToRefresh>
      </RecoilRoot>
    </SessionProvider>
  );
}
