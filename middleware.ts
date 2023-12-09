import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
  });

  const { pathname, origin } = req.nextUrl;

  if (pathname.includes("api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(`${origin}/login`);
  }
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
