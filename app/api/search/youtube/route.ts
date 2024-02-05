import { NextResponse } from "next/server";
import YTMusic from "ytmusic-api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) throw new Error("search/youtube: query not provided");

  const ytmusic = new YTMusic();

  try {
    await ytmusic.initialize();
    const result = await ytmusic.searchSongs(query);
    // const result = await ytmusic.searchVideos(query);

    return NextResponse.json({ result });
  } catch (error) {
    console.log("Catch", error);
  }
}
