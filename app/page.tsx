import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

const Home = () => (
  <div className="space-y-2 sm:space-y-8">
    <div className="px-0 sm:px-4">
      <TopArtists />
    </div>

    <div className="px-4 sm:px-8">
      <TopTracks />
    </div>
  </div>
);

export default Home;
