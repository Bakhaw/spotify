import { usePlayerStore } from "@/store/usePlayerStore";

import useTrack from "@/hooks/useTrack";

import AlbumLink from "@/components/AlbumLink";
import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import Draggable from "@/components/Draggable";

export interface CurrentTrackProps {
  asLink?: boolean; // default false
}

const CurrentTrack: React.FC<CurrentTrackProps> = ({ asLink = false }) => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const track = useTrack(currentPlaybackState?.item?.id);

  if (!track) return null; // TODO skeleton

  const { album, artists, id, name } = track;

  return (
    <div className="flex">
      <Draggable id={`closed_player:${id}`}>
        <div className="flex flex-1 justify-start items-center gap-3 h-full pr-2 rounded-md">
          <div className="w-[48px] transition-all hover:scale-105">
            <Cover
              alt={`${name} cover`}
              asLink={asLink}
              href={asLink ? `/album/${album.id}` : undefined}
              size="full"
              src={album.images[0].url}
            />
          </div>

          <div className="display-arrowicon max-w-[50vw] md:max-w-[30vw] transition-all hover:scale-105">
            <div className="font-bold flex gap-3 sm:font-normal">
              <AlbumLink albumId={album.id}>{name}</AlbumLink>
            </div>
            <div className="text-xs">
              <ArtistLink artists={artists} />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default CurrentTrack;
