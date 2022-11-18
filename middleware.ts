import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const jwt = require("jsonwebtoken");
const secret = process.env.NEXTAUTH_SECRET;
export function middleware(request: NextRequest) {
  const token = request.headers.get("authorization");
  if (token) {
    const key = jwt.decode(token, secret);
    
    return NextResponse.next();
  } else {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ["/api/user/:path"],
};
