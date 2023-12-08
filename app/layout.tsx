import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Layout from "@/components/Layout";
import NextAuthProvider from "@/components/NextAuthProvider";

import "@/app/styles/globals.css";
import "@/app/styles/vinyl.scss";
import "@/app/styles/visualizer.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Props = {
  children?: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;