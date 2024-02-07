import { NextResponse } from "next/server";
import YTMusic from "ytmusic-api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) throw new Error("search/youtube: query not provided");

  const ytmusic = new YTMusic();

  try {
    await ytmusic.initialize();
    const songs = await ytmusic.searchSongs(query);
    const videos = await ytmusic.searchVideos(query);

    // TODO display the most closest to the search
    const result = await Promise.all([...songs, ...videos]);

    return NextResponse.json({ result });
  } catch (error) {
    console.log("Catch", error);
  }
}
