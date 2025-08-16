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

	const data = await fetchInAPI(request, `${BUDGETS_URL}/${budgetId}/${API.TRANSACTIONS}`);

	const transactions = validateTransactions(data);

	return NextResponse.json(transactions, {
		status: 200,
	});
}
