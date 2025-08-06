import { NextRequest, NextResponse } from 'next/server';
import { BUDGETS_URL, validateBudgets } from '@/lib/budget/budget.model';
import { fetchInAPI } from '@/lib/shared/api-server.utils';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const month = searchParams.get('month');
	const year = searchParams.get('year');

	const backendUrl = new URL(`${BUDGETS_URL}/by-date`);

	if (month) backendUrl.searchParams.append('month', month);
	if (year) backendUrl.searchParams.append('year', year);

	const data = await fetchInAPI(request.cookies, backendUrl.toString());

	const budgets = validateBudgets(data);

	return NextResponse.json(budgets, {
		status: 200,
	});
}
