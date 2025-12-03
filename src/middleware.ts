import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const endOfPath = pathname.split("/AM").pop();
  return NextResponse.redirect(new URL("/am" + endOfPath, request.url));
}

export const config = {
  matcher: ["/AM/:path*"],
};
