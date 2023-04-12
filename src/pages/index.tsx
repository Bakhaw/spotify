import Navigation from "@/components/Navigation";
import TopArtists from "@/components/TopArtists";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TopArtists />
      <Navigation />
    </main>
  );
}

export default Home;
