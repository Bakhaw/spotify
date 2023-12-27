import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");

  if (!accessToken) throw new Error("getQueue: accessToken not provided");

  const url = `https://api.spotify.com/v1/me/player/queue`;

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());

  return NextResponse.json(result);
}
