import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import localFont from "next/font/local";

import Layout from "@/components/Layout";
import Providers from "@/components/Providers";
import SessionProvider from "@/components/SessionProvider";

import { cn } from "@/lib/utils";

import "@/app/styles/globals.css";
import "@/app/styles/vinyl.scss";
import "@/app/styles/visualizer.scss";

const myFont = localFont({
  src: [
    {
      path: "../fonts/CircularStd-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/CircularStd-MediumItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/CircularStd-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/CircularStd-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Music",
  description: "Music",
  manifest: "/manifest.json",
};

type Props = {
  children?: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          myFont.className,
          "h-[calc(100dvh-80px)] sm:h-auto overflow-hidden"
        )}
      >
        <SessionProvider>
          <Providers>
            <Layout>
              {children}
              <SpeedInsights />
            </Layout>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
