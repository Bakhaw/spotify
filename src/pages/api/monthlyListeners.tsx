import type { NextApiRequest, NextApiResponse } from "next";
import { JSDOM } from "jsdom";

const getMonthlyListeners = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { artistId } = req.query;

  if (!artistId) throw new Error("monthlyListeners: artist id not provided");

  const url = `https://open.spotify.com/intl-fr/artist/${artistId}`;
  const html = await fetch(url).then((res) => res.text());

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const result = document.querySelector(
    "[data-testid='monthly-listeners-label']"
  )?.textContent;

  res.status(200).json({ result });
};

export default getMonthlyListeners;
