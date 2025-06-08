'use server';

import { getTokens, Tokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import { firebaseConfig } from '@/lib/firebase';
import { serverConfig } from '@/config';
import { User } from '@/lib/user/AuthContext';
import { filterStandardClaims } from 'next-firebase-auth-edge/auth/claims';

const toUser = ({ decodedToken }: Tokens): User => {
	const {
		uid,
		email,
		picture: photoURL,
		email_verified: emailVerified,
		phone_number: phoneNumber,
		name: displayName,
		source_sign_in_provider: signInProvider,
	} = decodedToken;

	const customClaims = filterStandardClaims(decodedToken);

	return {
		uid,
		email: email ?? null,
		displayName: displayName ?? null,
		photoURL: photoURL ?? null,
		phoneNumber: phoneNumber ?? null,
		emailVerified: emailVerified ?? false,
		providerId: signInProvider,
		customClaims,
	};
};

export const getUser = async () => {
	const tokens = await getAuthToken();

	return tokens ? toUser(tokens) : null;
};

export const getAuthToken = async () =>
	getTokens(await cookies(), {
		apiKey: firebaseConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});
