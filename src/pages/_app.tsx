import { PullToRefresh } from "react-js-pull-to-refresh";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";

// import Navigation from "@/components/Navigation";
import Player from "@/components/Player";

import "@/styles/globals.css";
import "@/styles/vinyl.scss";
import SideBar from "@/components/SideBar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  async function onRefresh() {
    router.reload();
  }

  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <PullToRefresh
          pullDownContent={<div className="text-center">❤</div>}
          releaseContent={<div />}
          refreshContent={<div />}
          pullDownThreshold={200}
          onRefresh={onRefresh}
          triggerHeight={50}
          startInvisible={true}
        >
          <div className="flex flex-col justify-between h-screen">
            <div className="hidden sm:block">
              <SideBar />
            </div>
            <div className="flex-auto sm:ml-[266px] pb-20">
              <Component {...pageProps} />
            </div>

            <Player />
            {/* <Navigation /> */}
          </div>
        </PullToRefresh>
      </RecoilRoot>
    </SessionProvider>
  );
}
