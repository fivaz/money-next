import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register', '/api', '/_next', '/favicon.ico', '/public'];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token = request.cookies.get('firebase_token')?.value;

	const isPublic = PUBLIC_ROUTES.some((path) => pathname.startsWith(path));

	if (!token && !isPublic) {
		const loginUrl = new URL('/login', request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|static|favicon.ico).*)'],
};
