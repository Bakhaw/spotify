import { useState } from "react";
import { useTheme } from "next-themes";
import { useRecoilState } from "recoil";
import classNames from "classnames";
import { PauseIcon, PlayIcon } from "lucide-react";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import millisToMinutesAndSeconds from "@/lib/millisToMinutesAndSeconds";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import LikeButton from "@/components/LikeButton";
import TrackLink from "@/components/TrackLink";

interface TrackProps {
  order?: number | null;
  showCover?: boolean; // default false;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({ order, showCover = false, track }) => {
  const { theme } = useTheme();
  const spotifyApi = useSpotify();
  const currentTrack = useTrack(track.id);
  const [showPlayIcon, setShowIcon] = useState<boolean>(false);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  function pauseSong() {
    spotifyApi.pause();
    setIsPlaying(false);
  }

  async function playSong() {
    if (!currentTrack) return;

    if (currentTrack.id === currentTrackId) {
      spotifyApi.play();
    } else {
      const { body: devices } = await spotifyApi.getMyDevices();

      spotifyApi.play({
        context_uri: currentTrack.album.uri,
        offset: { uri: currentTrack.uri },
        device_id: String(devices.devices[0].id),
      });
    }

    setCurrentTrackId(currentTrack.id);
    setIsPlaying(true);
  }

  if (!currentTrack) return null;

  // TODO fix theme (use shadcn components ?)
  return (
    <div
      className={classNames(
        "flex justify-between items-center rounded-xl h-14 w-full overflow-hidden transition-colors hover:bg-[#666770] hover:text-white",
        theme === "dark" ? "bg-[#2d2e37]" : "bg-[#F8FAFC]",
        currentTrack.id === currentTrackId && "bg-[#666770]"
      )}
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
      onDoubleClick={playSong}
    >
      <div className="flex justify-start items-center">
        {order && (
          <div className="text-center w-14 px-4">
            {showPlayIcon ? (
              <>
                {currentTrack.id === currentTrackId && isPlaying ? (
                  <PauseIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={pauseSong}
                    role="button"
                  />
                ) : (
                  <PlayIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={playSong}
                    role="button"
                  />
                )}
              </>
            ) : (
              <span>{order}</span>
            )}
          </div>
        )}

        {showCover && (
          <div className="h-[60px] w-[60px] mr-3 relative">
            <Cover
              alt={`${currentTrack.name} cover`}
              size="small"
              square
              src={currentTrack.album.images[0].url}
            />

            <>
              {showPlayIcon && (
                <div className="h-full w-full flex justify-center items-center top-0 absolute bg-black/90">
                  {currentTrack.id === currentTrackId && isPlaying ? (
                    <PauseIcon
                      className="h-5 w-5 cursor-pointer"
                      onClick={pauseSong}
                    />
                  ) : (
                    <PlayIcon
                      className="h-5 w-5 cursor-pointer"
                      onClick={playSong}
                    />
                  )}
                </div>
              )}
            </>
          </div>
        )}

        <div className="flex flex-col max-w-[45vw] md:max-w-80">
          <TrackLink track={currentTrack} />
          <ArtistLink artists={currentTrack.artists} />
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 pr-4">
        <LikeButton track={track} />

        <div className="hidden md:block">
          {millisToMinutesAndSeconds(currentTrack.duration_ms)}
        </div>
      </div>
    </div>
  );
};

export default Track;
