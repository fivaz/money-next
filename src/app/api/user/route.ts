import { cookies } from 'next/headers';
import { COOKIE } from '@/lib/const';
import { adminAuth } from '@/lib/auth/firebase-admin';

export async function GET() {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get(COOKIE.SESSION)?.value;

	if (!sessionCookie) {
		return Response.json({ user: null }, { status: 200 });
	}

	try {
		const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
		const user = {
			uid: decodedToken.uid,
			name: decodedToken.name,
			email: decodedToken.email,
			picture: decodedToken.picture,
		};
		return Response.json({ user }, { status: 200 });
	} catch {
		return Response.json({ user: null }, { status: 200 });
	}
}
