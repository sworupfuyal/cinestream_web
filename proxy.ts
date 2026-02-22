import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, getUserData } from "@/lib/cookie";

const publicRoutes = ['/login', '/register', '/forget-password', '/reset-password'];
const adminRoutes = ['/admin'];
const userRoutes = ['/user'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getAuthToken();
  const user = token ? await getUserData() : null;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isUserRoute = userRoutes.some(route => pathname.startsWith(route));

  if (!token) {
    if (!isPublicRoute && pathname !== '/') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/' && user) {
    if (user.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (user.role === 'user') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }
  }

  if (isPublicRoute && user) {
    if (user.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (user.role === 'user') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }
  }

  if (isAdminRoute && user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isUserRoute && user?.role !== 'user' && user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin',                    // ✅ Exact /admin only
    '/admin/((?!movies).+)',     // ✅ /admin/* BUT NOT /admin/movies/*
    '/user/:path*',
    '/login',
    '/register'
  ],
};