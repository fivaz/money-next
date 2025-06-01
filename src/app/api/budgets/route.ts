import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateBudgetsWithTransactions } from '@/lib/budget/budget-transaction.model';
import { validateBudgets } from '@/lib/budget/budget.model';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

const BudgetRoute = `${BACKEND_URL}/budgets`;

export async function GET(request: NextRequest) {
	const token = (await cookies()).get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const res = await fetch(BudgetRoute, {
		headers: {
			Authorization: `Bearer ${token}`,
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
