'use server';
import { cookies } from 'next/headers';
import { BACKEND_URL } from '@/lib/const';

export async function getBalance(): Promise<number> {
	const cookieStore = await cookies();
	const token = cookieStore.get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const res = await fetch(`${BACKEND_URL}/calculate-balance`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store',
	});

	if (!res.ok) {
		// Try to extract the backend error message
		let errorMessage = `Backend request failed with status ${res.status}`;
		try {
			const errorJson = await res.json();
			if (errorJson?.error) {
				errorMessage = errorJson.error;
			} else if (typeof errorJson === 'string') {
				errorMessage = errorJson;
			}
		} catch (e) {
			// ignore JSON parse error and use default message
		}
		throw new Error(errorMessage);
	}

	return await res.json();
}
