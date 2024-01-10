import BlurBackground from "@/components/BlurBackground";
import Container from "@/components/Container";
import TopArtists from "@/components/TopArtists";
import TopTracks from "@/components/TopTracks";

const Home = () => {
  return (
    <Container>
      {/* <BlurBackground /> */}

      <div className="space-y-8">
        <TopArtists />
        <TopTracks />
      </div>
    </Container>
  );
};

export default Home;
