import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BUDGETS_URL, validateBudgets } from '@/lib/budget/budget.model';
import { getTokenForAPI } from '@/lib/user/auth.util';
import { fetchInAPI } from '@/lib/shared/api-server.utils';

export async function GET(request: NextRequest) {
	const data = await fetchInAPI(request.cookies, BUDGETS_URL);

	const budgets = validateBudgets(data);

	return NextResponse.json(budgets, {
		status: 200,
	});
}
