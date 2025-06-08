import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateTransactions } from '@/lib/transaction/transaction.model';
import { BACKEND_URL } from '@/lib/const';
import { getAuthToken } from '@/lib/user/auth.util';

export async function GET(request: NextRequest) {
	const tokens = await getAuthToken();

	if (!tokens) throw new Error('User not authenticated');

	// Extract query params from incoming request URL
	const { searchParams } = new URL(request.url);

	// Build backend URL with the same query params
	const backendUrl = new URL('/transactions/current-month', BACKEND_URL);

	searchParams.forEach((value, key) => {
		backendUrl.searchParams.append(key, value);
	});

	const res = await fetch(backendUrl.toString(), {
		headers: {
			Authorization: `Bearer ${tokens.token}`,
		},
		cache: 'no-store',
	});

	if (!res.ok) {
		const message = await res.text();
		throw new Error(`Failed to fetch transactions: ${message}`);
	}

	const data = await res.json();
	console.log(data);

	const transactions = validateTransactions(data);

	return NextResponse.json(transactions, {
		status: 200,
	});
}
