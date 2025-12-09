'use server';

import { cookies } from 'next/headers';
import { BACKEND_URL, COOKIE, COOKIE_TZ_KEY, HEADER_TZ_KEY } from '@/lib/const';
import { NextRequest } from 'next/server';

export async function fetchAPIWithQuery(request: NextRequest, apiUrl: string) {
	// Parse backend URL and forward all query parameters from the request
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);

	return fetchAPI(`${apiUrl}?${params.toString()}`);
}

interface FetchAPIOptions extends RequestInit {
	parseJson?: boolean;
}

/**
 * A server-side helper for calling your backend API.
 * Automatically attaches the session token as a Bearer header.
 */
export async function fetchAPI(endpoint: string, options: FetchAPIOptions = {}) {
	const { parseJson = true, headers, ...rest } = options;
	const cookieStore = await cookies();

	const token = cookieStore.get(COOKIE.SESSION)?.value;
	if (!token) throw new Error('Unable to fetch API: User is not authenticated.');

	const baseUrl = BACKEND_URL;
	if (!baseUrl) throw new Error('BACKEND_URL is not defined in the environment.');

	const userTimezone = cookieStore.get(COOKIE_TZ_KEY)?.value || 'UTC';
	//add a Sentry error
	if (!userTimezone) console.error('No timezone found in cookies');

	const url = `${baseUrl}/${endpoint}`;

	const res = await fetch(url, {
		...rest,
		headers: {
			...(headers || {}),
			Authorization: `Bearer ${token}`,
			[HEADER_TZ_KEY]: userTimezone,
		},
	});

	if (!res.ok) {
		let body: unknown;
		try {
			body = await res.json();
		} catch {
			body = await res.text();
		}

		const error = new Error(`Request to ${url} failed with status ${res.status}`);
		(error as any).status = res.status;
		(error as any).body = body;
		throw error;
	}

	return parseJson ? await res.json() : res;
}
