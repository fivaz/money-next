import { NextRequest, NextResponse } from 'next/server';
import { BUDGETS_URL, validateBudgets } from '@/lib/budget/budget.model';
import { fetchInAPI } from '@/lib/shared/api-server.utils';
import { BACKEND_URL } from '@/lib/const';

export async function GET(request: NextRequest) {
	const data = await fetchInAPI(request.cookies, `${BACKEND_URL}/calculate-balance`);

	return NextResponse.json(data, {
		status: 200,
	});
}
