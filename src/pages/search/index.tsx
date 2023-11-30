import { FormEvent, useCallback, useRef } from "react";
import { NextPage } from "next";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import { Input } from "postcss";
import HorizontalSlider from "@/components/HorizontalSlider";

const Search: NextPage = () => {
  const spotifyApi = useSpotify();
  const getCategories = useCallback(
    () => spotifyApi.getCategories(),
    [spotifyApi]
  );
  const categories =
    useFetch<SpotifyApi.MultipleCategoriesResponse>(getCategories);

  const inputRef = useRef<HTMLInputElement>(null);

  // TODO search feature
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputRef.current) return;

    const searchValue = inputRef.current.value;

    const search = await spotifyApi.search(
      searchValue,
      ["artist", "album", "track", "playlist"],
      {
        limit: 4,
      }
    );
  }

  const getNewReleases = useCallback(
    () => spotifyApi.getNewReleases(),
    [spotifyApi]
  );
  const newReleases =
    useFetch<SpotifyApi.ListOfNewReleasesResponse>(getNewReleases);

  console.log("newReleases", newReleases);

  if (!categories) return null;

  return (
    <form className="p-8" onSubmit={onSubmit}>
      <input
        disabled
        ref={inputRef}
        className="text-black"
        placeholder="Search..."
        type="text"
      />

      <HorizontalSlider
        items={newReleases.albums.items}
        type="album"
        title="singles & ep"
      />

      {/* <ul className="grid grid-cols-fill-300 justify-center gap-12">
        {categories.categories.items.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="flex justify-center items-end h-64 rounded-3xl"
            style={{
              backgroundImage: `url(${category.icons[0].url})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <h1 className="mb-4 text-xl font-bold lowercase">
              {category.name}
            </h1>
          </Link>
        ))}
      </ul> */}
    </form>
  );
};

export default Search;
