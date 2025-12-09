import { NextRequest, NextResponse } from 'next/server';
import { validateBudgets } from '@/lib/budget/budget.model';
import { fetchAPIWithQuery } from '@/lib/shared/api.utils.actions';
import { API } from '@/lib/const';

export async function GET(request: NextRequest) {
	const data = await fetchAPIWithQuery(request, API.BUDGETS);

	const budgets = validateBudgets(data);

	return NextResponse.json(budgets, {
		status: 200,
	});
}
