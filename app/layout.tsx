import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import localFont from "next/font/local";

import { authOptions } from "@/lib/authOptions";
import { cn } from "@/lib/utils";

import Layout from "@/components/Layout";
import Providers from "@/components/Providers";
import SessionProvider from "@/components/SessionProvider";

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

async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={cn(
          myFont.className,
          "h-[calc(100dvh-80px)] sm:h-auto overflow-hidden"
        )}
      >
        <SessionProvider session={session}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
