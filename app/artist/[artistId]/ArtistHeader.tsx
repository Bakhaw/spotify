import { NextPage } from "next";

import Cover from "@/components/Cover";

import MonthlyListeners from "./MonthlyListeners";

interface ArtistHeaderProps {
  artist: SpotifyApi.SingleArtistResponse;
  backgroundColor: string;
}

const ArtistHeader: NextPage<ArtistHeaderProps> = ({
  artist,
  backgroundColor,
}) => {
  // TODO skeleton
  return (
    <div
      className="flex flex-col justify-center items-center gap-2 bg-gradient-secondary py-4"
      style={{ backgroundColor }}
    >
      <Cover
        alt={`${artist.name} cover`}
        rounded
        size="medium"
        src={artist.images[0].url}
      />
      <h1 className="text-7xl font-bold text-white">{artist.name}</h1>

      <MonthlyListeners artistId={artist.id} />
    </div>
  );
};

export default ArtistHeader;
