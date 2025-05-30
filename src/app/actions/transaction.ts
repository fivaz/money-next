'use server';

import { cookies } from 'next/headers';
import { BACKEND_URL } from '@/lib/const';

const TransactionRoute = `${BACKEND_URL}/transactions`;

export async function getCurrentMonthTransactions() {
	const token = (await cookies()).get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const now = new Date();
	const month = now.getMonth() + 1; // JS months are 0-indexed
	const year = now.getFullYear();

	const res = await fetch(`${TransactionRoute}/current-month?year=${year}&month=${month}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store',
	});

	if (!res.ok) {
		const message = await res.text();
		throw new Error(`Failed to fetch transactions: ${message}`);
	}

	return await res.json();
}
