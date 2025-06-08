import { cookies } from 'next/headers';
import { getTokenForAPI, getTokenForServerAction } from '@/lib/user/auth.util';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

export async function fetchInAPI(
	cookies: RequestCookies,
	input: RequestInfo,
	init: RequestInit = {},
	expectJson = true,
) {
	const token = await getTokenForAPI(cookies);

	return fetchWithAuth(token, input, init, expectJson);
}

export async function fetchInAction(input: RequestInfo, init: RequestInit = {}, expectJson = true) {
	const token = await getTokenForServerAction();

	return fetchWithAuth(token, input, init, expectJson);
}

async function fetchWithAuth(
	token: string | null,
	input: RequestInfo,
	init: RequestInit = {},
	expectJson = true,
) {
	if (!token) throw new Error('User not authenticated');

	const headers = {
		...(init.headers || {}),
		Authorization: `Bearer ${token}`,
		cache: init.cache ?? 'no-store',
	};

	const res = await fetch(input, { ...init, headers });

	if (!res.ok) {
		const errorMsg = await res.text();
		throw new Error(errorMsg || 'Request failed');
	}

	return expectJson ? res.json() : res;
}
