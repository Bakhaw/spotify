import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const artistId = searchParams.get("artistId");

  if (!artistId) throw new Error("monthlyListeners: artist id not provided");

  const url = `https://open.spotify.com/intl-fr/artist/${artistId}`;
  const html = await fetch(url).then((res) => res.text());

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const result = document.querySelector(
    "[data-testid='monthly-listeners-label']"
  )?.textContent;

  return NextResponse.json({ result });
}
