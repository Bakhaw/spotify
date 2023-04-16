import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Navigation from "@/components/Navigation";
import Player from "@/components/Player";

import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <div className="flex h-screen">
          <Navigation />

          <div className="w-full h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide">
            <Component {...pageProps} />
          </div>

          <Player />
        </div>
      </RecoilRoot>
    </SessionProvider>
  );
}
