import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

const Home = () => (
  <div className="flex flex-col min-h-screen w-full">
    <TopArtists />
    <TopTracks />
  </div>
);

export default Home;
