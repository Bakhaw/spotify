import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

const Home = () => (
  <div className="space-y-2 sm:space-y-8">
    <TopArtists />
    <TopTracks />
  </div>
);

export default Home;
