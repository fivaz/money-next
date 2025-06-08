import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BUDGETS_URL, validateBudgets } from '@/lib/budget/budget.model';
import { getAuthToken } from '@/lib/user/auth.util';

export async function GET(request: NextRequest) {
	const tokens = await getAuthToken();

	if (!tokens) throw new Error('User not authenticated');

	const res = await fetch(BUDGETS_URL, {
		headers: {
			Authorization: `Bearer ${tokens.token}`,
		},
		cache: 'no-store',
	});

	if (!res.ok) {
		const message = await res.text();
		throw new Error(`Failed to fetch budgets: ${message}`);
	}

	const data = await res.json();
	console.log(data);

	const budgets = validateBudgets(data);

	return NextResponse.json(budgets, {
		status: 200,
	});
}
