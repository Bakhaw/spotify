import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
  });

  const { pathname, origin } = req.nextUrl;

  if (pathname.includes("api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    req.cookies.clear();
    return NextResponse.redirect(`${origin}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/library",
    "/profile",
    "/studio",
    "/(artist|album|playlist|)/([^/.]*)",
  ],
};
