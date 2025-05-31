import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '@/lib/const';

const PUBLIC_ROUTES = [
	ROUTES.LOGIN.path,
	ROUTES.REGISTER.path,
	'/api',
	'/_next',
	'/favicon.ico',
	'/public',
];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const token = request.cookies.get('firebase_token')?.value;

	const isPublic = PUBLIC_ROUTES.some((path) => pathname.startsWith(path));
	const isAuthPage = pathname === ROUTES.LOGIN.path || pathname === ROUTES.REGISTER.path;

	if (!token && !isPublic) {
		const loginUrl = new URL(ROUTES.LOGIN.path, request.url);
		return NextResponse.redirect(loginUrl);
	}

	if (token && isAuthPage) {
		const homeUrl = new URL(ROUTES.ROOT.path, request.url);
		return NextResponse.redirect(homeUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|static|favicon.ico).*)'],
};
