import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import config from "./lib/config";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // https://github.com/vercel/next.js/discussions/38216#discussioncomment-3061696
  if (pathname.startsWith("/_next")) return NextResponse.next();

  // Token will exist if user is logged in
  const token = await getToken({ req, secret: config.jwtSecret });

  // Allow the requests if the following is true
  // 1. If its a request for a next-auth session & provider fetching
  // 2. If the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect the user to login if they don't have token
  // AND are requesting a protected route
  if (!token && pathname !== "/login") {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }

  return NextResponse.next();
}
