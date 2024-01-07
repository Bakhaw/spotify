import type { Metadata } from "next";
// import type { Viewport } from "next";

import localFont from "next/font/local";

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
  // appleWebApp: {
  //   capable: true,
  //   title: "My Website",
  //   statusBarStyle: "black-translucent",
  // },
};

// export const viewport: Viewport = {
//   width: "device-width",
//   viewportFit: "cover",
//   initialScale: 1,
// };

type Props = {
  children?: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <SessionProvider>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
