import Link from "next/link";

import usePlaylists from "@/hooks/usePlaylists";

import Cover from "@/components/Cover";

function Playlists() {
  const playlists = usePlaylists();

  if (!playlists) return null;

  return (
    <ul className="flex flex-wrap justify-center items-center gap-10 w-full p-8">
      {playlists.items.map((playlist, index) => (
        <Link
          key={index}
          href={`/playlist/${playlist.id}`}
          className="flex-grow max-w-fit overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <Cover
            src={playlist.images.length > 0 ? playlist.images[0].url : null}
          />
          {playlist.name}
        </Link>
      ))}
    </ul>
  );
}

export default Playlists;
