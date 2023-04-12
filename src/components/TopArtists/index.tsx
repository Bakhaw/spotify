import useSpotify from "@/hooks/useSpotify";

const TopArtists: React.FC = () => {
  const spotifyApi = useSpotify();

  function getTopArtists() {}

  return <div>TopArtists</div>;
};

export default TopArtists;
