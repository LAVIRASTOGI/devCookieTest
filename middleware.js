import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Method 3: Get token from cookies (alternative syntax)
  const tokenFromCookies = request.cookies.get("token");

  const finalToken = tokenFromCookies?.value;

  if (!finalToken) {
    // Handle unauthorized access
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add your protected routes here
    "/mock-interview-ai/:path*",
    "/quizzes",
    "/profile/:path*",
  ],
};
