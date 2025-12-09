'use server';

import { cookies } from 'next/headers';
import { BACKEND_URL, COOKIE, HEADER_TZ_KEY } from '@/lib/const';
import { NextRequest } from 'next/server';

export async function fetchAPIWithQuery(request: NextRequest, apiUrl: string) {
	// Parse backend URL and forward all query parameters from the request
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);

	return fetchAPI(`${apiUrl}?${params.toString()}`);
}

/**
 * A server-side helper for calling your backend API.
 * Automatically attaches the session token as a Bearer header.
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
	const cookieStore = await cookies();

	const token = cookieStore.get(COOKIE.SESSION)?.value;
	if (!token) throw new Error('Unable to fetch API: User is not authenticated.');

	const baseUrl = BACKEND_URL;
	if (!baseUrl) throw new Error('BACKEND_URL is not defined in the environment.');

	const userTimezone = cookieStore.get(COOKIE.TIMEZONE)?.value || 'UTC';
	//add a Sentry error
	if (!userTimezone) console.error('No timezone found in cookies');

	const url = `${baseUrl}/${endpoint}`;

	const res = await fetch(url, {
		...options,
		headers: {
			...(options.headers || {}),
			Authorization: `Bearer ${token}`,
			[HEADER_TZ_KEY]: userTimezone,
			'Content-Type': 'application/json',
		},
	});

	if (!res.ok) {
		const errorMsg = await res.text();
		throw new Error(errorMsg || 'Request failed');
	}

	return res.json();
}
