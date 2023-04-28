import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Category: NextPage = () => {
  const { query } = useRouter();
  const spotifyApi = useSpotify();

  const getCategory = useCallback(
    () => spotifyApi.getCategory(String(query.categoryId)),
    [spotifyApi, query]
  );
  const category = useFetch(getCategory, [query]);

  if (!category) return null;

  return <div>{category.name}</div>;
};

export default Category;
