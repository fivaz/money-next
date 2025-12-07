'use server';

import { cookies } from 'next/headers';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { User } from '@/lib/user/user.model';
import { getToken } from '@/lib/auth/auth.utils.server';
import { signInWithPopup } from 'firebase/auth';
import { jwtDecode } from 'jwt-decode';

export const getUser = async (): Promise<User | null> => {
	const token = await getToken();

	if (!token) {
		return null;
	}

	const decoded: { uid: string; name: string; email: string; picture: string } = jwtDecode(token);

	return {
		uid: decoded.uid,
		name: decoded.name,
		email: decoded.email,
		picture: decoded.picture,
	};
};
