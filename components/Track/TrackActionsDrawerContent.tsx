import {
  LibraryIcon,
  ListPlusIcon,
  ListStartIcon,
  Mic2Icon,
  RadioIcon,
  ShareIcon,
  UsersIcon,
} from "lucide-react";

import useTrack from "@/hooks/useTrack";

import Cover from "@/components/Cover";

import { useTrackContext } from "./context";

function TrackActionsDrawerContent() {
  const { track } = useTrackContext();
  const fullTrack = useTrack(track.id);

  if (!fullTrack) return null;

  return (
    <div className="flex flex-col gap-6 border">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Cover
          alt={`${fullTrack.name} cover`}
          size="medium"
          src={fullTrack.album.images[0].url}
        />

        <div>
          <h1>{fullTrack.name}</h1>
          <p>
            {fullTrack.artists[0].name} - {fullTrack.album.name}
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-4">
        <li className="flex gap-2">
          <ListPlusIcon />
          Add to a playlist
        </li>
        <li className="flex gap-2">
          <ListStartIcon />
          Add to queue
        </li>
        <li className="flex gap-2">
          <ShareIcon />
          Share
        </li>
        <li className="flex gap-2">
          <RadioIcon />
          Go to radio
        </li>
        <li className="flex gap-2">
          <LibraryIcon />
          Album
        </li>
        <li className="flex gap-2">
          <Mic2Icon />
          Artists
        </li>
        <li className="flex gap-2">
          <UsersIcon />
          Credits
        </li>
      </ul>
    </div>
  );
}

export default TrackActionsDrawerContent;
