import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) throw new Error("getQueue: accessToken not found");

  const url = `https://api.spotify.com/v1/me/player/queue`;

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  }).then((res) => res.json());

  return NextResponse.json(result);
}
