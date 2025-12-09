import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE, ROUTES } from '@/lib/const';
import { adminAuth } from '@/lib/auth2/firebase-admin';

const PUBLIC_PATHS = ['/login', '/register'];

export async function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;

	if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

	const token = req.cookies.get(COOKIE.SESSION)?.value;

	if (!token) return NextResponse.redirect(new URL(ROUTES.LOGIN.path, req.url));

	try {
		await adminAuth.verifySessionCookie(token, true);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL(ROUTES.LOGIN.path, req.url));
	}
}

export const config = {
	matcher: '/((?!_next/static|_next/image|favicon.ico|sw.js|manifest.json).*)',
};
