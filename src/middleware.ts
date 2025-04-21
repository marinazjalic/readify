import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const { pathname } = request.nextUrl;

  const isAuthPath =
    pathname.startsWith("/pages/login") ||
    pathname.startsWith("/pages/sign-up");

  const isPublicPath =
    pathname === "/" ||
    pathname.startsWith("/pages/books") ||
    pathname.startsWith("/api/auth") ||
    isAuthPath;

  // if no token and trying to access protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }

  // redirect to home page when auth users try to access login/signup
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next|fonts|images|assets|[\\w-]+\\.\\w+|login|sign-up).*)",
  ],
};
