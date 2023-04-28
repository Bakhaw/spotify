import { NextPage } from "next";

import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

const Home: NextPage = () => (
  <div className="flex flex-col min-h-screen w-full">
    <TopArtists />
    <TopTracks timeRange="medium_term" />
  </div>
);

export default Home;
