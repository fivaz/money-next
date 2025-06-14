import { NextRequest, NextResponse } from 'next/server';
import { validateTransactions } from '@/lib/transaction/transaction.model';
import { API } from '@/lib/const';
import { BUDGETS_URL } from '@/lib/budget/budget.model';
import { fetchInAPI } from '@/lib/shared/api-server.utils';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ budgetId: string }> },
) {
	const { budgetId } = await params;

	const { searchParams } = new URL(request.url);
	const month = searchParams.get('month');
	const year = searchParams.get('year');

	const backendUrl = new URL(`${BUDGETS_URL}/${budgetId}/${API.TRANSACTIONS}`);

	if (month) backendUrl.searchParams.append('month', month);
	if (year) backendUrl.searchParams.append('year', year);

	const data = await fetchInAPI(request.cookies, backendUrl.toString(), {}, true);

	const transactions = validateTransactions(data);

	return NextResponse.json(transactions, {
		status: 200,
	});
}
