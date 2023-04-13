import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Navigation from "@/components/Navigation";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="flex h-screen">
        <Navigation />

        <div className="w-full h-screen overflow-x-hidden overflow-y-scroll scrollbar-hide">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
}
