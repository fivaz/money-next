'use server';

import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import { tokenConfig } from '@/config';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { User } from '@/lib/user/user.model';

export const getUser = async (): Promise<User | null> => {
	const tokens = await getTokens(await cookies(), tokenConfig);

	return tokens
		? {
				uid: tokens.decodedToken.uid,
				email: tokens.decodedToken.email as string,
				photoURL: tokens.decodedToken.photoURL as string,
				displayName: tokens.decodedToken.displayName as string,
			}
		: null;
};

export const getTokenForServerAction = async () => {
	const tokens = await getTokens(await cookies(), tokenConfig);
	return tokens ? tokens.token : null;
};

export const getTokenForAPI = async (requestCookies: RequestCookies) => {
	const tokens = await getTokens(requestCookies, tokenConfig);
	return tokens ? tokens.token : null;
};
