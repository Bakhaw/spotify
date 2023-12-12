import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import Draggable from "@/components/Draggable";
import TrackLink from "@/components/TrackLink";

interface CurrentTrackProps {
  track?: SpotifyApi.TrackObjectFull;
}

const CurrentTrack: React.FC<CurrentTrackProps> = ({ track }) => {
  if (!track) return null; // TODO skeleton

  return (
    <div className="flex">
      <Draggable id={`closed_player:${track.id}`}>
        <div className="flex flex-1 justify-start items-center gap-3 h-full">
          <div className="w-[48px]">
            <Cover
              alt={`${track.name} cover`}
              size="full"
              src={track.album.images[0].url}
            />
          </div>

          <div className="display-arrowicon max-w-[50vw] md:max-w-[30vw]">
            <div className="font-bold flex gap-3 transition-all hover:scale-110 sm:font-normal">
              <TrackLink track={track} />
            </div>
            <div className="transition-all hover:scale-110 text-span text-xs">
              <ArtistLink artists={track.artists} />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default CurrentTrack;
