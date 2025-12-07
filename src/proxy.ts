import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_AUTH_KEY } from '@/lib/auth/auth.utils';

const PUBLIC_PATHS = ['/login', '/register', '/api/auth/set-token', '/api/auth/logout'];

export function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

	const token = req.cookies.get(COOKIE_AUTH_KEY)?.value;

	if (!token) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|static|favicon.ico).*)'],
};
