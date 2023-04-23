import { useCallback } from "react";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import Link from "next/link";

function Search() {
  const spotifyApi = useSpotify();
  const getCategories = useCallback(
    () => spotifyApi.getCategories(),
    [spotifyApi]
  );
  const categories =
    useFetch<SpotifyApi.MultipleCategoriesResponse>(getCategories);

  if (!categories) return null;

  return (
    <div>
      <ul className="grid grid-cols-fill-300 justify-center gap-12 p-8">
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
}

export default Search;
