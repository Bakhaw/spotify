import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopArtists />
      <TopTracks timeRange="medium_term" />
    </div>
  );
}

export default Home;
