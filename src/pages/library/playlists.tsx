import Link from "next/link";
import Head from "next/head";

import usePlaylists from "@/hooks/usePlaylists";

import Cover from "@/components/Cover";

function Playlists() {
  const playlists = usePlaylists();

  if (!playlists) return null;

  return (
    <ul className="flex flex-wrap justify-center items-center gap-10 w-full p-8">
      <Head>
        <title>music app - playlists</title>
      </Head>

      {playlists.items.map((playlist, index) => (
        <Link
          key={index}
          href={`/playlist/${playlist.id}`}
          className="flex-grow max-w-fit overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <Cover
            alt={playlist.name}
            src={playlist.images.length > 0 ? playlist.images[0].url : null}
          />
          {playlist.name}
        </Link>
      ))}
    </ul>
  );
}

export default Playlists;
