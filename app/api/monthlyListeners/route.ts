import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const artistId = searchParams.get("artistId");

  if (!artistId) throw new Error("monthlyListeners: artist id not provided");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://open.spotify.com/intl-fr/artist/${artistId}`, {
    waitUntil: "networkidle0",
  });

  const spanText = await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll("span"));
    const target = spans.find(
      (span) =>
        span.textContent?.toLowerCase().includes("auditeurs") ||
        span.textContent?.toLowerCase().includes("listeners")
    );
    return target?.textContent || null;
  });

  await browser.close();

  return NextResponse.json({ result: spanText });
}
