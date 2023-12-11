import type { Metadata } from "next";
import localFont from "next/font/local";
import { getServerSession } from "next-auth";

import Layout from "@/components/Layout";
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
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#121212" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icon-192x192.png" },
    { rel: "icon", url: "icon-192x192.png" },
  ],
};

type Props = {
  children?: React.ReactNode;
};

async function RootLayout({ children }: Props) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={myFont.className}>
        <SessionProvider session={session}>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
