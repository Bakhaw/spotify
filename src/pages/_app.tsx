import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";

import Container from "@/components/Container";
import Navigation from "@/components/Navigation";
import Player from "@/components/Player";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <div className="flex flex-col h-screen">
          <Container>
            <Component {...pageProps} />
          </Container>

          <Player />
          <Navigation />
        </div>
      </RecoilRoot>
    </SessionProvider>
  );
}
