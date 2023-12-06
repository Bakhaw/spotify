import { NextPage } from "next";
import Head from "next/head";

import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

const Home: NextPage = () => (
  <div className="flex flex-col h-auto w-full">
    <Head>
      <title>music app - listen now</title>
      <meta property="og:title" key="title" content="music app - listen now" />
    </Head>

    <TopArtists />
    <TopTracks />
  </div>
);

export default Home;
