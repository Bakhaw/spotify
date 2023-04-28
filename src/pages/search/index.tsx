import { useCallback, useRef } from "react";
import { NextPage } from "next";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

const Search: NextPage = () => {
  const spotifyApi = useSpotify();
  const getCategories = useCallback(
    () => spotifyApi.getCategories(),
    [spotifyApi]
  );
  const categories =
    useFetch<SpotifyApi.MultipleCategoriesResponse>(getCategories);

  const inputRef = useRef();

  // TODO
  function onInputChange() {}

  console.log("input", inputRef);

  if (!categories) return null;

  return (
    <div className="p-8">
      <input onChange={onInputChange} type="text" placeholder="Search..." />

      <ul className="grid grid-cols-fill-300 justify-center gap-12">
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
      </ul>
    </div>
  );
};

export default Search;
