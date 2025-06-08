import { NextRequest, NextResponse } from 'next/server';
import { validateTransactions } from '@/lib/transaction/transaction.model';
import { BACKEND_URL } from '@/lib/const';
import { fetchInAPI } from '@/lib/shared/api-server.utils';

export async function GET(request: NextRequest) {
	// Extract query params from incoming request URL
	const { searchParams } = new URL(request.url);

	// Build backend URL with the same query params
	const backendUrl = new URL('/transactions/current-month', BACKEND_URL);

	searchParams.forEach((value, key) => {
		backendUrl.searchParams.append(key, value);
	});

	const data = await fetchInAPI(request.cookies, backendUrl.toString(), {}, true);

	const transactions = validateTransactions(data);

	return NextResponse.json(transactions, {
		status: 200,
	});
}
