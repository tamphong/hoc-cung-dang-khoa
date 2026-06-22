import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "./lib/auth";

const ADMIN_PATHS = ["/admin"];
const STUDENT_PATHS = ["/dashboard"];
const AUTH_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPath = ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isStudentPath = STUDENT_PATHS.some((p) => pathname.startsWith(p));
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

  const session = await getSessionFromRequest(req);

  // Redirect logged-in users away from auth pages
  if (isAuthPath && session) {
    const dest = session.role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // Protect admin routes
  if (isAdminPath) {
    if (!session) return NextResponse.redirect(new URL("/login", req.url));
    if (session.role !== "admin") return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect student dashboard
  if (isStudentPath) {
    if (!session) return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};
