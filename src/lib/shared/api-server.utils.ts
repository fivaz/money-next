import { getTokenForAPI, getTokenForServerAction } from '@/lib/user/auth.utils.server';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest } from 'next/server';

export async function fetchInAPI(request: NextRequest, backendUrl: string, expectJson = true) {
	// Get token from cookies
	const token = await getTokenForAPI(request.cookies);

	// Parse backend URL and forward all query parameters from the request
	const url = new URL(backendUrl);
	request.nextUrl.searchParams.forEach((value, key) => {
		url.searchParams.append(key, value);
	});

	return fetchWithAuth(token, url.toString(), expectJson);
}

export async function fetchInAction(input: RequestInfo, expectJson = true) {
	const token = await getTokenForServerAction();

	return fetchWithAuth(token, input, expectJson);
}

async function fetchWithAuth(token: string | null, input: RequestInfo, expectJson = true) {
	if (!token) throw new Error('User not authenticated');

	const headers = {
		Authorization: `Bearer ${token}`,
		cache: 'no-store',
	};

	const res = await fetch(input, { headers });

	if (!res.ok) {
		const errorMsg = await res.text();
		throw new Error(errorMsg || 'Request failed');
	}

	return expectJson ? res.json() : res;
}
