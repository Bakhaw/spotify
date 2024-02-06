import { useSearchParams } from "next/navigation";

import { SearchProvider } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";

import useTrack from "@/hooks/useTrack";

import AlbumLink from "@/components/AlbumLink";
import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import Draggable from "@/components/Draggable";
import YouTubePlayer from "@/components/YoutubePlayer";

export interface CurrentTrackProps {
  asLink?: boolean; // default false
}

const CurrentTrack: React.FC<CurrentTrackProps> = ({ asLink = false }) => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;
  const track = useTrack(currentPlaybackState?.item?.id);

  const youtubeTrack = currentPlaybackState?.item as SpotifyApi.TrackObjectFull;

  // if (!spotifyTrack) return null; // TODO skeleton

  return (
    <div className="flex">
      {provider !== "youtube" && track && (
        <Draggable id={`closed_player:${track.id}`}>
          <div className="flex flex-1 justify-start items-center gap-3 h-full pr-2 rounded-md">
            <div className="w-[48px] transition-all hover:scale-105">
              <Cover
                alt={`${track.name} cover`}
                asLink={asLink}
                href={asLink ? `/album/${track.album.id}` : undefined}
                size="full"
                src={track.album.images[0].url}
              />
            </div>

            <div className="display-arrowicon max-w-[50vw] md:max-w-[30vw] transition-all hover:scale-105">
              <div className="font-bold flex gap-3 sm:font-normal">
                <AlbumLink albumId={track.album.id}>{track.name}</AlbumLink>
              </div>
              <div className="text-xs">
                <ArtistLink artists={track.artists} />
              </div>
            </div>
          </div>
        </Draggable>
      )}

      {provider === "youtube" && youtubeTrack && (
        <div>
          <div className="flex flex-1 justify-start items-center gap-3 h-full pr-2 rounded-md">
            <div className="w-[48px]">
              <Cover
                alt={`${youtubeTrack.name} cover`}
                size="full"
                src={youtubeTrack.album.images[0].url}
              />
            </div>

            <YouTubePlayer />

            <div className="display-arrowicon max-w-[50vw] md:max-w-[30vw]">
              <div className="font-bold flex gap-3 sm:font-normal">
                {youtubeTrack.name}
              </div>
              <div className="text-xs">{youtubeTrack.artists[0].name}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentTrack;
