"use client";

import Link from "next/link";

import usePlaylists from "@/hooks/usePlaylists";

import Container from "@/components/Container";
import Cover from "@/components/Cover";

function Playlists() {
  const { playlists } = usePlaylists();

  if (!playlists) return null;

  // TODO skeleton
  return (
    <Container>
      <ul className="flex flex-wrap justify-start items-center gap-2 w-full">
        {playlists.items.map((playlist, index) => (
          <Link
            key={index}
            href={`/playlist/${playlist.id}`}
            className="border "
          >
            <Cover
              alt={`${playlist.name} cover`}
              src={playlist.images.length > 0 ? playlist.images[0].url : null}
            />
            {playlist.name}
          </Link>
        ))}
      </ul>
    </Container>
  );
}

export default Playlists;
