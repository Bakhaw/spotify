import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import useSpotify from "./useSpotify";

interface Response<T> {
  body: T;
  headers: Record<string, string>;
  statusCode: number;
}

type useFetchParams<T> = () => Promise<Response<T>>;

function useFetch<T>(callback: useFetchParams<T>, ...args: unknown[]): T {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const argsRef = useRef(args);
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      const fetchData = async () => {
        const data = await callback();
        setData(data.body);
      };

      fetchData();
    }
  }, [session, spotifyApi, callback, argsRef]);

  return data;
}

export default useFetch;
