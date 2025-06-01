import { cookies } from 'next/headers';

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}, expectJson = true) {
	const token = (await cookies()).get('firebase_token')?.value;
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
