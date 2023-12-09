import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

const Home = () => (
  <div className="flex flex-col min-h-screen w-full">
    <div className="px-4">
      <TopArtists />
    </div>

    <TopTracks />
  </div>
);

export default Home;
