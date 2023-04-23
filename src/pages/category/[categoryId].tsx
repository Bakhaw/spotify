import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useCallback } from "react";

function Category() {
  const { query } = useRouter();
  const spotifyApi = useSpotify();

  const getCategory = useCallback(
    () => spotifyApi.getCategory(String(query.categoryId)),
    [spotifyApi, query]
  );
  const category = useFetch(getCategory, [query]);

  if (!category) return null;

  console.log("category:", category);

  return <div>{category.name}</div>;
}

export default Category;
