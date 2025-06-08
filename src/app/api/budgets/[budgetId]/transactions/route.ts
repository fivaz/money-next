import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateTransactions } from '@/lib/transaction/transaction.model';
import { API } from '@/lib/const';
import { BUDGETS_URL } from '@/lib/budget/budget.model';
import { getAuthToken } from '@/lib/user/auth.util';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ budgetId: string }> },
) {
	// await is correct
	const { budgetId } = await params;

	const tokens = await getAuthToken();

	if (!tokens) throw new Error('User not authenticated');

	const { searchParams } = new URL(request.url);
	const month = searchParams.get('month');
	const year = searchParams.get('year');

	const backendUrl = new URL(`${BUDGETS_URL}/${budgetId}/${API.TRANSACTIONS}`);

	if (month) backendUrl.searchParams.append('month', month);
	if (year) backendUrl.searchParams.append('year', year);

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
