'use server';

import { adminAuth } from '@/lib/auth2/firebase-admin';
import { cookies } from 'next/headers';
import { COOKIE } from '@/lib/const';
import { User } from '@/lib/auth2/user.model';

export async function loginServer(idToken: string) {
	// Create a session cookie valid for 14 days
	const expiresIn = 14 * 24 * 60 * 60 * 1000;

	const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

	(await cookies()).set(COOKIE.SESSION, sessionCookie, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: expiresIn / 1000,
	});
}

export async function getUser(): Promise<User | null> {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get(COOKIE.SESSION)?.value;

	if (!sessionCookie) {
		return null; // user not logged in
	}

	try {
		const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
		return {
			uid: decodedToken.uid,
			name: decodedToken.name || '',
			email: decodedToken.email || '',
			picture: decodedToken.picture || '',
		};
	} catch (err) {
		console.error('Failed to decode session cookie:', err);
		return null;
	}
}

export async function logoutAction() {
	(await cookies()).delete(COOKIE.SESSION);
}
