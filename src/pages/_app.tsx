import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import Container from "@/components/Container";
import Navigation from "@/components/Navigation";
import Player from "@/components/Player";

import "@/styles/globals.css";
import "@/styles/vinyl.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <div className="relative flex flex-col justify-between h-screen">
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
