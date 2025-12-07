import { getTokenForAPI, getTokenForServerAction } from '@/lib/user/auth.utils.server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_TZ_KEY, HEADER_TZ_KEY } from '@/lib/const';

export async function fetchInAPI(request: NextRequest, backendUrl: string, expectJson = true) {
	// Get token from cookies
	const token = await getToken();

	// Parse backend URL and forward all query parameters from the request
	const url = new URL(backendUrl);
	request.nextUrl.searchParams.forEach((value, key) => {
		url.searchParams.append(key, value);
	});

	return fetchWithAuth(token, url.toString(), {}, expectJson);
}

export async function fetchInAction(input: RequestInfo, init: RequestInit = {}, expectJson = true) {
	const token = await getToken();

	return fetchWithAuth(token, input, init, expectJson);
}

async function fetchWithAuth(
	token: string | null,
	input: RequestInfo,
	init: RequestInit = {},
	expectJson = true,
) {
	if (!token) throw new Error('User not authenticated');

	const cookieStore = await cookies();
	const userTimezone = cookieStore.get(COOKIE_TZ_KEY)?.value || 'UTC';
	//add a Sentry error
	if (!userTimezone) console.error('No timezone found in cookies');

	const initWithToken = {
		...init,
		headers: {
			...init.headers,
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			cache: init.cache ?? 'no-store',
			[HEADER_TZ_KEY]: userTimezone,
		},
	};

	const res = await fetch(input, initWithToken);

	if (!res.ok) {
		const errorMsg = await res.text();
		throw new Error(errorMsg || 'Request failed');
	}

	return expectJson ? res.json() : res;
}
