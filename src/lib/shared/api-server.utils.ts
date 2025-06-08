import { cookies } from 'next/headers';
import { getAuthToken } from '@/lib/user/auth.util';

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}, expectJson = true) {
	const tokens = await getAuthToken();

	if (!tokens) throw new Error('User not authenticated');

	const headers = {
		...(init.headers || {}),
		Authorization: `Bearer ${tokens.token}`,
		cache: init.cache ?? 'no-store',
	};

	const res = await fetch(input, { ...init, headers });

	if (!res.ok) {
		const errorMsg = await res.text();
		throw new Error(errorMsg || 'Request failed');
	}

	return expectJson ? res.json() : res;
}
